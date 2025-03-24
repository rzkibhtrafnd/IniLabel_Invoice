<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/Index', [
            'products' => Product::select(['id', 'name', 'description', 'price', 'stock'])
                ->latest()
                ->paginate(15)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        Product::create($validated);

        return Redirect::route('products.index')->with('message', 'Success.Data Berhasil Disimpan!');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        $product->update($validated);

        return Redirect::route('products.index')->with('message', 'Success.Data Berhasil Disimpan!');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return Redirect::route('products.index')->with('message', 'Data Berhasil Dihapus!');
    }
}
