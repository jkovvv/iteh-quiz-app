<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function get($id)
    {
        $question = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found']);
        }

        return response()->json($user);
    }
    public function show()
    {
        return response()->json(Auth::user());
    }

    public function user(Request $request) {
        return response()->json($request->user());
    }
}