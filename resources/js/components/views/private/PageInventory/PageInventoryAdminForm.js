import React, { useEffect, useState } from "react";
import TableInventoryAdmin from "./conponents/TableCategoryAdmin";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Col, Modal, Row } from "antd";

import TableInventory from "./conponents/TableInventory";
import { GET } from "../../../providers/useAxiosQuery";

export default function PageInventoryAdminForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const [sortInfo, setSortInfo] = useState({
        order: "descend",
        columnKey: "created_at",
        equipment_status:
            location.pathname === "inventory/equipment"
                ? "To Rapair"
                : undefined,
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
            equipment_status:
                location.pathname === "inventory/equipment"
                    ? "To Rapair"
                    : undefined,
            from: location.pathname,
        });

        setSortInfo({
            order: "descend",
            columnKey: "created_at",
        });

        return () => {};
    }, [location]);

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/inventory_admin?${new URLSearchParams(tableFilter)}`,
        "inventory_admin"
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
                    <TableInventory
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
