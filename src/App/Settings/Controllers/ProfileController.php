<?php

namespace App\Settings\Controllers;

use App\Core\Controllers\Controller;
use App\Settings\Requests\ProfileUpdateRequest;
use Domain\Loans\Models\Loan;
use Domain\Reserves\Models\Reserve;
use Domain\Users\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $users = User::select(['id', 'name', 'email'])->orderBy('name', 'asc')->withTrashed()->get()->toArray();
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

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'users' => $users,
            'loans' => $loans,
            'reserves' => $reserves,
            'combined' => $loansAndReserves,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
