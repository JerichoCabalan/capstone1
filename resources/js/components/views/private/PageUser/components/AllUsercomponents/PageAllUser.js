import {
    Avatar,
    Drawer,
    List,
    Descriptions,
    Table,
    Switch,
    notification,
    Skeleton,
} from "antd";
import React, { useState } from "react";
import { GET, POST } from "../../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../../providers/notificationErrors";

export default function PageAllUser() {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false); // Track the loading state for the user

    const {
        data: dataSource,
        refetch,
        isLoading,
    } = GET(`api/users`, "username", (res) => {
        if (res.data) {
            console.log("dataSource", res);
        }
    });

    const showDrawer = (user) => {
        setLoadingUser(true);
        setSelectedUser(null);
        setOpen(true);
        // Simulate a delay for user data fetching
        setTimeout(() => {
            setSelectedUser(user);
            setLoadingUser(false);
        }, 1000); // Adjust the delay as needed
    };

    const onClose = () => {
        setOpen(false);
    };

    const { mutate: mutateAccountInactive } = POST(
        `api/users_status`,
        "username"
    );

    const handleActive = (record) => {
        const newStatus =
            record.users_status === "Active" ? "Inactive" : "Active";
        console.log("New Status:", newStatus);
        mutateAccountInactive(
            { id: record.id, users_status: newStatus },
            {
                onSuccess: (res) => {
                    console.log("res", res);
                    if (res.success) {
                        notification.success({
                            message: "User",
                            description: res.message,
                        });
                        if (selectedUser && selectedUser.id === record.id) {
                            setSelectedUser({
                                ...selectedUser,
                                users_status: newStatus,
                            });
                        }
                        refetch();
                    } else {
                        notification.error({
                            message: "User",
                            description: res.message,
                        });
                    }
                },
                onError: (err) => {
                    notificationErrors(err);
                },
            }
        );
    };

    return (
        <div>
            <h1>All User</h1>
            <Skeleton loading={isLoading} active>
                <List
                    dataSource={
                        dataSource && Array.isArray(dataSource.data)
                            ? dataSource.data
                            : []
                    }
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
                                    <a>{`${item.firstname} ${item.lastname}`}</a>
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
            </Skeleton>
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
            >
                {loadingUser ? (
                    <Skeleton active />
                ) : selectedUser ? (
                    <>
                        <Avatar
                            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                            style={{ width: "100px", height: "100px" }}
                        />
                        <Descriptions
                            column={1}
                            style={{
                                marginTop: "-73px",
                                marginLeft: "111px",
                                fontSize: "16px",
                            }}
                        >
                            <Descriptions.Item style={{ fontSize: "20px" }}>
                                {`${selectedUser.firstname} ${selectedUser.lastname}`}{" "}
                            </Descriptions.Item>
                            <Descriptions.Item style={{ fontSize: "20px" }}>
                                {selectedUser.email}
                            </Descriptions.Item>
                            <Descriptions.Item style={{ fontSize: "20px" }}>
                                <div
                                    style={{
                                        marginLeft: "150px",
                                        border: "1px solid",
                                        marginTop: "-88px",
                                        borderColor:
                                            selectedUser.users_status ===
                                            "Active"
                                                ? "green"
                                                : "red",
                                        borderRadius: "5px",
                                        padding: "5px",
                                        display: "inline-block",
                                        color:
                                            selectedUser.users_status ===
                                            "Active"
                                                ? "white"
                                                : "red",
                                        backgroundColor:
                                            selectedUser.users_status ===
                                            "Active"
                                                ? "green"
                                                : "transparent",
                                    }}
                                >
                                    {selectedUser.users_status}
                                </div>
                            </Descriptions.Item>
                        </Descriptions>
                        <Table
                            className="ant-table-default ant-table-striped"
                            pagination={false}
                            bordered={false}
                            dataSource={selectedUser ? [selectedUser] : []}
                            scroll={{ x: "max-content" }}
                            size="large"
                        >
                            <Table.Column
                                title="Action"
                                key="users_status"
                                dataIndex="users_status"
                                render={(text, record) => (
                                    <Switch
                                        checked={
                                            record.users_status === "Active"
                                        }
                                        onChange={() => handleActive(record)}
                                        checkedChildren="Active"
                                        unCheckedChildren="Inactive"
                                        style={{
                                            backgroundColor:
                                                record.users_status === "Active"
                                                    ? "#b7eb8f"
                                                    : "#ff4d4f",
                                        }}
                                    />
                                )}
                            />
                            <Table.Column
                                title="User Name"
                                key="username"
                                dataIndex="username"
                            />
                            <Table.Column
                                title="Email"
                                key="email"
                                dataIndex="email"
                            />
                            <Table.Column
                                title="Role"
                                key="role"
                                dataIndex="role"
                            />
                            <Table.Column
                                title="Full Name"
                                key="name"
                                render={(text, record) =>
                                    `${record.firstname} ${record.lastname}`
                                }
                            />
                            <Table.Column
                                title="Phone Number"
                                key="phone_number"
                                dataIndex="phone_number"
                            />
                            <Table.Column
                                title="Borrow Equipment"
                                key="borrow_stock_id"
                                dataIndex="borrow_stock_id"
                            />
                        </Table>
                    </>
                ) : (
                    <Skeleton active />
                )}
            </Drawer>
        </div>
    );
}
