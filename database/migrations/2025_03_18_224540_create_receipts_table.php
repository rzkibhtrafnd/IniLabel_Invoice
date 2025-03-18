<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('receipts', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('invoice_id')->constrained('invoices')->onDelete('cascade');
            $table->uuid('user_id');
            $table->enum('metode_pembayaran', ['Tunai', 'Transfer']);
            $table->enum('status', ['Dibayar Sebagian', 'Lunas']);
            $table->decimal('jumlah_bayar', 10, 2);
            $table->date('tanggal_bayar');
            $table->string('bukti_pembayaran');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receipts');
    }
};
