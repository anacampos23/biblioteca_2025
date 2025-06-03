<?php

namespace App\Bookcases\Controllers;

use App\Core\Controllers\Controller;
use App\Exports\BookcasesExport;
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
use App\Exports\ZonesExport;
use Maatwebsite\Excel\Facades\Excel;

class BookcaseController extends Controller
{
    public function index()
    {
        $zonesArray = Zone::select(['id','name'])->get()->toArray();

        return Inertia::render('bookcases/Index', [
            'zonesArray' => $zonesArray,
        ]);
    }

    public function create()
    {
        $zones = Zone::withCount('bookcases')
            ->get()
            ->map(function ($zone) {
            return [
                'id' => $zone->id,
                'name' => $zone->name,
                'floor_id' => $zone->floor_id,
                'bookcases_count' => $zone->bookcases_count,
            ];
        })
            -> toArray();

        $floors = Floor::select(['id', 'floor_number', 'capacity_zones']) ->orderBy('floor_number', 'asc') ->get() -> toArray();
        $bookcases = Bookcase::select(['id', 'bookcase_name', 'zone_id', 'floor_id']) ->get() -> toArray();


        return Inertia::render('bookcases/Create', [
            'zones' => $zones,
            'floors' => $floors,
            'bookcases' => $bookcases,
        ]);
    }

    public function store(Request $request, BookcaseStoreAction $action, Bookcase $bookcase)
    {
        $validator = Validator::make($request->all(), [
            'zone_id' => ['required', 'exists:zones,id'],
            'floor_id' => ['required', 'exists:floors,id'],
            'bookcase_name' => [
                'required',
                'numeric',
                Rule::unique('bookcases', 'bookcase_name')
                    ->where(function ($query) use ($request) {
                        $query->where('floor_id', $request->floor_id)
                            ->where('zone_id', $request->zone_id);
                    })
                    ->ignore($bookcase->id),
            ],
            'bookcase_name' => [],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('bookcases.index')
            ->with('success', __('messages.bookcases.created'));
    }

    public function show(string $id)
    {
        //
    }

    public function edit(Request $request, Bookcase $bookcase)
    {
        $zones = Zone::withCount('bookcases')
            ->get()
            ->map(function ($zone) {
            return [
                'id' => $zone->id,
                'name' => $zone->name,
                'floor_id' => $zone->floor_id,
                'bookcases_count' => $zone->bookcases_count,
            ];
        })
            -> toArray();

        $floors = Floor::select(['id', 'floor_number', 'capacity_zones']) ->orderBy('floor_number', 'asc') ->get() -> toArray();
        $bookcases = Bookcase::select(['id', 'bookcase_name', 'zone_id', 'floor_id']) ->get() -> toArray();

        return Inertia::render('bookcases/Edit', [
            'bookcase' => $bookcase,
            'zones' => $zones,
            'floors' => $floors,
            'bookcases' => $bookcases,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function update(Request $request, Bookcase $bookcase, BookcaseUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'zone_id' => ['required', 'exists:zones,id'],
            'floor_id' => ['required', 'exists:floors,id'],
            'bookcase_name' => [],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($bookcase, $validator->validated());

        $redirectUrl = route('bookcases.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.bookcases.updated'));
    }

    public function destroy(Bookcase $bookcase, BookcaseDestroyAction $action)
    {
        $action($bookcase);

        return redirect()->route('bookcases.index')
            ->with('success', __('messages.bookcases.deleted'));
    }

    public function exportBookcases()
    {

        return Excel::download(new BookcasesExport, 'bookcases.xlsx');
    }
}
