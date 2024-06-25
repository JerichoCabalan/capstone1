import React, { useState, useEffect } from "react";
import { Table, Row, Col } from "antd";
import moment from "moment";

// Mock data
const dataSource = [
    {
        user_id: 103,
        unit_no: "123",
        category: "AVR",
        assign_comlab: "ComLab 1",
        borrow_status: "pending",
        borrow_date: "2024-05-12",
        role: "Staff",
        no_of_stock: 5,
        borrow_stocks: 101,
    },
    {
        user_id: 103,
        unit_no: "124",
        category: "Monitor",
        assign_comlab: "ComLab 2",
        borrow_status: "pending",
        borrow_date: "2024-05-15",
        role: "Staff",
        no_of_stock: 10,
        borrow_stocks: 2,
    },
    {
        user_id: 103,
        unit_no: "124",
        category: "Monitor",
        assign_comlab: "ComLab 2",
        borrow_status: "accept",
        borrow_date: "2024-05-15",
        role: "Staff",
        no_of_stock: 10,
        borrow_stocks: 2,
    },
];

export default function TableBorrowStaff() {
    // const { data: dataSource } = GET("api/borrow_stock", "borrow_status");

    const filteredData = dataSource ? dataSource : [];

    return (
        <Row gutter={[12, 12]} id="tbl_wrapper" style={{ marginTop: "90px" }}>
            <Col xs={24} sm={24} md={24}>
                <Table dataSource={filteredData} rowKey={(record) => record.id}>
                    <Table.Column
                        title="Unit No"
                        dataIndex="unit_no"
                        key="unit_no"
                        sorter={(a, b) => a.unit_no.localeCompare(b.unit_no)}
                    />
                    <Table.Column
                        title="Category"
                        dataIndex="category"
                        key="category"
                        sorter={(a, b) => a.category.localeCompare(b.category)}
                    />
                    <Table.Column
                        title="Assigned Comlab"
                        dataIndex="assign_comlab"
                        key="assign_comlab"
                        sorter={(a, b) =>
                            a.assign_comlab.localeCompare(b.assign_comlab)
                        }
                    />
                    <Table.Column
                        title="Borrow Status"
                        dataIndex="borrow_status"
                        key="borrow_status"
                        sorter={(a, b) =>
                            a.borrow_status.localeCompare(b.borrow_status)
                        }
                    />
                    <Table.Column
                        title="Borrow Date"
                        dataIndex="borrow_date"
                        key="borrow_date"
                        render={(borrow_date) =>
                            moment(borrow_date).format("YYYY-MM-DD")
                        }
                        sorter={(a, b) =>
                            new Date(a.borrow_date) - new Date(b.borrow_date)
                        }
                    />
                    <Table.Column
                        title="Role"
                        dataIndex="role"
                        key="role"
                        sorter={(a, b) => a.role.localeCompare(b.role)}
                    />
                    {/* <Table.Column
                        title="Quantity of Stock"
                        dataIndex="no_of_stock"
                        key="no_of_stock"
                        sorter={(a, b) => a.no_of_stock - b.no_of_stock}
                    /> */}
                </Table>
            </Col>
        </Row>
    );
}
