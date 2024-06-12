import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserXmark } from "@fortawesome/pro-light-svg-icons";
import notificationErrors from "../../../../providers/notificationErrors";

import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../../providers/CustomTableFilter";
import { POST } from "../../../../providers/useAxiosQuery";

export default function TableBorrowStockAdmin(props) {
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
    useEffect(() => {
        if (dataSource) {
            console.log("Data Source in Table: ", dataSource);
        }
    }, [dataSource]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const { mutate: mutateAccept } = POST(
        "api/borrow_stock_status",
        "borrow_stock"
    );

    const handleAccept = (record) => {
        mutateAccept(record, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "Borrow",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Borrow",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    return (
        <>
            <Col xs={24} sm={24} md={24}>
                <Button
                    className="btn-main-primary btn-main-invert-outline b-r-none hides"
                    icon={<FontAwesomeIcon icon={faUserCheck} />}
                    size="large"
                    onClick={() =>
                        handleAccept(
                            dataSource.data.data.find(
                                (item) => item.id === selectedRowKeys[0]
                            )
                        )
                    }
                >
                    Accept
                </Button>
                <Button
                    className="btn-main-primary btn-main-invert-outline b-r-none hides"
                    style={{ marginLeft: "10px" }}
                    icon={<FontAwesomeIcon icon={faUserXmark} />}
                    size="large"
                >
                    Decline
                </Button>
            </Col>
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
                            title="Description"
                            dataIndex="description"
                            key="description"
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
                            key="borrow_date"
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
                <Col xs={24} sm={24} md={24}>
                    <div className="tbl-bottom-filter">
                        <TableShowingEntries />
                        <TablePagination
                            tableFilter={tableFilter}
                            setTableFilter={setTableFilter}
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
