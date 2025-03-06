<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class CustomerController extends Controller
{
    public function index()
    {
        return Inertia::render('Customers/Index', [
            'customers' => Customer::all(['id', 'name', 'email', 'phone', 'address'])->toArray()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customer,email',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        Customer::create($validated);

        return Redirect::route('customers.index')->with('message', 'Data Berhasil Disimpan!');
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customer,email,'.$customer->id,
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        $customer->update($validated);

        return Redirect::route('customers.index')->with('message', 'Data Berhasil Disimpan!');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return Redirect::route('customers.index')->with('message', 'Data Berhasil Dihapus!');
    }
}
