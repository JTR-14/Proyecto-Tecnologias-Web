<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class PerifericosController extends Controller
{
    public function perifericos(){
        $productos = Product::where('categoria', 'Perifericos')->get();
        return view('subpaginas.perifericos', compact('productos'));
    }
}
