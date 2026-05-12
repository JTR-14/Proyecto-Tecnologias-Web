<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ComponentesController;
use App\Http\Controllers\PCSController;
use App\Http\Controllers\PerifericosController;
use App\Http\Controllers\VideoJuegosController;
use App\Http\Controllers\AcercaController;


Route::get('/', function () {
    return view('index');
})->name('home');

Route::get('/admin', [AdminController::class, 'admin'])->name('admin');
Route::get('/componentes', [ComponentesController::class, 'componentes'])->name('componentes');
Route::get('/pcsgamer', [PCSController::class, 'pcsgamer'])->name('pcsgamer');
Route::get('/perifericos', [PerifericosController::class, 'perifericos'])->name('perifericos');
Route::get('/videojuegos', [VideoJuegosController::class, 'videojuegos'])->name('videojuegos');
Route::get('/acerca', [AcercaController::class, 'acercaDe'])->name('acerca');