<?php

namespace App\Floors\Controllers\Api;

use App\Http\Controllers\Controller;
use Domain\Floors\Actions\FloorIndexAction;
use Domain\Floors\Actions\FloorStoreAction;
use Domain\Floors\Actions\FloorUpdateAction;
use Domain\Floors\Actions\FloorDestroyAction;
use Domain\Floors\Models\Floor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class FloorApiController extends Controller
{
    public function index(Request $request, FloorIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(Floor $floor)
    {
        return response()->json(['floor' => $floor]);
    }

    public function store(Request $request, FloorStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'floor_number' => ['required', 'Nnumber'],
            'capacity_zones' => ['required', 'number'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $floor = $action($validator->validated());

        return response()->json([
            'message' => __('messages.users.created'),
            'floor' => $floor
        ]);
    }

    public function update(Request $request, Floor $floor, FloorUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'floor_number' => ['required', 'number'],
            'capacity_zones' => ['required', 'number'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedFloor = $action($floor, $validator->validated());

        return response()->json([
            'message' => __('messages.users.updated'),
            'floor' => $updatedFloor
        ]);
    }

    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
        $action($floor);

        return response()->json([
            'message' => __('messages.users.deleted')
        ]);
    }
}
