import React, { useEffect, useState } from "react";
import TableInventoryAdmin from "./conponents/TableCategoryAdmin";
import { useLocation, useNavigate } from "react-router-dom";
import { GET } from "../../../providers/useAxiosQuery";
import { Button, Col, Modal, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-light-svg-icons";
import TableCategoryAdmin from "./conponents/TableCategoryAdmin";
import TableBinAdmin from "./conponents/TableBinAdmin";

export default function PageBinAdmin() {
    const navigate = useNavigate();
    const location = useLocation();

    const [sortInfo, setSortInfo] = useState({
        order: "descend",
        columnKey: "created_at",
        status:
            location.pathname === "/students/current"
                ? "Active"
                : "Deactivated",
    });

    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 50,
        search: "",
        sort_field: "created_at",
        sort_order: "desc",
        status: "Active",
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

        return () => {};
    }, [location]);

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/borrow_stock?${new URLSearchParams(tableFilter)}`,
        "borrow_stock"
    );

    useEffect(() => {
        refetchSource();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    return (
        <>
            <Col xs={24} sm={24} md={24}></Col>
            <Row gutter={[12, 12]}>
                <Col sm={24} md={24}>
                    <TableBinAdmin
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
