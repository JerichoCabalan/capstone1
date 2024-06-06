<?php

namespace App\Http\Controllers;

use App\Models\BorrowStock;
use Illuminate\Http\Request;

class BorrowStockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = BorrowStock::select([
            "*",
        ]);

        if(isset($request->user_id)) {
            $data = $data->where('user_id', $request->user_id);
        }
        if(isset($request->inventory_admin_id)) {
            $data = $data->where('inventory_admin_id', $request->inventory_admin_id);
        }
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BorrowStock  $borrowStock
     * @return \Illuminate\Http\Response
     */
    public function show(BorrowStock $borrowStock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BorrowStock  $borrowStock
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BorrowStock $borrowStock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BorrowStock  $borrowStock
     * @return \Illuminate\Http\Response
     */
    public function destroy(BorrowStock $borrowStock)
    {
        //
    }

   
    public function borrow_stock_status(Request $request)
    {
        $id = $request->input('id');
        $ret = [
            "success" => false,
            "message" => "Data not Active",
        ];

        $findAccountCodes = BorrowStock::find($id);
        if ($findAccountCodes) {
            $newStatus = $findAccountCodes->borrow_status === 'pending' ? 'accept' : 'pending';
            $findAccountCodes->borrow_status = $newStatus;
            $findAccountCodes->save();

            $ret = [
                "success" => true,
                "message" => "Equipment Status " . ucfirst($newStatus) . " successfully"
            ];
        }

        return response()->json($ret, 200);
    }
}