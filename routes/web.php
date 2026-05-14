<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ComponentesController;
use App\Http\Controllers\PCSController;
use App\Http\Controllers\PerifericosController;
use App\Http\Controllers\VideoJuegosController;
use App\Http\Controllers\AcercaController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('index');
})->name('home');

Route::get('/componentes', [ComponentesController::class, 'componentes'])->name('componentes');
Route::get('/pcsgamer', [PCSController::class, 'pcsgamer'])->name('pcsgamer');
Route::get('/perifericos', [PerifericosController::class, 'perifericos'])->name('perifericos');
Route::get('/videojuegos', [VideoJuegosController::class, 'videojuegos'])->name('videojuegos');
Route::get('/acerca', [AcercaController::class, 'acercaDe'])->name('acerca');

Route::middleware('auth')->group(function () {
    Route::get('/usuario', [UsuarioController::class, 'usuario'])->name('usuario');
    Route::post('/usuario/foto', [UsuarioController::class, 'actualizarFoto'])->name('usuario.foto.actualizar');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'admin'])->name('admin');
    Route::resource('productos', ProductController::class);
});

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');