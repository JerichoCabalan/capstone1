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
            quantity_of_stock: "10",
        },
        {
            key: "2",
            unit_no: "2",
            description: "Keybord",
            assigned_comlab: "Assigned to Lab 1",
            status: "Available",
            quantity_of_stock: "10",
        },
        {
            key: "3",
            unit_no: "3",
            description: "Monitor",
            assigned_comlab: "Assigned to Lab 1",
            status: "Available",
            quantity_of_stock: "10",
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
    // const handleRestore = () => {
    //     const newDataSource = dataSource.map((item) =>
    //         selectedRowKeys.includes(item.key)
    //             ? { ...item, status: "Restored" }
    //             : item
    //     );
    //     setDataSource(newDataSource);
    //     setIsModalOpen(true);
    // };

    return (
        <>
            <Col xs={24} sm={24} md={24}>
                <Button
                    className="btn-main-primary btn-main-invert-outline b-r-none hides"
                    icon={<FontAwesomeIcon icon={faTrashUndo} />}
                    size="large"
                    name="btn_add"
                    open={isModalOpen}
                    // onClick={showModal}
                    // onClick={handleRestore}
                >
                    Restore Equipment{" "}
                </Button>

                <Button
                    className="btn-main-primary btn-main-invert-outline b-r-none hides"
                    style={{
                        marginLeft: "10px",
                    }}
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    size="large"
                    name="btn_add"
                >
                    Delete Equipment
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
                            title="Category"
                            key="description"
                            dataIndex={"category"}
                            sorter={true}
                        />

                        <Table.Column
                            title="Equipment Status"
                            key="email"
                            dataIndex={"status"}
                            sorter={true}
                        />
                        <Table.Column
                            title="Moved on"
                            key="email"
                            dataIndex={"assigned_comlab"}
                            sorter={true}
                        />
                        <Table.Column
                            title="Moved by"
                            key="email"
                            dataIndex={"assigned_comlab"}
                            sorter={true}
                        />
                        {/* <Table.Column title="Staff" key="" /> */}

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
            {/* <ModalInventory
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            ></ModalInventory> */}
        </>
    );
}
