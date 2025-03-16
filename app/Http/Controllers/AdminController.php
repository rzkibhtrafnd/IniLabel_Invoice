<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Redirect;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::select(['id', 'username', 'email', 'notelepon', 'alamat'])
                ->latest()
                ->paginate(15)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username'  => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|min:6',
            'notelepon' => 'nullable|string|max:255',
            'alamat'    => 'nullable|string',
        ]);

        User::create([
            'id'        => Str::uuid(),
            'username'  => $validated['username'],
            'email'     => $validated['email'],
            'password'  => Hash::make($validated['password']),
            'notelepon' => $validated['notelepon'] ?? null,
            'alamat'    => $validated['alamat'] ?? null,
        ]);

        return Redirect::route('users.index')->with('message', 'Data Berhasil Disimpan!');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'username'  => 'required|string|max:255',
            'email'     => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
            'password'  => 'nullable|min:6',
            'notelepon' => 'nullable|string|max:255',
            'alamat'    => 'nullable|string',
        ]);

        $user->update([
            'username'  => $validated['username'],
            'email'     => $validated['email'],
            'password'  => $validated['password'] ? Hash::make($validated['password']) : $user->password,
            'notelepon' => $validated['notelepon'] ?? $user->notelepon,
            'alamat'    => $validated['alamat'] ?? $user->alamat,
        ]);

        return Redirect::route('users.index')->with('message', 'Data Berhasil Disimpan!');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return Redirect::route('users.index')->with('message', 'Data Berhasil Dihapus!');
    }
}
