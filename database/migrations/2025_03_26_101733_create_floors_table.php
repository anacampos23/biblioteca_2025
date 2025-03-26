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
        //Floor table
        Schema::create('floors', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('name') -> unique();
            $table->timestamps();
        });

        // Intermediate table (N:M) for floors and zones
        Schema::create('floor_zone', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('floor_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('zone_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('floors');
        Schema::dropIfExists('floor_zone');
    }
};
