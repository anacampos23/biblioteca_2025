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
        //Columns: id, name, created_at, updated_at, zones_number
        Schema::create('floors', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->timestamps();
            $table->string('name') -> unique();
            $table->integer('zone_numbers')->default(0);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('floors');
    }
};
