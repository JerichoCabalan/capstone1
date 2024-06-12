import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { GET } from "../../../providers/useAxiosQuery";
import { Button } from "antd";

export default function PageReportChart() {
    const { data: dataSource, refetch: refetchSource } = GET(
        `api/inventory_admin`,
        "inventory_admin"
    );

    const options = {
        chart: {
            type: "column",
        },
        title: {
            text: "Equipment Report",
            align: "left",
        },
        xAxis: {
            categories: [
                "Keyboard",
                "Mouse",
                "AVR",
                "Monitor",
                "CPU",
                "Printer",
                "Power Supply",
                "System Unit",
                "Laptop Charger",
                "Projector",
            ],
            crosshair: true,
            accessibility: {
                description: "Months",
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Months",
            },
            labels: {
                formatter: function () {
                    const months = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ];
                    return months[this.value];
                },
            },
        },
        tooltip: {
            valueSuffix: " ",
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: "Equipment Stock ",
                data: [4, 2.6, 1.07, 0.68, 0.27, 0.14],
            },
            {
                name: "Critical Stock",
                data: [0.51, 1.36, 0.05, 1.41, 1.07, 0.77],
            },
        ],
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <br />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    marginLeft: "-25px",
                    borderRadius: "100px",
                }}
            >
                <Button
                    className="btn-main-primary btn-main-invert-outline b-r-none hides"
                    style={{
                        marginLeft: "10px",
                        backgroundColor: "ff6624",
                        color: "white",
                        borderColor: "ff6624",
                    }}
                    type="primary"
                >
                    Print Pdf...
                </Button>
            </div>
        </div>
    );
}
