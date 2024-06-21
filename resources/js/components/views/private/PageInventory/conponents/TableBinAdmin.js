import { Row, Col, Table, Card, Popconfirm, Button, Modal } from "antd";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../../providers/CustomTableFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencil,
    faTrash,
    faUserGear,
    faUserPlus,
} from "@fortawesome/pro-regular-svg-icons";
// import notificationErrors from "../../../providers/notificationErrors";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { faPlus, faTrashUndo } from "@fortawesome/pro-light-svg-icons";
import ModalInventory from "./ModalInventory";
// import dayjs from "dayjs";
// import { description } from "../../../providers/companyInfo";

export default function TableBinAdmin(props) {
    const { tableFilter, setTableFilter, sortInfo, dataSource } = props;
    const navigate = useNavigate();
    const onChangeTable = (sorter) => {
        setTableFilter((ps) => ({
            ...ps,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "50",
        }));
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
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
                style={{
                    marginTop: "90px",
                }}
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
                        className="ant-table-default ant-table-striped"
                        dataSource={dataSource && dataSource.data.data}
                        rowKey={(record) => record.id}
                        pagination={false}
                        bordered={false}
                        onChange={onChangeTable}
                        scroll={{ x: "max-content" }}
                        rowSelection={rowSelection}
                    >
                        <Table.Column
                            title="Unit No"
                            key="unit_no"
                            dataIndex={"unit_no"}
                            sorter
                        />

                        <Table.Column
                            title="Category"
                            key="category"
                            dataIndex={"category"}
                            sorter={true}
                        />

                        <Table.Column
                            title="Equipment Status"
                            key="borrow_status"
                            dataIndex={"borrow_status"}
                            sorter={true}
                        />
                        <Table.Column
                            title="Moved on"
                            key="role"
                            dataIndex={"role"}
                            sorter={true}
                        />
                        <Table.Column
                            title="Moved by"
                            key="role"
                            dataIndex={"role"}
                            sorter={true}
                        />
                        {/* <Table.Column title="Staff" key="" /> */}

                        {/* <Table.Column title="Status" key="" /> */}
                    </Table>
                </Col>
                <Col xs={24} sm={24} md={24}>
                    <div className="tbl-bottom-filter">
                        <TableShowingEntries />
                        <TablePagination
                            tableFilter={tableFilter}
                            setTableFilter={setTableFilter}
                            // setPaginationTotal={dataSource?.data.total}
                            showLessItems={true}
                            showSizeChanger={false}
                            tblIdWrapper="tbl_wrapper"
                        />
                    </div>
                </Col>
            </Row>
            {/* <ModalInventory
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            ></ModalInventory> */}
        </>
    );
}
