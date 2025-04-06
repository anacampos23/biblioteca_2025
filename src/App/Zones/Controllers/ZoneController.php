<?php

namespace App\Zones\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;
use Domain\Floors\Data\Resources\FloorResource;
use Domain\Zones\Requests\ZoneRequest;
use Inertia\Response;
use Domain\Zones\Actions\ZoneStoreAction;
use Domain\Zones\Actions\ZoneUpdateAction;
use Domain\Zones\Actions\ZoneDestroyAction;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;



class ZoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('zones/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $floors = Floor::withCount('zones')
        ->orderBy('floor_number', 'asc')
        ->get()
        ->map(function ($floor) {
            return [
                'id' => $floor->id,
                'floor_number' => $floor->floor_number,
                'capacity_zones' => $floor->capacity_zones,
                'zones_count' => $floor->zones_count,
            ];
        })
        ->toArray();

        $floor_zone_id = Zone::select(['name', 'floor_id'])->get()->toArray();

        return Inertia::render('zones/Create', [
            'floors' => $floors,
            'floor_zone_id' => $floor_zone_id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request, ZoneStoreAction $action, Zone $zone)
    {
        $validator = Validator::make($request->all(), [
            'floor_id' => ['required', 'exists:floors,id'], // Makes sure that floor_id exists in floors table
            'name' => [
                'required',
                'string',
                Rule::unique('zones', 'name')
                ->where(fn($query) => $query->where('floor_id', $request->floor_id))
                ->ignore($zone->id),
            ],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.created'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Zone $zone)
    {
        $floors = Floor::withCount('zones') // <- añadimos el withCount aquí también
        ->select(['id', 'floor_number', 'capacity_zones'])
        ->orderBy('floor_number', 'asc')
        ->get()
        ->toArray();

        $floor_zone_id = Zone::select(['name', 'floor_id'])->get()->toArray();

        return Inertia::render('zones/Edit', [
            'zone' => $zone,
            'floors' => $floors,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            'floor_zone_id' => $floor_zone_id,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  Zone $zone, ZoneUpdateAction $action)
    {

        $validator = Validator::make($request->all(), [
            'floor_id' => ['required', 'exists:floors,id'],
            'name' => ['required', 'string', 'max:255',
            Rule::unique('zones', 'name')->where(fn($query) => $query->where('floor_id', $request->floor_id))->ignore($zone->id)
        ],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($zone, $validator->validated());

        $redirectUrl = route('zones.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.zones.updated'));
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zone $zone, ZoneDestroyAction $action)
    {
        $action($zone);

        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.deleted'));
    }
}
