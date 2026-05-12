<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class ComponentesController extends Controller
{
    public function componentes(){
        $productos = Product::where('categoria', 'Componentes')->get();
        return view('subpaginas.componentes', compact('productos'));
    }
}
