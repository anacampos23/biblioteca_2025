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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('genre');
            $table->integer('ISBN');
            $table->string('editorial');
            $table->integer('quantity');
            $table->string('status');
            $table->foreignUuid('bookcase_id')->constrained('bookcases')->onDelete('cascade');
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
        Schema::dropIfExists('books');
    }
};
