<?php

namespace App\Zones\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Domain\Zones\Models\Zone;
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
        return Inertia::render('zones/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ZoneStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['string', 'max:255'],
            'floors' => ['array'],
            'floors.*' => ['exists:floors,id'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        
        // Crear la zona
        $zone = Zone::create($validator->validated());

        // Sincronizamos los pisos con la zona
        $zone->floors()->sync($request->floors);  // Sincroniza la relación muchos a muchos

        // Ejecutamos la acción de guardar (si es necesario)
        $action($zone);

        // Redirigimos a la lista de zonas
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

        $floors_count = Floor::select(['id', 'floor_number', 'capacity_zones']) ->withCount('zones') ->get() -> toArray();
        return Inertia::render('zones/Edit', [
            'zone' => $zone,
            'floors' => $floors,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  Zone $zone, ZoneUpdateAction $action)
    {
        
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255',
            Rule::unique('zones')->ignore($zone->id),
        ],
            'description' => ['string', 'max:255'],
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
