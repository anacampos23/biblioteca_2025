<?php

namespace App\Zones\Controllers\Api;

use App\Http\Controllers\Controller;
use Domain\Zones\Actions\ZoneIndexAction;
use Domain\Zones\Actions\ZoneStoreAction;
use Domain\Zones\Actions\ZoneUpdateAction;
use Domain\Zones\Actions\ZoneDestroyAction;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ZoneApiController extends Controller
{
    public function index(Request $request, ZoneIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(Zone $zone)
    {
        return response()->json(['zone' => $zone]);
    }

    public function store(Request $request, ZoneStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' =>  ['required', 'string', 'max:255'],
            
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $zone = $action($validator->validated());

        return response()->json([
            'message' => __('messages.zones.created'),
            'zone' => $zone
        ]);
    }

    public function update(Request $request, Zone $zone, ZoneUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' =>  ['required', 'string', 'max:255'],
            'description' =>  ['string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedZone = $action($zone, $validator->validated());

        return response()->json([
            'message' => __('messages.zones.updated'),
            'zone' => $updatedZone
        ]);
    }

    public function destroy(Zone $zone, ZoneDestroyAction $action)
    {
        $action($zone);

        return response()->json([
            'message' => __('messages.zones.deleted')
        ]);
    }
}
