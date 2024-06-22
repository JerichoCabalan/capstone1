import { Table, Row, Col } from "antd";
import React, { useState } from "react";
import { GET } from "../../../../providers/useAxiosQuery";
import moment from "moment";

export default function TableBorrowStaff() {
    const { data: dataSource } = GET(
        `api/borrow_stock
      `,
        "borrow_stock"
    );
    console.log("dataSource:", dataSource);

    const userId = "";

    console.log("user_id:", userId);
    const filteredData =
        dataSource && userId
            ? dataSource.data.filter((record) => record.user_id === userId)
            : dataSource
            ? dataSource.data
            : [];

    return (
        <Row gutter={[12, 12]} id="tbl_wrapper" style={{ marginTop: "90px" }}>
            <Col xs={24} sm={24} md={24}>
                <Table dataSource={filteredData} rowKey={(record) => record.id}>
                    <Table.Column
                        title="Unit No"
                        dataIndex="unit_no"
                        key="unit_no"
                        sorter
                    />
                    <Table.Column
                        title="Category"
                        dataIndex="category"
                        key="category"
                        sorter
                    />
                    <Table.Column
                        title="Assigned Comlab"
                        dataIndex="assign_comlab"
                        key="assign_comlab"
                        sorter
                    />
                    <Table.Column
                        title="Borrow Status"
                        dataIndex="borrow_status"
                        key="borrow_status"
                        sorter
                    />
                    <Table.Column
                        title="Borrow Date"
                        dataIndex="borrow_date"
                        render={(borrow_date) =>
                            moment(borrow_date).format("YYYY-MM-DD")
                        }
                        sorter
                    />
                    <Table.Column
                        title="Role"
                        dataIndex="role"
                        key="role"
                        sorter
                    />
                    <Table.Column
                        title="Quantity of Stock"
                        dataIndex="no_of_stock"
                        key="no_of_stock"
                        sorter
                    />
                </Table>
            </Col>
        </Row>
    );
}
