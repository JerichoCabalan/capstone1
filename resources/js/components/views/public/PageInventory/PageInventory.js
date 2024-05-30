import { Row, Button, Col, Watermark } from "antd";
import { useEffect, useState } from "react";
import { GET } from "../../../providers/useAxiosQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import TableInventory from "./TableInventory";

export default function PageInventory(watermarkProps) {
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
        `api/users?${new URLSearchParams(tableFilter)}`,
        "students_active_list"
    );

    useEffect(() => {
        refetchSource();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    return (
        <>
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={24}>
                    <div className="text-center mt-0">
                        <img src="../../../images/register.png" alt="" />
                        <h5
                            style={{
                                fontSize: "80px",
                                color: "rgb(101 3 8)",
                                marginTop: "-170px",
                            }}
                        >
                            Working Equipment
                        </h5>
                    </div>
                </Col>

                <Col xs={24} sm={24} md={24}>
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
