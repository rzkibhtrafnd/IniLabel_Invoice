<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->date('jatuh_tempo');
            $table->decimal('total_harga', 10, 2);
            $table->decimal('diskon', 10, 2);
            $table->decimal('ongkir', 10, 2);
            $table->decimal('total_bayar', 10, 2);
            $table->enum('status', ['Draft', 'Dibayar sebagian', 'Lunas', 'Dibatalkan']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
