import { Table, Row, Col } from "antd";
import React from "react";
import { GET } from "../../../../providers/useAxiosQuery";
import moment from "moment";

export default function TableBorrowStaff() {
    const { data: dataSource, userId } = GET(
        `api/borrow_stock`,
        "borrow_stock"
    );
    console.log("dataSource:", dataSource);
    console.log("user_id:", userId);

    const filteredData =
        dataSource && userId
            ? dataSource.data.filter(
                  (record) => record.borrow_stocks === userId
              )
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
                    <Table.Column
                        title="Quantity of Stock"
                        dataIndex="no_of_stock"
                        key="no_of_stock"
                        sorter={(a, b) => a.no_of_stock - b.no_of_stock}
                    />
                </Table>
            </Col>
        </Row>
    );
}
