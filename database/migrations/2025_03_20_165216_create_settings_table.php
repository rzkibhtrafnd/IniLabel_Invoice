<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->string('company_name');
            $table->string('logo')->nullable();
            $table->json('banks')->nullable();
            $table->string('qris')->nullable();
            $table->string('contact_service')->nullable();
            $table->string('slogan')->nullable();
            $table->decimal('tax', 5, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('settings');
    }
};
