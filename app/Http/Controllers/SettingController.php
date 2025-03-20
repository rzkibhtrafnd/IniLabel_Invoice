<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function index()
    {
        $setting = Setting::firstOrNew([]);
    
        return Inertia::render('Settings/Index', [
            'setting' => $setting,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'banks' => 'nullable|array',
            'banks.*.name' => 'nullable|string|max:255',
            'banks.*.account_number' => 'nullable|string|max:255',
            'qris' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'contact_service' => 'nullable|string|max:255',
            'slogan' => 'nullable|string|max:255',
            'tax' => 'nullable|numeric|min:0|max:100',
        ]);

        $existingSetting = Setting::first();
        if ($existingSetting) {
            if ($existingSetting->logo) {
                Storage::disk('public')->delete($existingSetting->logo);
            }
            if ($existingSetting->qris) {
                Storage::disk('public')->delete($existingSetting->qris);
            }
            Setting::truncate();
        }

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('logo', 'public');
        }

        if ($request->hasFile('qris')) {
            $validated['qris'] = $request->file('qris')->store('qris', 'public');
        }

        Setting::create($validated);

        return back()->with('message', 'Success. Pengaturan berhasil diperbarui.');
    }
}