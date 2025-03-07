<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\Product;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index() {
        return Inertia::render('Invoices/Index');
    }

    public function create()
    {
        return Inertia::render('Invoices/Create', [
            'customers' => Customer::all(['id', 'name']),
            'products' => Product::all(['id', 'name', 'price']),
        ]);
    }    
}
