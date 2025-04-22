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
            $table->uuid('id')->primary()->unique();
            $table->string('title');
            $table->string('author');
            $table->string('genre');
            $table->bigInteger('ISBN');
            $table->string('editorial');
            $table->boolean('available');
            $table->foreignUuid('bookcase_id')->constrained('bookcases')->onDelete('cascade');
            $table->foreignUuid('zone_id')->constrained('zones')->onDelete('cascade');
            $table->foreignUuid('floor_id')->constrained('floors')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('genres', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('genre_name');
            $table->timestamps();
        });

        Schema::create('book_genre', function (Blueprint $table) {
            $table->foreignUuid('book_id')->constrained('books')->onDelete('cascade');
            $table->foreignUuid('genre_id')->constrained('genres')->onDelete('cascade');

            // Clave primaria compuesta
            $table->primary(['book_id', 'genre_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
        Schema::dropIfExists('genres');
        Schema::dropIfExists('book_genre');
    }
};
