import {
    faBusinessTime,
    faCogs,
    faTasks,
    faToolbox,
    faUsers,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Button } from "antd";

export default function PageDashboard() {
    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}>
                <h1>Dashboard</h1>
                <div
                    style={{
                        marginLeft: "20px",
                        marginTop: "50px",
                    }}
                >
                    <Row gutter={[12, 12]}>
                        <Col
                            xs={24}
                            sm={12}
                            md={8}
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
                                    backgroundColor: "aqua",
                                    borderRadius: "60px",
                                }}
                            >
                                <Row>
                                    <div
                                        style={{
                                            fontSize: "50px",
                                            color: "blue",
                                            marginLeft: "89px",
                                            marginTop: "-65px",
                                            // border: "1px solid #DAF7A6",
                                            // borderRadius: "50%",
                                            // backgroundColor: "#DAF7A6",
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faUsers} />
                                    </div>
                                    <Col span={11}>
                                        <p
                                            style={{
                                                fontSize: "50px",
                                                color: "green",
                                                marginLeft: "-2px",
                                            }}
                                        >
                                            12
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
                                                backgroundColor: "aqua",
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
                                            5
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
                                        style={{
                                            backgroundColor: "orange",
                                        }}
                                        type="primary"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </Card>
                        </Col>

                        <Col
                            xs={24}
                            sm={12}
                            md={8}
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
                                }}
                            >
                                <Row>
                                    <div
                                        style={{
                                            fontSize: "50px",
                                            color: "blue",
                                            marginLeft: "89px",
                                            marginTop: "-65px",
                                            // border: "1px solid #DAF7A6",
                                            // borderRadius: "50%",
                                            // backgroundColor: "#DAF7A6",
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faToolbox} />
                                    </div>

                                    <Col span={11}>
                                        <p
                                            style={{
                                                fontSize: "50px",
                                                color: "green",
                                                marginLeft: "-8px",
                                            }}
                                        >
                                            12
                                        </p>{" "}
                                        <p style={{ color: "green" }}>Accept</p>
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
                                                fontSize: "17px",
                                                backgroundColor: "#DAF7A6",
                                                color: "blue",
                                                width: "100px",
                                            }}
                                        >
                                            Equipement
                                        </p>
                                    </Col>

                                    <Col span={11}>
                                        <p
                                            style={{
                                                fontSize: "50px",
                                                color: "#ff3b00 ",
                                                marginLeft: "49px",
                                            }}
                                        >
                                            5
                                        </p>{" "}
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
                                        style={{
                                            backgroundColor: "orange",
                                        }}
                                        type="primary"
                                    >
                                        View Equipment
                                    </Button>
                                </div>
                            </Card>
                        </Col>

                        <Col
                            xs={24}
                            sm={12}
                            md={8}
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
                                    backgroundColor: "pink ",
                                    borderRadius: "60px",
                                }}
                            >
                                <Row>
                                    <div
                                        style={{
                                            fontSize: "50px",
                                            color: "blue",
                                            marginLeft: "89px",
                                            marginTop: "-65px",
                                            // border: "1px solid #DAF7A6",
                                            // borderRadius: "50%",
                                            // backgroundColor: "#DAF7A6",
                                        }}
                                    >
                                        <FontAwesomeIcon
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
                                            120
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
                                                backgroundColor: "pink  ",
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
                                                color: "#ff3b00 ",
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
                                    }}
                                >
                                    <Button
                                        style={{
                                            backgroundColor: "orange",
                                        }}
                                        type="primary"
                                    >
                                        View Stock Equipment
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}
