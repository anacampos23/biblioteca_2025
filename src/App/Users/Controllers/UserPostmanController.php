<?php

namespace App\Users\Controllers;

use App\Core\Controllers\Controller;
use Domain\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserPostmanController extends Controller
{
   public function jsonUsers(Request $request): JsonResponse
{
    $query = User::query();

    if ($request->has('created_after')) {
            $date = Carbon::createFromFormat('d/m/Y', $request->input('created_after'))->startOfDay();
            $query->where('created_at', '>', $date);
        }

    $users = $query->get();


    return response()->json(['users' => $users]);
}
}
