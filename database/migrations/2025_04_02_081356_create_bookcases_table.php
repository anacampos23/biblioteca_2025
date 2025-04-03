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
        Schema::create('bookcases', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->integer('bookcase_name');
            $table->foreignUuid('zone_id')->constrained('zones')->onDelete('cascade');
            $table->foreignUuid('floor_id')->constrained('floors')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookcases');
    }
};
