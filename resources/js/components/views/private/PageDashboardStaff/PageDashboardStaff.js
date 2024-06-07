import {
    faBusinessTime,
    faCogs,
    faKeyboard,
    faMouse,
    faTasks,
    faToolbox,
    faUsers,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function PageDashBoardStaff() {
    const navigate = useNavigate();

    return (
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            {/* <h1>Borrow Equipment</h1>
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
                            <Row>
                                <div
                                    style={{
                                        fontSize: "50px",
                                        color: "blue",
                                        marginLeft: "80px",
                                        marginTop: "-76px",
                                        border: "9px solid #a5aeff",
                                        borderRadius: "50%",
                                        // backgroundColor: "#ffcece",
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
                                        icon={faKeyboard}
                                    />
                                </div>
                                <Col span={11}>
                                    <p>Power Supply</p>
                                    <p>example data</p>
                                    <p>example data</p>
                                    <p>example data</p>
                                    <p>example data</p>
                                    <p>example data</p>
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
                                >
                                    Borrow this Equipment
                                </Button>
                            </div>
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
                                backgroundColor: "#a5aeff",
                                borderRadius: "60px",
                                boxShadow:
                                    "rgb(165, 174, 255) 0px 25px 20px -20px",
                            }}
                        >
                            <Row>
                                <div
                                    style={{
                                        fontSize: "50px",
                                        color: "blue",
                                        marginLeft: "80px",
                                        marginTop: "-76px",
                                        border: "9px solid #a5aeff",
                                        borderRadius: "50%",
                                        // backgroundColor: "#ffcece",
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
                                        icon={faMouse}
                                    />
                                </div>
                                <Col span={11}>
                                    <p>Keyboard</p>
                                    <p>example data</p>
                                    <p>example data</p>
                                    <p>example data</p>
                                    <p>example data</p>
                                    <p>example data</p>
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
                                >
                                    Borrow this Equipment
                                </Button>
                            </div>
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
                                backgroundColor: "#a5aeff",
                                borderRadius: "60px",
                                boxShadow:
                                    "rgb(165, 174, 255) 0px 25px 20px -20px",
                            }}
                        >
                            <Row>
                                <div
                                    style={{
                                        fontSize: "50px",
                                        color: "blue",
                                        marginLeft: "80px",
                                        marginTop: "-76px",
                                        border: "9px solid #a5aeff",
                                        borderRadius: "50%",
                                        // backgroundColor: "#ffcece",
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
                                        icon={faMouse}
                                    />
                                </div>
                                <Col span={11}>
                                    <p>Keyboard</p>
                                    <p>example data</p>
                                    <p>example data</p>
                                    <p>example data</p>
                                    <p>example data</p>
                                    <p>example data</p>
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
                                >
                                    Borrow this Equipment
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div> */}
        </Col>
    );
}
