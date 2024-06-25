import { Row, Button, Col } from "antd";
import { useEffect, useState } from "react";
import { GET } from "../../../providers/useAxiosQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faPlus } from "@fortawesome/pro-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import TableInventory from "./TableInventory";

export default function PageInventory() {
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

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            // Replace with actual login check logic
            const loggedIn = setIsLoggedIn(loggedIn); // Logic to determine if user is logged in
        };
        checkLoginStatus();

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
        `api/inventory_admin?${new URLSearchParams(tableFilter)}`,
        "inventory_admin"
    );
    useEffect(() => {
        if (dataSource) {
            console.log("Fetched Data Source: ", dataSource);
        }
    }, [dataSource]);

    useEffect(() => {
        refetchSource();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    return (
        <>
            <Row gutter={[12, 12]}>
                {/* <Col
                    xs={24}
                    sm={24}
                    md={6}
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginLeft: "1384px",
                    }}
                >
                    <Button
                        className="btn-main-primary btn-main-invert-outline b-r-none hides"
                        style={{
                            marginLeft: "10px",
                            backgroundColor: "#ff6624",
                            color: "white",
                            borderColor: "#ff6624",
                            width: "100px",
                            height: "60px",
                        }}
                        type="primary"
                        onClick={handleAddButtonClick}
                    >
                        <FontAwesomeIcon />
                        SignUp
                    </Button>
                    <Button
                        className="btn-main-primary btn-main-invert-outline b-r-none hides"
                        style={{
                            marginLeft: "10px",
                            backgroundColor: "#ff6624",
                            color: "white",
                            borderColor: "#ff6624",
                            width: "100px",
                            height: "60px",
                        }}
                        type="primary"
                    >
                        <FontAwesomeIcon />
                        SignIn
                    </Button>
                </Col> */}
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
