<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Receipts;

class DashboardController extends Controller
{
    public function index()
    {
        $overviewData = [
            'totalCustomers' => Customer::count(),
            'totalOrders' => Invoice::count(),
            'totalInvoices' => Invoice::sum('total_bayar'),
            'totalReceipts' => Receipts::count(),
        ];

        // Mengambil data chart untuk bulan saat ini
        $initialChartData = $this->getChartDataForMonth(now()->month);

        return Inertia::render('Dashboard/Index', [
            'overviewData' => $overviewData,
            'initialChartData' => $initialChartData
        ]);
    }

    // API endpoint untuk mengambil data chart berdasarkan bulan
    public function getChartData(Request $request)
    {
        $month = $request->input('month', now()->month);
        $year = now()->year;

        $data = Invoice::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('count(*) as total_invoices'),
                DB::raw('sum(total_bayar) as total_amount')
            )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json($data);
    }

    // Method privat untuk mendapatkan data chart awal berdasarkan bulan
    private function getChartDataForMonth($month)
    {
        $year = now()->year;
        
        return Invoice::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('count(*) as total_invoices'),
                DB::raw('sum(total_bayar) as total_amount')
            )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'total_invoices' => $item->total_invoices,
                    'total_amount' => $item->total_amount,
                ];
            });
    }
}
