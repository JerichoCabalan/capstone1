import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import { Button, Spin, Alert } from "antd";
import HighchartsReact from "highcharts-react-official";
import { GET } from "../../../providers/useAxiosQuery";

export default function PageReportChart() {
    const {
        data: dataSource,
        error,
        isLoading,
    } = GET(`api/inventory_admin`, "inventory_admin");

    const [chartOptions, setChartOptions] = useState(null);
    useEffect(() => {
        console.log("Fetched dataSource:", dataSource);

        const processData = (data) => {
            const categories = data.map((item) => item.category);
            const equipmentStock = data.map((item) => Number(item.no_of_stock));
            const criticalStock = data.map((item) =>
                Number(item.restocking_point)
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
                    categories: categories,
                    crosshair: true,
                    accessibility: {
                        description: "Categories",
                    },
                },
                accessibility: {
                    enabled: false,
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Stock Levels",
                    },
                },
                // tooltip: {
                //     valueSuffix: "units",
                // },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                    },
                },
                series: [
                    {
                        name: "Equipment Stock",
                        data: equipmentStock,
                        color: "green",
                    },
                    {
                        name: "Critical Stock",
                        data: criticalStock,
                        color: "red",
                    },
                ],
            };
            setChartOptions(options);
        };

        if (!dataSource) {
            console.warn("Data source is null or undefined.");
        } else if (Array.isArray(dataSource)) {
            if (dataSource.length > 0) {
                processData(dataSource);
            } else {
                console.warn("Data source array is empty.");
            }
        } else if (typeof dataSource === "object") {
            const dataArray =
                dataSource.items ||
                dataSource.data ||
                Object.values(dataSource)[0];
            if (Array.isArray(dataArray) && dataArray.length > 0) {
                processData(dataArray);
            } else {
                console.error(
                    "Unexpected data structure, data source does not contain a non-empty array:",
                    dataSource
                );
            }
        } else {
            console.error("Unexpected data structure:", dataSource);
        }
    }, [dataSource]);

    if (isLoading) {
        return <Spin size="large" />;
    }

    if (error) {
        return <Alert message="Error fetching data" type="error" />;
    }

    return (
        <div>
            {chartOptions ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            ) : (
                <Alert message="No data available" type="info" />
            )}
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
                        backgroundColor: "#ff6624",
                        color: "white",
                        borderColor: "#ff6624",
                    }}
                    type="primary"
                >
                    Print Pdf...
                </Button>
            </div>
        </div>
    );
}
