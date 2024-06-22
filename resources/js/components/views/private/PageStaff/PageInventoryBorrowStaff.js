import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET } from "../../../providers/useAxiosQuery";
import { Col, Row } from "antd";
import TableInventoryBorrowStaff from "./component/TableStaffInventory";

export default function PageInventoryBorrowStaff() {
    const navigate = useNavigate();
    const location = useLocation();

    const [sortInfo, setSortInfo] = useState({
        order: "descend",
        columnKey: "created_at",
    });
    const user_id = null;
    console.log("user_id", user_id);

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
                    <TableInventoryBorrowStaff
                        dataSource={dataSource}
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                        sortInfo={sortInfo}
                        user_id={user_id}
                    />
                </Col>
            </Row>
        </>
    );
}
