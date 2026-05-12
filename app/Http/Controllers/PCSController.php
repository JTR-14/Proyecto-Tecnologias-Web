<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class PCSController extends Controller
{
    public function pcsgamer(){
        $productos = Product::where('categoria', 'PCs Gamer')->get();
        return view('subpaginas.pcsgamer', compact('productos'));
    }
}
