import {
    faBusinessTime,
    faToolbox,
    faUsers,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Button, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { GET } from "../../../providers/useAxiosQuery";

export default function PageDashboard() {
    const navigate = useNavigate();

    const { data: dataBorrowStatus, error: errorBorrow } = GET(
        `api/borrow_stock`,
        "borrow_stock"
    );
    const { data: dataStock, error: errorStock } = GET(
        `api/inventory_admin`,
        "inventory_admin"
    );
    const { data: dataUsersStatus, error: errorUsers } = GET(
        `api/users`,
        "username"
    );

    let activestatus = 0;
    let inactivestatus = 0;

    if (
        dataUsersStatus &&
        dataUsersStatus.data &&
        dataUsersStatus.data.length > 0
    ) {
        dataUsersStatus.data.forEach((item) => {
            if (item.users_status === "Active") {
                activestatus++;
            } else if (item.users_status === "Inactive") {
                inactivestatus++;
            }
        });
    }

    let acceptedStatus = 0;
    let pendingStatus = 0;
    if (
        dataBorrowStatus &&
        dataBorrowStatus.data &&
        dataBorrowStatus.data.length > 0
    ) {
        dataBorrowStatus.data.forEach((item) => {
            if (item.borrow_status === "accept") {
                acceptedStatus++;
            } else if (item.borrow_status === "pending") {
                pendingStatus++;
            }
        });
    }

    let totalStock = 0;
    if (dataStock && dataStock.data && dataStock.data.length > 0) {
        dataStock.data.forEach((item) => {
            totalStock += Number(item.no_of_stock);
        });
    }

    return (
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <h1>Dashboard</h1>
            <div
                style={{
                    marginLeft: "20px",
                    marginTop: "50px",
                }}
            >
                <Row gutter={[20, 20]}>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={8}
                        xl={8}
                        xxl={8}
                        style={{
                            marginTop: "15px",
                        }}
                    >
                        <Card
                            style={{
                                width: 300,
                                backgroundColor: "#a5aeff",
                                borderRadius: "60px",
                                boxShadow:
                                    "rgb(165, 174, 255) 0px 25px 20px -20px",
                            }}
                        >
                            <Skeleton loading={!dataUsersStatus} active>
                                <Row>
                                    <div
                                        style={{
                                            fontSize: "50px",
                                            color: "blue",
                                            marginLeft: "80px",
                                            marginTop: "-76px",
                                            border: "9px solid #a5aeff",
                                            borderRadius: "50%",
                                            width: "70px",
                                            height: "70px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            style={{
                                                fontSize: "35px",
                                            }}
                                            icon={faUsers}
                                        />
                                    </div>
                                    <Col span={11}>
                                        <p
                                            style={{
                                                fontSize: "50px",
                                                color: "green",
                                                marginLeft: "-2px",
                                            }}
                                        >
                                            {activestatus}
                                        </p>
                                        <p
                                            style={{
                                                color: "green",
                                                marginLeft: "12px",
                                            }}
                                        >
                                            Active
                                        </p>
                                    </Col>
                                    <Col span={2}>
                                        <div
                                            style={{
                                                borderLeft: "1px solid black",
                                                height: "100%",
                                            }}
                                        />

                                        <p
                                            style={{
                                                marginLeft: "-22px",
                                                marginTop: "-75px",
                                                fontSize: "17px",
                                                backgroundColor: "#a5aeff",
                                                color: "blue",
                                            }}
                                        >
                                            Status
                                        </p>
                                    </Col>

                                    <Col span={11}>
                                        <p
                                            style={{
                                                fontSize: "50px",
                                                color: "red",
                                                marginLeft: "37px",
                                            }}
                                        >
                                            {inactivestatus}
                                        </p>
                                        <p
                                            style={{
                                                color: "red",
                                                marginLeft: "37px",
                                            }}
                                        >
                                            Inactive
                                        </p>
                                    </Col>
                                </Row>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "20px",
                                        marginLeft: "-25px",
                                    }}
                                >
                                    <Button
                                        className="btn-main-primary btn-main-invert-outline b-r-none hides"
                                        style={{
                                            marginLeft: "10px",
                                            backgroundColor: "ff6624",
                                            color: "white",
                                            borderColor: "ff6624",
                                        }}
                                        onClick={() => navigate("/users/users")}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </Skeleton>
                        </Card>
                    </Col>

                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={8}
                        xl={8}
                        xxl={8}
                        style={{
                            marginTop: "15px",
                        }}
                    >
                        <Card
                            style={{
                                width: 300,
                                backgroundColor: "#DAF7A6",
                                borderRadius: "60px",
                                boxShadow:
                                    "rgb(218, 247, 166) 0px 25px 20px -20px",
                            }}
                        >
                            <Skeleton loading={!dataBorrowStatus} active>
                                <Row>
                                    <div
                                        style={{
                                            fontSize: "50px",
                                            color: "blue",
                                            marginLeft: "80px",
                                            marginTop: "-76px",
                                            border: "9px solid #DAF7A6",
                                            borderRadius: "50%",
                                            width: "70px",
                                            height: "70px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            style={{
                                                fontSize: "35px",
                                            }}
                                            icon={faToolbox}
                                        />
                                    </div>

                                    <Col span={11}>
                                        <p
                                            style={{
                                                fontSize: "50px",
                                                color: "green",
                                                marginLeft: "18px",
                                            }}
                                        >
                                            {acceptedStatus}
                                        </p>
                                        <p style={{ color: "green" }}>
                                            Accepted
                                        </p>
                                    </Col>
                                    <Col span={2}>
                                        <div
                                            style={{
                                                borderLeft: "1px solid black",
                                                height: "100%",
                                            }}
                                        />
                                        <p
                                            style={{
                                                marginLeft: "-43px",
                                                marginTop: "-75px",
                                                fontSize: "15px",
                                                backgroundColor: "#DAF7A6",
                                                color: "blue",
                                                width: "110px",
                                            }}
                                        >
                                            Borrow Status
                                        </p>
                                    </Col>

                                    <Col span={11}>
                                        <p
                                            style={{
                                                fontSize: "50px",
                                                color: "#ff3b00",
                                                marginLeft: "49px",
                                            }}
                                        >
                                            {pendingStatus}
                                        </p>
                                        <p
                                            style={{
                                                color: "red",
                                                marginLeft: "40px",
                                            }}
                                        >
                                            Pending
                                        </p>
                                    </Col>
                                </Row>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "20px",
                                        marginLeft: "-25px",
                                    }}
                                >
                                    <Button
                                        className="btn-main-primary btn-main-invert-outline b-r-none hides"
                                        style={{
                                            marginLeft: "10px",
                                            backgroundColor: "ff6624",
                                            color: "white",
                                            borderColor: "ff6624",
                                        }}
                                        type="primary"
                                        onClick={() =>
                                            navigate("/inventory/borrowedstock")
                                        }
                                    >
                                        View Borrow Status
                                    </Button>
                                </div>
                            </Skeleton>
                        </Card>
                    </Col>

                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={8}
                        xl={8}
                        xxl={8}
                        style={{
                            marginTop: "15px",
                        }}
                    >
                        <Card
                            style={{
                                width: 300,
                                backgroundColor: "#ffcece",
                                borderRadius: "60px",
                                boxShadow:
                                    "rgb(255, 206, 206) 0px 25px 20px -20px",
                            }}
                        >
                            <Skeleton loading={!dataStock} active>
                                <Row gutter={[0, 0]}>
                                    <div
                                        style={{
                                            fontSize: "50px",
                                            color: "blue",
                                            marginLeft: "80px",
                                            marginTop: "-76px",
                                            border: "9px solid #ffcece",
                                            borderRadius: "50%",
                                            width: "70px",
                                            height: "70px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            style={{
                                                fontSize: "35px",
                                            }}
                                            icon={faBusinessTime}
                                        />
                                    </div>
                                    <Col span={11}>
                                        <p
                                            style={{
                                                fontSize: "50px",
                                                color: "green",
                                            }}
                                        >
                                            {totalStock}
                                        </p>{" "}
                                        <p style={{ color: "green" }}>
                                            Available Stock
                                        </p>
                                    </Col>

                                    <Col span={2}>
                                        <div
                                            style={{
                                                borderLeft: "1px solid black",
                                                height: "100%",
                                            }}
                                        />

                                        <p
                                            style={{
                                                marginLeft: "-21px",
                                                marginTop: "-75px",
                                                fontSize: "17px",
                                                backgroundColor: "#ffcece",
                                                color: "blue",
                                                width: "47px",
                                            }}
                                        >
                                            Stock
                                        </p>
                                    </Col>
                                    <Col span={11}>
                                        <p
                                            style={{
                                                fontSize: "50px",
                                                color: "#ff3b00",
                                                marginLeft: "50px",
                                            }}
                                        >
                                            5
                                        </p>{" "}
                                        <p
                                            style={{
                                                color: "#ff3b00",
                                                marginLeft: "31px",
                                                width: "100px",
                                            }}
                                        >
                                            Out Of Stock
                                        </p>
                                    </Col>
                                </Row>
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
                                            backgroundColor: "ff6624",
                                            color: "white",
                                            borderColor: "ff6624",
                                        }}
                                        type="primary"
                                        onClick={() =>
                                            navigate("/inventory/creticalstock")
                                        }
                                    >
                                        View Stock
                                    </Button>
                                </div>
                            </Skeleton>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}
