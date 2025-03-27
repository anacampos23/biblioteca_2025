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
        //Zone table
        Schema::create('zones', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('name') -> unique();
            $table->string('description');
            $table->timestamps();
        });

        // Intermediate table (N:M) for floors and zones
        Schema::create('floor_zone', function (Blueprint $table) {
            $table->foreignUuid('floors_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('zones_id')->constrained()->onDelete('cascade');
            $table->primary(['floors_id', 'zones_id'], 'id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zones');
        Schema::dropIfExists('floor_zone');
    }
};
