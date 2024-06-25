import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import { Button, Spin, Alert, Col } from "antd";
import HighchartsReact from "highcharts-react-official";
import { GET } from "../../../providers/useAxiosQuery";
import FloatSelect from "../../../providers/FloatSelect";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/pro-regular-svg-icons";

export default function PageReportChart() {
    // Chart
    const {
        data: dataSource,
        error,
        isLoading,
    } = GET(`api/inventory_admin`, "inventory_admin");
    const { data: dataBorrow } = GET(`api/borrow_stock`, "borrow_stock");

    const [chartOptions, setChartOptions] = useState(null);
    const [comlabOptions, setComlabOptions] = useState(null);
    const [selectedOption, setSelectedOption] = useState("All");
    const [borrowDataOption, setBorrowDataOption] = useState(null);
    const [noOfStickersOption, setNoOfStickersOption] = useState(null);
    const [equipmentStatusDataOption, setEquipmentStatusDataOption] =
        useState(null);
    const [desposalOptions, setDesposalOptions] = useState(null);

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
        if (error) {
            console.error("Error fetching data:", error);
            return;
        }

        if (!dataSource) {
            console.warn("Data source is null or undefined.");
            return;
        }

        const processData = (data) => {
            const filteredData = filterData(data, selectedOption);

            let combinedData = filteredData.reduce((acc, item) => {
                const found = acc.find((a) => a.category === item.category);
                if (found) {
                    found.no_of_stock += Number(item.no_of_stock);
                    found.restocking_point += Number(item.restocking_point);
                } else {
                    acc.push({
                        category: item.category,
                        no_of_stock: Number(item.no_of_stock),
                        restocking_point: Number(item.restocking_point),
                    });
                }
                return acc;
            }, []);

            combinedData = combinedData.sort(
                (a, b) => b.no_of_stock - a.no_of_stock
            );
            const categories = combinedData.map((item) => item.category);
            const equipmentStock = combinedData.map((item) => item.no_of_stock);
            const criticalStock = combinedData.map(
                (item) => item.restocking_point
            );

            const chartOptions = {
                chart: { type: "column" },
                title: { text: "Equipment Stock", align: "left" },
                xAxis: { categories: categories, crosshair: true },
                yAxis: { min: 0, title: { text: "Stock Levels" } },
                plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
                series: [
                    {
                        colorByPoint: true,
                        name: "Equipment Stock",
                        groupPadding: 0,
                        data: equipmentStock,
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: "#FFFFFF",
                            inside: true,
                            verticalAlign: "top",
                            format: "{point.y}",
                            y: 10,
                            style: {
                                fontSize: "13px",
                                fontFamily: "Verdana, sans-serif",
                            },
                        },
                    },
                ],
                credits: { enabled: true, text: "Inventory Management System" },
            };
            setChartOptions(chartOptions);

            const comlabData = filteredData.filter(
                (item) =>
                    item.equipment_status === "To Repair" && item.assign_comlab
            );

            const combinedComlabData = comlabData.reduce((acc, item) => {
                const found = acc.find(
                    (a) =>
                        a.assign_comlab === item.assign_comlab &&
                        a.category === item.category
                );
                if (found) {
                    found.no_of_stock += Number(item.no_of_stock);
                } else {
                    acc.push({
                        assign_comlab: item.assign_comlab,
                        category: item.category,
                        no_of_stock: Number(item.no_of_stock),
                    });
                }
                return acc;
            }, []);

            combinedComlabData.sort((a, b) => b.no_of_stock - a.no_of_stock);

            const comlabCategories = combinedComlabData.map(
                (item) => `${item.assign_comlab} (${item.category})`
            );

            const uniqueComlabs = [...new Set(comlabCategories)].join(", ");
            const comlabStock = combinedComlabData.map((item) =>
                Number(item.no_of_stock)
            );

            const comlabChartOptions = {
                chart: { type: "column" },
                title: { text: `To Repair -> ${uniqueComlabs}`, align: "left" },
                xAxis: { categories: comlabCategories, crosshair: true },
                yAxis: { title: { text: "Equipment To Repair Count" } },
                plotOptions: { bar: { pointPadding: 0.2, borderWidth: 0 } },

                series: [
                    {
                        colorByPoint: true,
                        name: "Comlab Equipment To Repair",
                        groupPadding: 0,
                        data: combinedComlabData.map((item) => ({
                            y: Number(item.no_of_stock),
                            assign_comlab: item.assign_comlab,
                        })),
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: "#FFFFFF",
                            inside: true,
                            verticalAlign: "top",
                            format: "{point.assign_comlab}",
                            y: 10,
                            style: {
                                fontSize: "13px",
                                fontFamily: "Verdana, sans-serif",
                            },
                        },
                    },
                ],
                credits: { enabled: false },
            };
            setComlabOptions(comlabChartOptions);

            const equipmentStatusCounts = filteredData.reduce((acc, item) => {
                if (acc[item.equipment_status]) {
                    acc[item.equipment_status]++;
                } else {
                    acc[item.equipment_status] = 1;
                }
                return acc;
            }, {});

            const equipmentStatusArray = Object.entries(
                equipmentStatusCounts
            ).map(([status, count]) => ({ status, count }));

            equipmentStatusArray.sort((a, b) => b.count - a.count);

            const equipmentStatusCategories = equipmentStatusArray.map(
                (item) => item.status
            );
            const equipmentStatusData = equipmentStatusArray.map(
                (item) => item.count
            );
            const equipmentStatusDataOption = {
                chart: { type: "column" },
                title: { text: "Equipment Status Count", align: "left" },
                xAxis: {
                    categories: equipmentStatusCategories,
                    crosshair: true,
                },
                yAxis: { title: { text: "Equipment Status Count" } },
                plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
                series: [
                    {
                        colorByPoint: true,
                        name: "Equipment Status Count",
                        groupPadding: 0,
                        data: equipmentStatusData,
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: "#FFFFFF",
                            inside: true,
                            verticalAlign: "top",
                            format: "{point.y}",
                            y: 10,
                            style: {
                                fontSize: "13px",
                                fontFamily: "Verdana, sans-serif",
                            },
                        },
                    },
                ],
                credits: { enabled: false },
            };

            setEquipmentStatusDataOption(equipmentStatusDataOption);

            const remarksData = filteredData.reduce((acc, item) => {
                if (item.remarks === "No. Sticker") {
                    const key = `${item.assign_comlab} (${item.category})`;
                    if (acc[key]) {
                        acc[key] += 1;
                    } else {
                        acc[key] = 1;
                    }
                }
                return acc;
            }, {});

            console.log(remarksData);

            const assignComlabCategories = Object.keys(remarksData);
            const noOfStickers = Object.values(remarksData);

            const noOfStickersOption = {
                chart: { type: "column" },
                title: { text: "No. Sticker per Assign Comlab", align: "left" },
                xAxis: { categories: assignComlabCategories, crosshair: true },
                yAxis: { title: { text: "No. Stickers" } },
                plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
                series: [
                    {
                        colorByPoint: true,
                        name: "No. Stickers",
                        groupPadding: 0,
                        data: noOfStickers,
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: "#FFFFFF",
                            inside: true,
                            verticalAlign: "top",
                            format: "{point.y}",
                            y: 10,
                            style: {
                                fontSize: "13px",
                                fontFamily: "Verdana, sans-serif",
                            },
                        },
                    },
                ],
                credits: { enabled: false },
            };

            setNoOfStickersOption(noOfStickersOption);

            const remarksDatas = filteredData.reduce((acc, item) => {
                if (item.equipment_status === "Disposed") {
                    const key = `${item.assign_comlab} (${item.category})`;
                    if (acc[key]) {
                        acc[key] += 1;
                    } else {
                        acc[key] = 1;
                    }
                }
                return acc;
            }, {});

            console.log(remarksData);

            const assignComlabCategoriess = Object.keys(remarksDatas);
            const noOfStickerss = Object.values(remarksDatas);

            const desposalOptions = {
                chart: { type: "column" },
                title: {
                    text: "Equipment Disposed Status Count",
                    align: "left",
                },
                xAxis: { categories: assignComlabCategoriess, crosshair: true },
                yAxis: { title: { text: "Equipment Disposed Status Count" } },
                plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
                series: [
                    {
                        colorByPoint: true,
                        name: "Equipment  Disposed Status Count",
                        groupPadding: 0,
                        data: noOfStickerss,
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: "#FFFFFF",
                            inside: true,
                            verticalAlign: "top",
                            format: "{point.y}",
                            y: 10,
                            style: {
                                fontSize: "13px",
                                fontFamily: "Verdana, sans-serif",
                            },
                        },
                    },
                ],
                credits: { enabled: false },
            };

            setDesposalOptions(desposalOptions);
        };

        const processBorrowData = (data) => {
            const filteredData = filterData(data, selectedOption);
            const groupedData = filteredData.reduce((acc, item) => {
                if (item.borrow_status !== "pending") {
                    const key = item.category;
                    if (!acc[key]) {
                        acc[key] = 0;
                    }
                    acc[key] += 1;
                }
                return acc;
            }, {});

            const totalBorrows = Object.entries(groupedData).map(
                ([category, count]) => ({
                    category,
                    count,
                })
            );
            totalBorrows.sort((a, b) => b.count - a.count);
            const highestBorrow = totalBorrows.reduce(
                (max, item) => (item.count > max.count ? item : max),
                totalBorrows[0]
            );

            const lowestBorrow = totalBorrows.reduce(
                (min, item) => (item.count < min.count ? item : min),
                totalBorrows[0]
            );

            const borrowDataOption = {
                chart: { type: "column" },
                title: {
                    text: "Highest And Lowest Usage Equipment",
                    align: "left",
                },
                xAxis: {
                    categories: totalBorrows.map((item) => item.category),
                    crosshair: true,
                },
                yAxis: { title: { text: "Borrow Count" } },
                plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
                series: [
                    {
                        colorByPoint: true,
                        name: "Borrow Count",
                        groupPadding: 0,
                        data: totalBorrows.map((item) => ({
                            name: item.category,
                            y: item.count,
                        })),
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: "#FFFFFF",
                            inside: true,
                            verticalAlign: "top",
                            style: {
                                fontSize: "13px",
                                fontFamily: "Verdana, sans-serif",
                            },
                        },
                    },
                ],
                credits: { enabled: false },
            };

            setBorrowDataOption(borrowDataOption);
        };

        if (Array.isArray(dataSource)) {
            processData(dataSource);
        } else if (dataSource && typeof dataSource === "object") {
            const dataArray =
                dataSource.items ||
                dataSource.data ||
                Object.values(dataSource)[0];
            if (Array.isArray(dataArray)) {
                processData(dataArray);
            } else {
                console.error("Unexpected data structure:", dataSource);
            }
        }

        if (Array.isArray(dataBorrow)) {
            processBorrowData(dataBorrow);
        } else if (dataBorrow && typeof dataBorrow === "object") {
            const dataArray = dataBorrow.items || dataBorrow.data;
            if (Array.isArray(dataArray)) {
                processBorrowData(dataArray);
            } else {
                console.error("Unexpected borrow data structure:", dataBorrow);
            }
        } else {
            console.warn("Borrow data source is null or undefined.");
        }
    }, [dataSource, dataBorrow, selectedOption, error]);

    if (isLoading) {
        return <Spin size="large" />;
    }

    if (error) {
        return <Alert message="Error fetching data" type="error" />;
    }

    return (
        <div>
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
                    <FontAwesomeIcon icon={faFilePdf} />
                    Print Pdf...
                </Button>
            </div>
            <Col xs={10} sm={2} md={2} lg={2} xl={2} xxl={2}>
                <FloatSelect
                    label="Report Data"
                    placeholder="Report Data"
                    required
                    options={getOptions()}
                    onChange={handleSelectChange}
                />
            </Col>
            {chartOptions ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            ) : (
                <Alert message="No data available" type="info" />
            )}

            <div>
                {comlabOptions ? (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={comlabOptions}
                    />
                ) : (
                    <Alert message="No data available" type="info" />
                )}
                {borrowDataOption ? (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={borrowDataOption}
                    />
                ) : (
                    <Alert message="No data available" type="info" />
                )}
                {equipmentStatusDataOption ? (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={equipmentStatusDataOption}
                    />
                ) : (
                    <Alert message="No data available" type="info" />
                )}
                {noOfStickersOption ? (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={noOfStickersOption}
                    />
                ) : (
                    <Alert message="No data available" type="info" />
                )}
                {desposalOptions ? (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={desposalOptions}
                    />
                ) : (
                    <Alert message="No data available" type="info" />
                )}
            </div>
        </div>
    );
}
