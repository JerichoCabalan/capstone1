<?php

namespace App\Http\Controllers;

use App\Imports\EquipmentImport;
use App\Models\InventoryAdmin;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class InventoryAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = InventoryAdmin::select([
            "*",
        ]);
        $data = $data->where(function ($query) use ($request) {
            if ($request->search) {
                $query->orWhere("payroll_code", 'LIKE', "%$request->search%");
                $query->orWhere("employee_type", 'LIKE', "%$request->search%");
            }
        });


        if ($request->sort_field && $request->sort_order) {
            if (
                $request->sort_field != '' && $request->sort_field != 'undefined' && $request->sort_field != 'null'  &&
                $request->sort_order != ''  && $request->sort_order != 'undefined' && $request->sort_order != 'null'
            ) {
                $data = $data->orderBy(isset($request->sort_field) ? $request->sort_field : 'id', isset($request->sort_order)  ? $request->sort_order : 'desc');
            }
        } else {
            $data = $data->orderBy('id', 'desc');
        }

        if ($request->page_size) {
            $data = $data->limit($request->page_size)
                ->paginate($request->page_size, ['*'], 'page', $request->page)
                ->toArray();
        } else {
            $data = $data->get();
        }
        return response()->json([
            'success'   => true,
            'data'      => $data
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Apply Form " . ($request->id ? "update" : "saved")
        ];

        $dataAdmin = InventoryAdmin::updateOrCreate(
            ["user_id" => $request->user_id],
            [
                "user_id" => $request->user_id,
                "unit_no" => $request->unit_no,
                "description" => $request->description,
                "assign_comlab" => $request->assign_comlab,
                "category" => $request->category,
                "date_acquired" => $request->date_acquired,
                "supplier" => $request->supplier,
                "remarks" => $request->remarks,
                "date_acquired" => $request->date_acquired,
                "equipment_status" => $request->equipment_status,
                "amount" => $request->amount,
                "item_no" => $request->item_no,
                "property_no" => $request->property_no,
                "control_no" => $request->control_no,
                "serial_no" => $request->serial_no,
                "no_of_stock" => $request->no_of_stock,
                "restocking_point" => $request->restocking_point,

            ]
        );

        if ($dataAdmin) {
            $ret = [
                "success" => true,
                "message" => "Data " . ($request->id ? "updated" : "saved") . " successfully",
                "data" => $dataAdmin
            ];
        }

        return response()->json($ret, $dataAdmin ? 200 : 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\InventoryAdmin  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dataAdmin = InventoryAdmin::find($id);
        if (!$dataAdmin) {
            return response()->json(["success" => false, "message" => "Data not found"], 404);
        }

        return response()->json(["success" => true, "data" => $dataAdmin], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InventoryAdmin  $inventoryAdmin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            $dataAdmin = InventoryAdmin::updateOrCreate(
          
                [
                    "unit_no" => $request->unit_no,
                    "description" => $request->description,
                    "assign_comlab" => $request->assign_comlab,
                    "category" => $request->category,
                    "date_acquired" => $request->date_acquired,
                    "supplier" => $request->supplier,
                    "remarks" => $request->remarks,
                    "date_acquired" => $request->date_acquired,
                    "equipment_status" => $request->equipment_status,
                    "amount" => $request->amount,
                    "item_no" => $request->item_no,
                    "property_no" => $request->property_no,
                    "person_liable" => $request->person_liable,
                    "control_no" => $request->control_no,
                    "serial_no" => $request->serial_no,
                    "no_of_stock" => $request->no_of_stock,
                    "restocking_point" => $request->restocking_point,
                    "restocking_point" => $request->restocking_point,

                ]
            );
            return response()->json([
                'success' => true,
                'data'  => $dataAdmin,
                'message' => 'Data updated successfully'
            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update data',
                'error' => $exception->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InventoryAdmin  $inventoryAdmin
     * @return \Illuminate\Http\Response
     */
    // public function equipement_delete($id)
    // {
    //     $ret  = [
    //         "success" => false,
    //         "message" => "Data not delete"
    //     ];

    //     $find = InventoryAdmin::find($id);

    //     if ($find) {
    //         if ($find->delete()) {
    //             $ret  = [
    //                 "success" => true,
    //                 "message" => "Data deleted successfully"
    //             ];
    //         }
    //     }

    //     return response()->json($ret, 200);
    // }

    public function inventory_modal(Request $request){
        $ret = [
            "success" => false,
            "message" => "Apply Form " . ($request->id ? "update" : "saved")
        ];

        $dataAdmin = InventoryAdmin::updateOrCreate(
            ["id" => $request->id],
            [
                "user_id" => $request->user_id,
              
                "unit_no" => $request->unit_no,
                "description" => $request->description,
                "assign_comlab" => $request->assign_comlab,
                "category" => $request->category,
                "date_acquired" => $request->date_acquired,
                "supplier" => $request->supplier,
                "remarks" => $request->remarks,
                "date_acquired" => $request->date_acquired,
                "equipment_status" => $request->equipment_status,
                "amount" => $request->amount,
                "item_no" => $request->item_no,
                "property_no" => $request->property_no,
                "person_liable" => $request->person_liable,
                "control_no" => $request->control_no,
                "serial_no" => $request->serial_no,
                "no_of_stock" => $request->no_of_stock,
                "restocking_point" => $request->restocking_point,

            ]
        );

        if ($dataAdmin) {
            $ret = [
                "success" => true,
                "message" => "Data " . ($request->id ? "updated" : "saved") . " successfully",
                "data" => $dataAdmin
            ];
        }

        return response()->json($ret, $dataAdmin ? 200 : 500);
    }
    public function equipement_delete(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Apply Form " . ($request->id ? "update" : "saved"),
            "data" => $request->all()
        ];

        $find = InventoryAdmin::find($request->id);

        if ($find) {
            if ($find->delete()) {
                $ret  = [
                    "success" => true,
                    "message" => "Data deleted successfully"
                ];
            }
        }

        return response()->json($ret, 200);
    }



    public function process_pdf_chart(Request $request){

     $data = InventoryAdmin::all(); 

    $pdf = Pdf::loadView('pdf_chart', compact('data')); 
    return $pdf->download('chart.pdf'); 
    }

    public function model(Request $request) 
    {
        Excel::import(new EquipmentImport, $request->file('file'));
        
        return back()->with('success', 'Inventory data imported successfully.');
    }

}