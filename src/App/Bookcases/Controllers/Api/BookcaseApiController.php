<?php

namespace App\Bookcases\Controllers\Api;

use App\Http\Controllers\Controller;
use Domain\Bookcases\Actions\BookcaseIndexAction;
use Domain\Bookcases\Actions\BookcaseStoreAction;
use Domain\Bookcases\Actions\BookcaseUpdateAction;
use Domain\Bookcases\Actions\BookcaseDestroyAction;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class BookcaseApiController extends Controller
{
    public function index(Request $request, BookcaseIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(Bookcase $bookcase)
    {
        return response()->json(['bookcase' => $bookcase]);
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
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $bookcase = $action($validator->validated());

        return response()->json([
            'message' => __('messages.zones.created'),
            'bookcase' => $bookcase
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
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedBookcase = $action($bookcase, $validator->validated());

        return response()->json([
            'message' => __('messages.zones.updated'),
            'bookcase' => $updatedBookcase
        ]);
    }

    public function destroy(Bookcase $bookcase, BookcaseDestroyAction $action)
    {
        $action($bookcase);

        return response()->json([
            'message' => __('messages.zones.deleted')
        ]);
    }
}
