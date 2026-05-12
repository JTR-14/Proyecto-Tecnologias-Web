<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class VideoJuegosController extends Controller
{
    public function videojuegos(){
        $productos = Product::where('categoria', 'Videojuegos')->get();
        return view('subpaginas.videojuegos', compact('productos'));
    }
}
