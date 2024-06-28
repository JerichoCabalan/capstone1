<?php

namespace App\Imports;

use App\Models\InventoryAdmin;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class EquipmentImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if (count(array_filter($row->toArray())) === 0) {
                continue;
            }

            $date_acquired = null;

            if (!empty($row['date_acquired'])) { 
                try {
                    $date_acquired = $this->parseDate($row['date_acquired']);
                } catch (\Exception $e) {
                    Log::error("Date parsing failed for row: " . implode(", ", $row->toArray()) . " with error: " . $e->getMessage());
                    $date_acquired = null;
                }
            }

            InventoryAdmin::create([
                'unit_no' => $row['unit_no'], 
                'description' => $row['description'],
                // 'assign_comlab' => $row['assign_comlab'],
                'category' => $row['category'],
'equipment_status' => isset($row['equipment_status']) ? $row['equipment_status'] : null,       
         'date_acquired' => $date_acquired,
                'supplier' => $row['supplier'],
                'amount' => $row['amount'],
                'item_no' => $row['item_no'],
                'property_no' => $row['property_no'],
                'control_no' => $row['control_no'],
                'serial_no' => $row['serial_no'],
                // 'no_of_stock' => $row['no_of_stock'],
                // 'restocking_point' => $row['restocking_point'],
                'person_liable' => $row['person_liable'],
                'remarks' => $row['remarks'],
            ]);
        }
    }

    private function parseDate($value)
    {
        try {
            if (is_numeric($value)) {
                return Date::excelToDateTimeObject($value)->format('Y-m-d');
            } else {
                return Carbon::parse($value)->format('Y-m-d');
            }
        } catch (\Exception $e) {
            Log::error("Failed to parse date: {$value} with error: " . $e->getMessage());
            return null;
        }
    }
}