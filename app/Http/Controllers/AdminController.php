<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class AdminController extends Controller
{
    public function admin(){
        $productos = Product::all();
        return view('subpaginas.admin', compact('productos'));
    }
}
