import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET, POST } from "../../../providers/useAxiosQuery";
import { Button, Col, Row, notification } from "antd";

import TableBorrowStockAdmin from "./conponents/TableBorrowStockAdmin";
export default function PageBorrowedStock() {
    const navigate = useNavigate();
    const location = useLocation();

    const [sortInfo, setSortInfo] = useState({
        order: "descend",
        columnKey: "created_at",
    });

    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 50,
        search: "",
        sort_field: "created_at",
        sort_order: "desc",
        status:
            location.pathname === "/students/current"
                ? "Active"
                : "Deactivated",
        from: location.pathname,
    });

    useEffect(() => {
        setTableFilter({
            page: 1,
            page_size: 50,
            search: "",
            sort_field: "created_at",
            sort_order: "desc",
            status:
                location.pathname === "/students/current"
                    ? "Active"
                    : "Deactivated",
            from: location.pathname,
        });

        setSortInfo({
            order: "descend",
            columnKey: "created_at",
        });
    }, [location]);

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/borrow_stock?${new URLSearchParams(tableFilter)}`,
        "borrow_stock"
    );
    useEffect(() => {
        if (dataSource) {
            console.log("Fetched Data Source: ", dataSource);
        }
    }, [dataSource]);

    useEffect(() => {
        console.log("tableFilter", tableFilter);
        refetchSource();
    }, [tableFilter, refetchSource]);

    return (
        <>
            <Col xs={24} sm={24} md={24}></Col>
            <Row gutter={[12, 12]}>
                <Col sm={24} md={24}>
                    <TableBorrowStockAdmin
                        dataSource={dataSource}
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                        sortInfo={sortInfo}
                        setSortInfo={setSortInfo}
                    />
                </Col>
            </Row>
        </>
    );
}
