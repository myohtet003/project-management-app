<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard',  [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/my-tasks/pdf', [DashboardController::class, 'downloadMyTasksPdf'])
        ->middleware(['auth', 'verified'])->name('tasks.pdf');


    Route::resource('project', ProjectController::class);
    Route::get('task/my-tasks', [TaskController::class, 'myTasks'])->name('task.myTasks');
    Route::resource('task', TaskController::class);
    Route::resource('user', UserController::class);
});

Route::post('/tasks/{task}/comments', [CommentController::class, 'store'])
    ->middleware(['auth'])->name('task.comments.store');

Route::delete('/tasks/{task}/comments/{comment}', [CommentController::class, 'destroy'])
    ->middleware('auth')
    ->name('task.comments.destroy');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
