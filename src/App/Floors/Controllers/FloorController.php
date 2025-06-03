<?php

namespace App\Floors\Controllers;

use App\Exports\FloorsExport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Domain\Floors\Models\Floor;
use Domain\Floors\Requests\FloorRequest;
use Inertia\Response;
use Domain\Floors\Actions\FloorStoreAction;
use Domain\Floors\Actions\FloorUpdateAction;
use Domain\Floors\Actions\FloorDestroyAction;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;


class FloorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('floors/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $floor_number_list= Floor::all()->pluck("floor_number");

        return Inertia::render('floors/Create',  ["floor_number_list"=>$floor_number_list]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, FloorStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'floor_number' =>
            ['required', 'numeric', 'max:255',
            Rule::unique('floors', 'floor_number')->ignore($request->floor_id),
        ],
            'capacity_zones' => [ 'required', 'numeric', 'min:0', 'max:20'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.created'));
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
    public function edit(Request $request, Floor $floor)
    {
        $floor_number_list= Floor::all()->pluck("floor_number"); //Lista de todos los floor_number

        return Inertia::render('floors/Edit', [
            'floor' => $floor,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            "floor_number_list"=>$floor_number_list,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  Floor $floor, FloorUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'floor_number' => ['required', 'numeric', 'max:255',
            Rule::unique('floors', 'floor_number')->ignore($floor->id),
        ],
            'capacity_zones' => [ 'numeric', 'min:0', 'max:20'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($floor, $validator->validated());

        $redirectUrl = route('floors.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.floors.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
        $action($floor);

        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.deleted'));
    }

    public function exportFloors()
    {
        return Excel::download(new FloorsExport, 'floors.xlsx');
    }
}
