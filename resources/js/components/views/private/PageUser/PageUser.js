import { Card, Col, Divider, Progress, Table } from "antd";
import React from "react";

export default function PageUser() {
    const dataSource = [
        {
            key: "1",
            fullname: "John Doe",
            account_code: "AC123",
            description: "Assigned to Lab 1",
        },
        {
            key: "2",
            fullname: "Jane Smith",
            account_code: "AC456",
            description: "Assigned to Lab 2",
        },
        // Add more objects for more rows
    ];

    return (
        <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Table
                className="ant-table-default ant-table-striped"
                pagination={false}
                bordered={false}
                scroll={{ x: "max-content" }}
                size="large"
                dataSource={dataSource}
            >
                <Table.Column
                    title="Description"
                    key="fullname"
                    dataIndex={"fullname"}
                />
                <Table.Column
                    title="Custodian"
                    key="account_code"
                    dataIndex={"account_code"}
                />
                <Table.Column
                    title="Assigned Comlab"
                    key="description"
                    dataIndex={"description"}
                />
            </Table>
            <Col sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Card title="User Information">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ flex: 1 }}>
                            <p>Some content above the divider</p>
                            <p>Some content above the divider</p>
                            <p>Some content above the divider</p>
                        </div>
                        <Divider
                            type="vertical"
                            style={{ borderColor: "gray", height: "140px" }}
                        />
                        <Progress
                            type="circle"
                            size="large"
                            percent={30}
                            style={{
                                marginLeft: "273px",
                            }}
                        />
                    </div>
                </Card>
            </Col>
        </Col>
    );
}
