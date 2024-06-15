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
    const [comlabOptions, setComlabOptions] = useState(null);
    const [highandlowOptions, setHighandlowOptions] = useState(null);

    useEffect(() => {
        console.log("Fetched dataSource:", dataSource);

        const processData = (data) => {
            const categories = data.map((item) => item.category);
            const equipmentStock = data.map((item) => Number(item.no_of_stock));
            const criticalStock = data.map((item) =>
                Number(item.restocking_point)
            );
            const highestStock = Math.max(...equipmentStock);
            const lowestStock = Math.min(...equipmentStock);

            console.log("Highest Stock:", highestStock);
            console.log("Lowest Stock:", lowestStock);

            const options = {
                chart: {
                    type: "column",
                    events: {
                        click: function (event) {
                            if (
                                event.target.textContent ===
                                "Inventory Management System"
                            ) {
                                window.location.href = "http://127.0.0.1:8001";
                            }
                        },
                    },
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
                credits: {
                    enabled: true,
                    text: "Inventory Management System",
                    events: {
                        click: function (event) {
                            if (
                                event.target.textContent ===
                                "Inventory Management System"
                            ) {
                                window.location.href = "http://127.0.0.1:8001";
                            }
                        },
                    },
                },
            };
            setChartOptions(options);

            // Process comlabOptions data
            const comlabData = data.filter(
                (item) =>
                    item.equipment_status === "To Repair" && item.assign_comlab
            );

            const comlabCategories = comlabData.map(
                (item) => `${item.assign_comlab} (${item.category})`
            );
            const uniqueComlabs = [...new Set(comlabCategories)].join(", ");
            const comlabStock = comlabData.map((item) =>
                Number(item.no_of_stock)
            );

            const comlabChartOptions = {
                chart: {
                    type: "column",
                },
                title: {
                    text: `To Repair in ${uniqueComlabs}`,
                    align: "left",
                },
                xAxis: {
                    categories: comlabCategories,
                    crosshair: true,
                    accessibility: {
                        description: "Assigned Comlabs",
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Equipment To Repair",
                    },
                },
                plotOptions: {
                    bar: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                    },
                },
                series: [
                    {
                        name: "Comlab Equipment Stock",
                        data: comlabStock,
                        color: "purple",
                    },
                ],
                credits: {
                    enabled: false,
                },
            };
            setComlabOptions(comlabChartOptions);

            // Process highandlowOptions data
            const highestStockItem = data.find(
                (item) => Number(item.no_of_stock) === highestStock
            );
            const lowestStockItem = data.find(
                (item) => Number(item.no_of_stock) === lowestStock
            );

            const highandlowCategories = [
                highestStockItem?.category || "N/A",
                lowestStockItem?.category || "N/A",
            ];
            const highandlowStock = [highestStock, lowestStock];

            const highandlowChartOptions = {
                chart: {
                    type: "column",
                },
                title: {
                    text: "Highest and Lowest Stock Levels",
                    align: "left",
                },
                xAxis: {
                    categories: highandlowCategories,
                    crosshair: true,
                    accessibility: {
                        description: "Categories",
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Highest and Lowest Stock Levels",
                    },
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                    },
                },
                series: [
                    {
                        name: "Stock Levels",
                        data: highandlowStock,
                        color: "orange",
                    },
                ],
                credits: {
                    enabled: false,
                },
            };
            setHighandlowOptions(highandlowChartOptions);
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
            if (dataArray && dataArray.length > 0) {
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
                ></div>
            </div>
            <div>
                {comlabOptions ? (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={comlabOptions}
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
                ></div>
            </div>
            <div>
                {highandlowOptions ? (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={highandlowOptions}
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
        </div>
    );
}
