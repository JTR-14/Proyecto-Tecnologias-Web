<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ComponentesController extends Controller
{
    public function componentes(){
        return view('subpaginas.componentes');
    }
}
