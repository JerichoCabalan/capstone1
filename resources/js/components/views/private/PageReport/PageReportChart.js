import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import { Button, Spin, Alert, Col } from "antd";
import HighchartsReact from "highcharts-react-official";
import { GET } from "../../../providers/useAxiosQuery";
import FloatSelect from "../../../providers/FloatSelect";
import moment from "moment";

export default function PageReportChart() {
    const {
        data: dataSource,
        error,
        isLoading,
    } = GET(`api/inventory_admin`, "inventory_admin");

    const [chartOptions, setChartOptions] = useState(null);
    const [comlabOptions, setComlabOptions] = useState(null);
    const [selectedOption, setSelectedOption] = useState("All");

    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };

    const getOptions = () => {
        return [
            { value: "All", label: "All" },
            { value: "this day", label: "this day" },
            { value: "last 3 days", label: "last 3 days" },
            { value: "this week", label: "this week" },
            { value: "last month", label: "last month" },
            { value: "last year", label: "last year" },
        ];
    };

    const filterData = (data, filter) => {
        const now = moment();
        switch (filter) {
            case "this day":
                return data.filter((item) =>
                    moment(item.date).isSame(now, "day")
                );
            case "last 3 days":
                return data.filter((item) =>
                    moment(item.date).isBetween(
                        now.clone().subtract(3, "days"),
                        now
                    )
                );
            case "this week":
                return data.filter((item) =>
                    moment(item.date).isSame(now, "week")
                );
            case "last month":
                return data.filter((item) =>
                    moment(item.date).isSame(
                        now.clone().subtract(1, "month"),
                        "month"
                    )
                );
            case "last year":
                return data.filter((item) =>
                    moment(item.date).isSame(
                        now.clone().subtract(1, "year"),
                        "year"
                    )
                );
            default:
                return data;
        }
    };

    useEffect(() => {
        if (!dataSource) {
            console.warn("Data source is null or undefined.");
            return;
        }

        const processData = (data) => {
            const filteredData = filterData(data, selectedOption);
            const categories = filteredData.map((item) => item.category);
            const equipmentStock = filteredData.map((item) =>
                Number(item.no_of_stock)
            );
            const criticalStock = filteredData.map((item) =>
                Number(item.restocking_point)
            );

            const chartOptions = {
                chart: { type: "column" },
                title: { text: "Equipment Stock", align: "left" },
                xAxis: { categories: categories, crosshair: true },
                yAxis: { min: 0, title: { text: "Stock Levels" } },
                plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
                series: [
                    {
                        name: "Equipment Stock",
                        data: equipmentStock,
                        color: "green",
                    },
                ],
                credits: { enabled: true, text: "Inventory Management System" },
            };
            setChartOptions(chartOptions);

            const comlabData = filteredData.filter(
                (item) =>
                    item.equipment_status === "To Repair" && item.assign_comlab
            );

            const comlabCategories = comlabData.map(
                (item) => `${item.assign_comlab} (${item.category})`
            );
            const uniqueComlabs = [...new Set(comlabCategories)].join(", ");
            const uniqueStatus = [
                ...new Set(comlabData.map((item) => item.equipment_status)),
            ].join(", ");
            const comlabStock = comlabData.map((item) =>
                Number(item.no_of_stock)
            );

            const comlabChartOptions = {
                chart: {
                    type: "column",
                },
                title: {
                    text: `${uniqueStatus} -> ${uniqueComlabs}`,
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
                        text: "Equipment To Repair Count",
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
                        name: "Comlab Equipment To Repair",
                        data: comlabStock,
                        color: "purple",
                    },
                ],
                credits: {
                    enabled: false,
                },
            };
            setComlabOptions(comlabChartOptions);
        };

        if (Array.isArray(dataSource)) {
            processData(dataSource);
        } else if (typeof dataSource === "object") {
            const dataArray =
                dataSource.items ||
                dataSource.data ||
                Object.values(dataSource)[0];
            if (dataArray && Array.isArray(dataArray)) {
                processData(dataArray);
            } else {
                console.error("Unexpected data structure:", dataSource);
            }
        } else {
            console.error("Unexpected data structure:", dataSource);
        }
    }, [dataSource, selectedOption]);

    if (isLoading) {
        return <Spin size="large" />;
    }

    if (error) {
        return <Alert message="Error fetching data" type="error" />;
    }

    return (
        <div>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <FloatSelect
                    label="Report Data"
                    placeholder="Report Data"
                    required
                    options={getOptions()}
                    onChange={handleSelectChange}
                />
                {chartOptions ? (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                    />
                ) : (
                    <Alert message="No data available" type="info" />
                )}
            </Col>
            <div>
                {comlabOptions ? (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={comlabOptions}
                    />
                ) : (
                    <Alert message="No data available" type="info" />
                )}
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
