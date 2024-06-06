<?php

namespace App\Imports;

use App\Models\inventoryAdmin;
use Maatwebsite\Excel\Concerns\ToModel;

class EquipmentImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new inventoryAdmin([
            //
        ]);
    }
}
