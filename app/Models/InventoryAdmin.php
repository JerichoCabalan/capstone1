<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InventoryAdmin extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function user()
    {
        return $this->hasMany(User::class, "inventory_admin_id");
    }
    public function borrow()
    {
        return $this->hasMany(BorrowStock::class, "inventory_admin_id");
    }
}