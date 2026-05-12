<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AcercaController extends Controller
{
    public function acercaDe(){
        return view('subpaginas.acerca');
    }
}
