<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('zones', function (Blueprint $table) {
            $table->softDeletes(); // o $table->timestamp('deleted_at')->nullable();
        });
    }

    public function down()
    {
        Schema::table('zones', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
    }
};
