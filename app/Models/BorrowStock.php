<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BorrowStock extends Model
{
    use HasFactory;
    protected $guarded = [];


    public function users()
    {
        return $this->hasMany(User::class, "user_id");
    }
    public function inventory_admin_id()
    {
        return $this->hasMany(InventoryAdmin::class, "inventory_admin_id");
    }
}