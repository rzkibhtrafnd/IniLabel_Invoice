<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\SettingController;

Route::get('/login', function () {
    return redirect()->route('home');
});

Route::get('/', [AuthController::class, 'index'])->name('home');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('users', AdminController::class)->middleware('superadmin');
    Route::resource('customers', CustomerController::class)->middleware('superadmin');
    Route::resource('products', ProductController::class);
    Route::resource('invoices', InvoiceController::class);
    Route::get('/invoices/{invoice}/download', [InvoiceController::class, 'downloadInvoice'])->name('invoices.download');
    Route::get('/invoices/{invoice}/send-email', [InvoiceController::class, 'sendEmail'])->name('invoices.sendEmail');
    Route::resource('receipts', ReceiptController::class);
    Route::get('/receipts/{receipt}/download', [ReceiptController::class, 'downloadReceipt'])->name('receipts.download');
    Route::get('receipts/{receipt}/send-email', [ReceiptController::class, 'sendEmail'])->name('receipts.sendEmail');
    Route::resource('settings', SettingController::class)->middleware('superadmin');
});
