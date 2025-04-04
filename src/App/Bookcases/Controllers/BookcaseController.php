<?php

namespace App\Bookcases\Controllers;

use App\Core\Controllers\Controller;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Domain\Bookcases\Actions\BookcaseDestroyAction;
use Domain\Bookcases\Actions\BookcaseIndexAction;
use Domain\Bookcases\Actions\BookcaseStoreAction;
use Domain\Bookcases\Actions\BookcaseUpdateAction;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BookcaseController extends Controller
{
    public function index()
    {
        return Inertia::render('bookcases/Index');
    }

    public function create()
    {
        $zones = Zone::select(['id', 'name', 'floor_id']) ->orderBy('name', 'asc') ->get() -> toArray();
        $floors = Floor::select(['id', 'floor_number', 'capacity_zones']) ->orderBy('floor_number', 'asc') ->get() -> toArray();
        $floor_zone_id = Bookcase::select(['bookcase_name', 'zone_id', 'floor_id']) ->get() -> toArray();

        return Inertia::render('zones/Create', [
            'zones' => $zones,
            'floors' => $floors,
            'floor_zone_id' => $floor_zone_id,
        ]);
    }

    public function store(Request $request, BookcaseStoreAction $action, Bookcase $bookcase)
    {
        $validator = Validator::make($request->all(), [
            'zone_id' => ['required', 'exists:zones,id'],
            'floor_id' => ['required', 'exists:floors,id'],
            'bookcase_name' => [
                'required',
                'number',
                Rule::unique('bookcases', 'bookcase_name')
                    ->where(function ($query) use ($request) {
                        $query->where('floor_id', $request->floor_id)
                            ->where('zone_id', $request->zone_id);
                    })
                    ->ignore($bookcase->id),
            ],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('bookcases.index')
            ->with('success', __('messages.zones.created'));
    }

    public function edit(Request $request, Bookcase $user)
    {

        $zones = Zone::select(['id', 'name', 'floor_id']) ->orderBy('name', 'asc') ->get() -> toArray();
        $floors = Floor::select(['id', 'floor_number', 'capacity_zones']) ->orderBy('floor_number', 'asc') ->get() -> toArray();
        $floor_zone_id = Bookcase::select(['bookcase_name', 'zone_id', 'floor_id']) ->get() -> toArray();

        return Inertia::render('zones/Edit', [
            'zones' => $zones,
            'floors' => $floors,
            'floor_zone_id' => $floor_zone_id,
        ]);
    }

    public function update(Request $request, Bookcase $bookcase, BookcaseUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'zone_id' => ['required', 'exists:zones,id'],
            'floor_id' => ['required', 'exists:floors,id'],
            'bookcase_name' => [
                'required',
                'number',
                Rule::unique('bookcases', 'bookcase_name')
                    ->where(function ($query) use ($request) {
                        $query->where('floor_id', $request->floor_id)
                            ->where('zone_id', $request->zone_id);
                    })
                    ->ignore($bookcase->id),
            ],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($bookcase, $validator->validated());

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

    public function destroy(Bookcase $bookcase, BookcaseDestroyAction $action)
    {
        $action($bookcase);

        return redirect()->route('bookcases.index')
            ->with('success', __('messages.users.deleted'));
    }
}
