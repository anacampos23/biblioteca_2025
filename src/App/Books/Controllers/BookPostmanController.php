<?php

namespace App\Books\Controllers;

use App\Core\Controllers\Controller;
use Domain\Books\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookPostmanController extends Controller
{
   public function jsonBooks(Request $request): JsonResponse
{
    $query = Book::query();

    if ($request->has('available')) {
        $query->where('available', filter_var($request->input('available'), FILTER_VALIDATE_BOOLEAN));
    }

     if ($request->has('reserved')) {
        $query->where('reserved', filter_var($request->input('reserved'), FILTER_VALIDATE_BOOLEAN));
    }

    $books = $query->get();

    return response()->json(['books' => $books]);
}
}
