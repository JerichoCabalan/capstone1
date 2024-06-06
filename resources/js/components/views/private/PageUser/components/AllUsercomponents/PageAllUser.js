import {
    Avatar,
    Col,
    Drawer,
    List,
    Row,
    Descriptions,
    Divider,
    Tabs,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useState } from "react";
import TabsRecentActivities from "./TabsaAllcomponents/TabsRecentActivities";

export default function PageAllUser() {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const showDrawer = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h1>AllUser</h1>
            <List
                dataSource={[
                    {
                        id: 1,
                        name: "Lily",
                        email: "lily@example.com",
                        status: "inactive",
                    },
                    {
                        id: 2,
                        name: "John",
                        email: "john@example.com",
                        status: "active",
                    },
                    // Add more users as needed
                ]}
                bordered
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <a
                                onClick={() => showDrawer(item)}
                                key={`a-${item.id}`}
                            >
                                View Profile
                            </a>,
                        ]}
                        style={{
                            marginBottom: "10px",
                            border: "1px solid #e8e8e8",
                            borderRadius: "5px",
                            padding: "10px",
                        }}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                            }
                            title={
                                <a href="https://ant.design/index-cn">
                                    {item.name}
                                </a>
                            }
                            description={
                                <>
                                    <a href={`mailto:${item.email}`}>
                                        {item.email}
                                    </a>
                                    <br />
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
            >
                {selectedUser && (
                    <>
                        <Avatar
                            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                            style={{ width: "100px", height: "100px" }}
                        />
                        <Descriptions
                            column={0}
                            style={{
                                marginTop: "-73px",
                                marginLeft: "180px",
                                fontSize: "16px",
                            }}
                        >
                            <Descriptions.Item
                                label=""
                                style={{ fontSize: "20px" }} // Change the pixel value as needed
                            >
                                <div
                                    style={{
                                        border: "1px solid",
                                        borderColor:
                                            selectedUser.status === "active"
                                                ? "green"
                                                : "red",
                                        borderRadius: "5px",
                                        padding: "5px",
                                        display: "inline-block",
                                        color:
                                            selectedUser.status === "active"
                                                ? "white"
                                                : "red",
                                        backgroundColor:
                                            selectedUser.status === "active"
                                                ? "green"
                                                : "transparent",
                                    }}
                                >
                                    {selectedUser.status}
                                </div>
                            </Descriptions.Item>
                        </Descriptions>
                        <Descriptions
                            column={1}
                            style={{
                                marginTop: "-39px",
                                marginLeft: "112px",
                                fontSize: "16px",
                            }}
                        >
                            <Descriptions.Item
                                label=""
                                style={{ fontSize: "20px" }}
                            >
                                {selectedUser.name}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label=""
                                style={{ fontSize: "20px", color: "red" }}
                            >
                                {selectedUser.email}
                            </Descriptions.Item>
                        </Descriptions>
                    </>
                )}
                <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Tabs
                        className="page-nav-list"
                        defaultActiveKey={["1", "2", "3", "4"]}
                        type="card"
                        size="large"
                        items={[
                            {
                                key: "1",
                                label: "More Details",
                                children: <TabsRecentActivities />,
                            },
                            {
                                key: "2",
                                label: "Recent Activities",
                                // children: <PageUser />,
                            },
                        ]}
                    />
                </Col>
            </Drawer>
        </div>
    );
}
