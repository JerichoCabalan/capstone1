<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoryAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventory_admins', function (Blueprint $table) {
            $table->id();


            $table->integer('user_id')->nullable();
            $table->string('unit_no')->nullable();
            $table->string('description')->nullable();
            $table->string('assign_comlab')->nullable();
            $table->string('category')->nullable();
            $table->date('date_acquired')->nullable();
            $table->string('supplier')->nullable();
            $table->string('amount')->nullable();
            $table->string('item_no')->nullable();
            $table->string('property_no')->nullable();
            $table->string('control_no')->nullable();
            $table->string('serial_no')->nullable();
            $table->string('no_of_stock')->nullable();
            $table->string('restocking_point')->nullable();


            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inventory_admins');
    }
}
