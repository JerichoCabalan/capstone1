<?php

namespace Database\Seeders;

use App\Models\InventoryAdmin;
use Illuminate\Database\Seeder;

class IventoryAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $DATA = [
            [
                "unit_no"=>    "1",
                "description" =>   "CIVO (Black and Red",
                "assign_comlab" =>   "Working in Lab",
                "category" =>   "CL 10",
               "date_acquired" => date('Y-m-d'),
                "amount" =>   "1000",
                "equipment_status" =>   "Working in Lab",
                "person_liable" =>   "Dr. Vicente A. Pitogo",
                "supplier" =>   "Magpangwa ",
                "item_no" =>   "1982",
                "property_no" =>   "anii b2Zh",
                "control_no" =>   "123",
                "serial_no" =>   "ANIIB2387537",
                "no_of_stock" =>   "10",
                "restocking_point" =>   "10",
                "remarks" =>   "",
            ],
            [
                "unit_no"=>    "1",
                "description" =>   "Acer",
                "assign_comlab" =>   "CL1",
                "category" =>   "Monitor",
               "date_acquired" => date('Y-m-d'),
                "amount" =>   "1000",
                "equipment_status" =>   "Working and Available",
                "person_liable" =>   "Dr. Vicente A. Pitogo",
                "supplier" =>   "CCIS",
                "item_no" =>   "1982",
                "property_no" =>   "anii b2Zh",
                "control_no" =>   "123",
                "serial_no" =>   "ANIIB2387537",
                "no_of_stock" =>   "10",
                "restocking_point" =>   "10",
                "remarks" =>   "",
            ],
            [
                "unit_no"=>    "1",
                "description" =>   "Acer",
                "assign_comlab" =>   "CL1",
                "category" =>   "Monitor",
               "date_acquired" => date('Y-m-d'),
                "amount" =>   "1000",
                "equipment_status" =>   "Working and Available",
                "person_liable" =>   "Dr. Vicente A. Pitogo",
                "supplier" =>   "CCIS",
                "item_no" =>   "1982",
                "property_no" =>   "anii b2Zh",
                "control_no" =>   "123",
                "serial_no" =>   "ANIIB2387537",
                "no_of_stock" =>   "10",
                "restocking_point" =>   "10",
                "remarks" =>   "",
            ],
            [
                "unit_no" => '123',
                "description" => 'Lorem ipsum dolor sit amet',
                "assign_comlab" => 'John Doe',
                "category" => 'Category A',
                "date_acquired" => '2024-06-06',
                "amount" => 1000.50,
                "equipment_status" => 'Working',
                "person_liable" => 'Jane Doe',
                "supplier" => 'Supplier A',
                "item_no" => 'item-001',
                "property_no" => 'prop-001',
                "control_no" => 'ctrl-001',
                "serial_no" => 'serial-001',
                "no_of_stock" => 10,
                "restocking_point" => 5,
                "remarks" => 'Lorem ipsum dolor sit amet',
            ],
            [
                "unit_no" => '456',
                "description" => 'Consectetur adipiscing elit',
                "assign_comlab" => 'Alice Smith',
                "category" => 'Category B',
                "date_acquired" => '2023-05-15',
                "amount" => 750.25,
                "equipment_status" => 'Damaged',
                "person_liable" => 'Bob Johnson',
                "supplier" => 'Supplier B',
                "item_no" => 'item-002',
                "property_no" => 'prop-002',
                "control_no" => 'ctrl-002',
                "serial_no" => 'serial-002',
                "no_of_stock" => 5,
                "restocking_point" => 2,
                "remarks" => 'Consectetur adipiscing elit',
            ],
            [
                "unit_no" => '101112',
                "description" => 'Ut labore et dolore magna aliqua',
                "assign_comlab" => 'Grace Wilson',
                "category" => 'Category D',
                "date_acquired" => '2021-12-12',
                "amount" => 1500.00,
                "equipment_status" => 'In use',
                "person_liable" => 'Sam Taylor',
                "supplier" => 'Supplier D',
                "item_no" => 'item-004',
                "property_no" => 'prop-004',
                "control_no" => 'ctrl-004',
                "serial_no" => 'serial-004',
                "no_of_stock" => 12,
                "restocking_point" => 4,
                "remarks" => 'Ut labore et dolore magna aliqua',
            ],

            ];

            InventoryAdmin::truncate(); 
            InventoryAdmin::insert($DATA);
    }
}