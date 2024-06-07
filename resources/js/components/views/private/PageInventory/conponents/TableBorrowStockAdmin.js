import {
    Row,
    Col,
    Table,
    Card,
    Popconfirm,
    Button,
    Modal,
    notification,
} from "antd";
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
import { POST } from "../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../providers/notificationErrors";
// import dayjs from "dayjs";
// import { description } from "../../../providers/companyInfo";

export default function TableBorrowStockAdmin(props) {
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

    const { mutate: mutateAccpet } = POST(
        `api/borrow_stock_status`,
        "borrow_stock"
    );
    const handleAccept = (record) => {
        console.log("Accepting record:", record);
        mutateAccpet(record, {
            onSuccess: (res) => {
                console.log("Accept success response:", res);
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
                console.error("Accept error:", err);
                notificationErrors(err);
            },
        });
    };

    return (
        <>
            <Col xs={24} sm={24} md={24}>
                <Button
                    className=" btn-main-primary btn-main-invert-outline b-r-none hides"
                    icon={<FontAwesomeIcon icon={faUserCheck} />}
                    size="large"
                    name="btn_add"
                    onClick={() =>
                        handleAccept(
                            dataSource.data.data.find(
                                (item) => item.id === selectedRowKeys[0]
                            )
                        )
                    }
                >
                    Accept{" "}
                </Button>

                <Button
                    className="btn-main-primary btn-main-invert-outline b-r-none hides"
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
                        dataSource={dataSource && dataSource.data.data}
                        rowKey={(record) => record.id}
                        pagination={false}
                        bordered={false}
                        onChange={onChangeTable}
                        scroll={{ x: "max-content" }}
                        // dataSource={dataSource}
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
            {/* <ModalInventory
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            ></ModalInventory> */}
        </>
    );
}
