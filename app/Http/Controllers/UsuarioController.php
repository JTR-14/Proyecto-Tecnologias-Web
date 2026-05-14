<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    public function usuario()
    {
        return view('subpaginas.usuario');
    }

    public function actualizarFoto(Request $request)
    {
        $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $user = Auth::user();
        $path = $request->file('foto')->store('avatars', 'public');
        $user->foto = 'storage/' . $path;
        $user->save();

        return back()->with('success', 'Foto de perfil actualizada correctamente.');
    }
}
