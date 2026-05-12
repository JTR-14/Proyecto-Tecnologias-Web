<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PerifericosController extends Controller
{
    public function perifericos(){
        return view('subpaginas.perifericos');
    }
}
