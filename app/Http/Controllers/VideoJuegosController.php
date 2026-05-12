<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VideoJuegosController extends Controller
{
    public function videojuegos(){
        return view('subpaginas.videojuegos');
    }
}
