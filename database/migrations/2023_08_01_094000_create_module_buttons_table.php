<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModuleButtonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('module_buttons', function (Blueprint $table) {
            $table->id();

            $table->integer("module_id")->nullable();
            $table->string("mod_button_code")->nullable();
            $table->string("mod_button_name")->nullable();
            $table->string("mod_button_description")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('module_buttons');
    }
}
