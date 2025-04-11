<?php

namespace App\Reserves\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Reserves\Actions\ReserveDestroyAction;
use Domain\Reserves\Actions\ReserveIndexAction;
use Domain\Reserves\Actions\ReserveStoreAction;
use Domain\Reserves\Actions\ReserveUpdateAction;
use Domain\Reserves\Models\Reserve;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ReserveApiController extends Controller
{
    public function index(Request $request, ReserveIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(Reserve $reserve)
    {
        return response()->json(['reserve' => $reserve]);
    }

    public function store(Request $request, ReserveStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => ['required', 'exists:books, id'],
            'user_id' => ['required', 'exists:users, id'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $reserve = $action($validator->validated());

        return response()->json([
            'message' => __('messages.reserves.created'),
            'reserve' => $reserve
        ]);
    }

    public function update(Request $request, Reserve $reserve, ReserveUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => ['required', 'exists:books, id'],
            'user_id' => ['required', 'exists:users, id'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedReserve = $action($reserve, $validator->validated());

        return response()->json([
            'message' => __('messages.reserves.updated'),
            'reserve' => $updatedReserve
        ]);
    }

    public function destroy(Reserve $reserve, ReserveDestroyAction $action)
    {
        $action($reserve);

        return response()->json([
            'message' => __('messages.reserves.deleted')
        ]);
    }
}
