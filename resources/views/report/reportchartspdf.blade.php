<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payroll Reports Template 1</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 2px;
            padding: 0;
            height: 297mm;
            background-color: #fff;
            font-size: 10px;
            text-align: center;
            /* Center align the entire document */
        }

        .header {
            margin-bottom: 20px;
            font-size: 16px;
        }

        .table-container {
            margin: -1px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8px;
            /* Adjust font size as needed */
        }

        th,
        td {
            padding: 5px;
            text-align: left;
        }

        th {
            border-bottom: 1px solid #ddd;
        }

        th.dotted {
            border-top: 2px dotted #ddd;
            border-bottom: 2px dotted #ddd;
            height: 40px;
            white-space: nowrap;
        }

        .right-align {
            text-align: left;
            margin-left: 22px;
        }

        .tr-01 {
            height: 60px;
        }

        .p-text {
            text-align: center;
            margin-top: 20px;
        }

        .page-number:before {
            content: "Page No : " counter(page);
            font-size: 10px;
        }
    </style>
</head>


<body>
    <div class="header">
        <p>TEST</p>
    </div>


    <div class="right-align" style="margin-left: -10px">
        <p class="page-number"></p>

    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th class="dotted">Unit No./th>
                    <th class="dotted">Description</th>
                    <th class="dotted">Assigned&nbsp;Comlab</th>
                    <th class="dotted">Status</th>
                    <th class="dotted">Date Acquired</th>
                    <th class="dotted">Supplier</th>
                    <th class="dotted">Amount</th>
                    <th class="dotted">Item&nbsp;No.</th>
                    <th class="dotted">Property&nbsp;No.</th>
                    <th class="dotted">Control&nbsp;No.</th>
                    <th class="dotted">Serial&nbsp;No.</th>
                    <th class="dotted">No.&nbsp;of&nbsp;Stocks</th>
                    <th class="dotted">Restocking&nbsp;Point</th>
                    <th class="dotted">Person&nbsp;Liable </th>
                    <th class="dotted">Remarks</th>

                </tr>
            </thead>
            @foreach ($data as $item)
                <tbody>
                    <tr class="tr-01">
                        <td></td>
                        <td style="width: 100px">
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            @endforeach
        </table>
    </div>
</body>

</html>
