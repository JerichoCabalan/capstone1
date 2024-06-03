import { Row, Col, Card, Button } from "antd";

export default function PageDashboard() {
    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}>
                <Row gutter={[12, 12]}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
                        <Card title="User" style={{ width: 300 }}>
                            <Row>
                                <Col span={11}>
                                    <p
                                        style={{
                                            fontSize: "50px",
                                            color: "green",
                                        }}
                                    >
                                        12
                                    </p>
                                    <p style={{ color: "green" }}>Active</p>
                                </Col>
                                <Col span={2}>
                                    <div
                                        style={{
                                            borderLeft: "1px solid black",
                                            height: "100%",
                                        }}
                                    />
                                </Col>
                                <Col span={11}>
                                    <p
                                        style={{
                                            fontSize: "50px",
                                            color: "red",
                                        }}
                                    >
                                        5
                                    </p>
                                    <p style={{ color: "red" }}>Inactive</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
                        <Card title="Number of borrow" style={{ width: 300 }}>
                            <Row>
                                <Col span={11}>
                                    <p
                                        style={{
                                            fontSize: "50px",
                                            color: "blue",
                                        }}
                                    >
                                        12
                                    </p>{" "}
                                    <p style={{ color: "blue" }}>Accept</p>
                                </Col>
                                <Col span={2}>
                                    <div
                                        style={{
                                            borderLeft: "1px solid black",
                                            height: "100%",
                                        }}
                                    />
                                </Col>
                                <Col span={11}>
                                    <p
                                        style={{
                                            fontSize: "50px",
                                            color: "#ff3b00 ",
                                        }}
                                    >
                                        5
                                    </p>{" "}
                                    <p style={{ color: "#ff3b00" }}>Pending</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
                        <Card title="Stock" style={{ width: 300 }}>
                            <Row>
                                <Col span={11}>
                                    <p
                                        style={{
                                            fontSize: "50px",
                                            color: "blue",
                                        }}
                                    >
                                        120
                                    </p>{" "}
                                    <p style={{ color: "blue" }}>
                                        Available Stock
                                    </p>
                                    <ul style={{ color: "blue" }}>
                                        {[
                                            "keyboard",
                                            "monitor",
                                            "power supply",
                                        ].map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </Col>
                                <Col span={2}>
                                    <div
                                        style={{
                                            borderLeft: "1px solid black",
                                            height: "100%",
                                        }}
                                    />
                                </Col>
                                <Col span={11}>
                                    <p
                                        style={{
                                            fontSize: "50px",
                                            color: "#ff3b00 ",
                                        }}
                                    >
                                        5
                                    </p>{" "}
                                    <p style={{ color: "#ff3b00" }}>
                                        Out Of Stock
                                    </p>
                                    <ul style={{ color: "#ff3b00" }}>
                                        {["mouse", "headset", "projector"].map(
                                            (item, index) => (
                                                <li key={index}>{item}</li>
                                            )
                                        )}
                                    </ul>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
