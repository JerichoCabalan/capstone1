import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, notification, Modal, Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/pro-regular-svg-icons";
import dayjs from "dayjs";
import { POST } from "../../../providers/useAxiosQuery";
import notificationErrors from "../../../providers/notificationErrors";
import { useNavigate } from "react-router-dom";

export default function TableInventory(props) {
    const { tableFilter, setTableFilter, dataSource } = props;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const loggedIn =
                localStorage.getItem && localStorage.getItem("token");
            setIsLoggedIn(loggedIn);
        };
        checkLoginStatus();
    }, []);

    const onChangeTable = (sorter) => {
        setTableFilter((ps) => ({
            ...ps,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "50",
        }));
    };

    const exampleDataSource = [
        {
            id: 1,
            unit_no: "U123",
            description: "Laptop",
            assign_comlab: "Lab A",
            equipment_status: "Working",
            no_of_stock: 5,
            category: "Electronics",
        },
        {
            id: 2,
            unit_no: "U124",
            description: "Monitor",
            assign_comlab: "Lab B",
            equipment_status: "Working",
            no_of_stock: 2,
            category: "Electronics",
        },
        {
            id: 3,
            unit_no: "U125",
            description: "Projector",
            assign_comlab: "Lab C",
            equipment_status: "Working",
            no_of_stock: 0,
            category: "Electronics",
        },
    ];

    const modifiedDataSource = exampleDataSource.map((item) => ({
        ...item,
        equipment_status: "Working",
    }));

    const { mutate: mutateBorrowEquipment } = POST(
        `api/borrow_equipment_stock`,
        "borrow_stock"
    );

    const handleBorrowEquipment = (record) => {
        setLoading(true);

        const requestBody = {
            inventory_admin_id: record.id,
            user_id: record.id,
            quantity: 1,
        };

        mutateBorrowEquipment(requestBody, {
            onSuccess: (res) => {
                setLoading(false);
                if (res.success) {
                    notification.success({
                        message: "Equipment borrowed successfully",
                        description: res.message,
                    });

                    const updatedDataSource = exampleDataSource.map((item) => {
                        if (item.id === record.id) {
                            return {
                                ...item,
                                no_of_stock: item.no_of_stock - 1,
                            };
                        }
                        return item;
                    });

                    setTableFilter((prevFilter) => ({
                        ...prevFilter,
                        page: 1,
                    }));
                } else {
                    notification.error({
                        message: "Failed to borrow equipment",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                setLoading(false);
                notificationErrors(err);
            },
        });
    };

    const showBorrowModal = (record) => {
        if (!isLoggedIn) {
            notification.error({
                message: "Login required",
                description: "You need to be logged in to borrow equipment.",
            });
            navigate("/login"); // Redirect to login page
            return;
        }

        if (record.no_of_stock === 0) {
            notification.error({
                message: "Failed to borrow equipment",
                description: "No stock available for this equipment.",
            });
            return;
        }

        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        handleBorrowEquipment(selectedRecord);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRecord(null);
    };

    return (
        <Row gutter={[12, 12]} id="tbl_wrapper" style={{ marginTop: "-24px" }}>
            <Col xs={24} sm={24} md={24}>
                <Table
                    className="ant-table-default ant-table-striped"
                    dataSource={modifiedDataSource}
                    rowKey={(record) => record.id}
                    pagination={false}
                    bordered={false}
                    onChange={onChangeTable}
                    scroll={{ x: "max-content" }}
                >
                    <Table.Column
                        title="Unit No"
                        key="unit_no"
                        dataIndex="unit_no"
                        sorter
                    />
                    <Table.Column
                        title="Description"
                        key="description"
                        dataIndex="description"
                        sorter={true}
                    />
                    <Table.Column
                        title="Assigned Comlab"
                        key="assign_comlab"
                        dataIndex="assign_comlab"
                        sorter={true}
                    />
                    <Table.Column
                        title="Status"
                        key="equipment_status"
                        dataIndex="equipment_status"
                        sorter={true}
                    />
                    <Table.Column
                        title="Quantity of Stock"
                        key="no_of_stock"
                        sorter
                        dataIndex="no_of_stock"
                    />
                    <Table.Column
                        title="Action"
                        render={(text, record) => (
                            <Button
                                type="primary"
                                size="medium"
                                title="Borrow"
                                onClick={() => showBorrowModal(record)}
                            >
                                <FontAwesomeIcon
                                    style={{ marginRight: "5px" }}
                                    icon={faUserPen}
                                />
                                Borrow
                            </Button>
                        )}
                    />
                </Table>
            </Col>
            <Modal
                title="Confirm Borrow"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
            >
                {selectedRecord && (
                    <div>
                        <p>
                            <strong>Date:</strong>{" "}
                            {dayjs().format("YYYY-MM-DD")}
                        </p>
                        <p>
                            <strong>Borrow By:</strong> Test User{" "}
                            {/* Add Borrower Info Here */}
                        </p>
                        <p>
                            <strong>Equipment to Borrow:</strong>{" "}
                            {selectedRecord.description}
                        </p>
                        <p>
                            <strong>Purpose:</strong> For a project{" "}
                            {/* Add Purpose Info */}
                        </p>
                    </div>
                )}
                {loading && <Spin />}
            </Modal>
        </Row>
    );
}
