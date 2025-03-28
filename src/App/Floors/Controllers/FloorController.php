<?php

namespace App\Floors\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Domain\Floors\Models\Floor;
use Domain\Floors\Requests\FloorRequest;
use Inertia\Response;
use Domain\Floors\Actions\FloorStoreAction;
use Illuminate\Support\Facades\Validator;



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
        return Inertia::render('floors/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, FloorStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'capacity_zones' => [ 'numeric', 'min:0', 'max:20'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }
        
        $action($validator->validated());

        return redirect()->route('users.index')
            ->with('success', __('messages.users.created'));
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
