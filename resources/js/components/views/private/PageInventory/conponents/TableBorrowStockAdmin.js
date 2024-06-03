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
import {
    faCheck,
    faPlus,
    faUserCheck,
    faUserXmark,
} from "@fortawesome/pro-light-svg-icons";
import ModalInventory from "./ModalInventory";
// import dayjs from "dayjs";
// import { description } from "../../../providers/companyInfo";

export default function TableBorrowStockAdmin(props) {
    const { tableFilter, setTableFilter, sortInfo } = props;
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

    const dataSource = [
        {
            key: "1",
            unit_no: "1",
            description: "Monitor",
            assigned_comlab: "Assigned to Lab 1",
            status: "Available",
            borrow_status: "Borrowed",
            role: "Lab Staff",
            quantity_of_stock: "10",
            borrow_date: "2024-06-04",
        },
        {
            key: "2",
            unit_no: "2",
            description: "Keybord",
            assigned_comlab: "Assigned to Lab 1",
            status: "Available",
            borrow_status: "Borrowed",
            role: "ComLab Adviser",
            quantity_of_stock: "10",
            borrow_date: "2024-06-04",
        },
        {
            key: "3",
            unit_no: "3",
            description: "Monitor",
            assigned_comlab: "Assigned to Lab 1",
            borrow_status: "Available",
            role: "ComLab Adviser",
            quantity_of_stock: "10",
            borrow_date: "2024-06-04",
        },
    ];
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <Col xs={24} sm={24} md={24}>
                <Button
                    className=" btn-main-primary btn-main-invert-outline b-r-none hides"
                    icon={<FontAwesomeIcon icon={faUserCheck} />}
                    size="large"
                    name="btn_add"
                    open={isModalOpen}
                    onClick={showModal}
                >
                    Accept{" "}
                </Button>

                <Button
                    className=" btn-main-primary btn-main-invert-outline b-r-none hides"
                    style={{
                        marginLeft: "10px",
                    }}
                    icon={<FontAwesomeIcon icon={faUserXmark} />}
                    size="large"
                    name="btn_add"
                >
                    Decline{" "}
                </Button>
            </Col>
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
                        // className="ant-table-default ant-table-striped"
                        // dataSource={dataSource && dataSource.data.data}
                        // rowKey={(record) => record.id}
                        pagination={false}
                        bordered={false}
                        onChange={onChangeTable}
                        scroll={{ x: "max-content" }}
                        dataSource={dataSource}
                        rowSelection={rowSelection}
                    >
                        <Table.Column
                            title="Unit No"
                            key="unit no"
                            dataIndex={"unit_no"}
                            sorter
                        />
                        <Table.Column
                            title="Description"
                            key="description"
                            dataIndex={"description"}
                            sorter={true}
                        />

                        <Table.Column
                            title="Assigned Comlab"
                            key="email"
                            dataIndex={"assigned_comlab"}
                            sorter={true}
                        />
                        <Table.Column
                            title="Borrow Status"
                            key="staff_id"
                            dataIndex={"borrow_status"}
                            sorter={true}
                        />
                        <Table.Column
                            title="Borrow Date"
                            key="staff_id"
                            dataIndex={"borrow_date"}
                            sorter={true}
                        />
                        <Table.Column
                            title="Role"
                            key="staff_id"
                            dataIndex={"role"}
                            sorter={true}
                        />
                        <Table.Column
                            title="Quantity of Stock"
                            key="fullname"
                            sorter
                            dataIndex={"quantity_of_stock"}
                        />
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
            <ModalInventory
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            ></ModalInventory>
        </>
    );
}
