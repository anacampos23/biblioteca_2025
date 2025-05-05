<?php

namespace App\Users\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Loans\Models\Loan;
use Domain\Reserves\Models\Reserve;
use Domain\Users\Actions\UserDestroyAction;
use Domain\Users\Actions\UserIndexAction;
use Domain\Users\Actions\UserStoreAction;
use Domain\Users\Actions\UserUpdateAction;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserApiController extends Controller
{
    public function index(Request $request, UserIndexAction $action)
    {
        return response()->json($action($request->search,  $request->integer('per_page', 10)));
    }



    public function show(User $user)
    {
        $loans = Loan::withTrashed()
            ->with(['book:id,title,author,ISBN'])
            ->select(['id', 'start_loan', 'end_loan', 'due_date', 'active', 'user_id', 'book_id'])
            ->orderBy('start_loan', 'desc')
            ->get()
            ->map(function ($loan) {
                // Calcular days_overdue para cada préstamo
                $loan->days_overdue = $loan->days_overdue; // Este es el accesor que ya calculaste en el modelo
                return $loan;
            })
            ->toArray();

        $reserves = Reserve::withTrashed()
            ->with(['book:id,title,author,ISBN'])
            ->select(['id', 'status', 'user_id', 'book_id', 'created_at', 'deleted_at'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->toArray();

        $loansAndReserves = collect(array_merge($loans, $reserves))
            ->map(function ($item) {
                if (isset($item['start_loan'])) {
                    $item['type'] = 'loan';
                    $item['sort_date'] = $item['start_loan'];
                } else {
                    $item['type'] = 'reserve';
                    $item['sort_date'] = $item['created_at'];
                }
                return $item;
            })
            ->sortByDesc('sort_date') // Orden descendente
            ->values() // Reindexar
            ->toArray();

            return response()->json([
                'user' => $user,
            'loans' => $loans,
            'reserves' => $reserves,
            'combined' => $loansAndReserves,
            ]);

    }

    public function store(Request $request, UserStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $action($validator->validated());

        return response()->json([
            'message' => __('messages.users.created'),
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user, UserUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedUser = $action($user, $validator->validated());

        return response()->json([
            'message' => __('messages.users.updated'),
            'user' => $updatedUser
        ]);
    }

    public function destroy(User $user, UserDestroyAction $action)
    {
        $action($user);

        return response()->json([
            'message' => __('messages.users.deleted')
        ]);
    }
}
