import React, { useState } from "react";
import { Col, Row, Table } from "antd";
import moment from "moment";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../../providers/CustomTableFilter";

export default function TableInventoryBorrowStaff(props) {
    const { tableFilter, setTableFilter, sortInfo, dataSource } = props;

    const onChangeTable = (pagination, filters, sorter) => {
        setTableFilter((prev) => ({
            ...prev,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: pagination.current,
            page_size: pagination.pageSize,
        }));
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <>
            <Row
                gutter={[12, 12]}
                id="tbl_wrapper"
                style={{ marginTop: "90px" }}
            >
                <Col xs={24} sm={24} md={24}>
                    <div className="tbl-top-filter">
                        <TablePageSize
                            tableFilter={tableFilter}
                            setTableFilter={setTableFilter}
                        />
                        <TableGlobalSearch
                            tableFilter={tableFilter}
                            setTableFilter={setTableFilter}
                        />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24}>
                    <Table
                        dataSource={dataSource && dataSource.data.data}
                        rowKey={(record) => record.id}
                        pagination={{
                            current: tableFilter.page,
                            pageSize: tableFilter.page_size,
                        }}
                        onChange={onChangeTable}
                        rowSelection={rowSelection}
                    >
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
                        <Table.Column
                            title="User ID"
                            dataIndex="user_id"
                            key="user_id"
                            sorter
                        />
                    </Table>
                </Col>
                <Col xs={24} sm={24} md={24}>
                    <div className="tbl-bottom-filter">
                        <TableShowingEntries />
                        <TablePagination
                            tableFilter={tableFilter}
                            setTableFilter={setTableFilter}
                            setPaginationTotal={dataSource?.data.total}
                            showLessItems
                            showSizeChanger={false}
                            tblIdWrapper="tbl_wrapper"
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
}
