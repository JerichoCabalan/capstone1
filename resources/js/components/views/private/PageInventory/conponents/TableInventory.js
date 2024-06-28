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
    faChartBar,
    faPencil,
    faTrash,
    faPlus,
    faFileExcel,
    faUserGear,
    faUserPlus,
    faWrench,
} from "@fortawesome/pro-regular-svg-icons";
// import notificationErrors from "../../../providers/notificationErrors";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalInventory from "./ModalInventory";
import { useForm } from "antd/es/form/Form";
import { POST } from "../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../providers/notificationErrors";
import ModalImportExcel from "./ModalImportExcel";

export default function TableInventory(props) {
    const { tableFilter, setTableFilter, sortInfo, dataSource } = props;
    const navigate = useNavigate();
    const [form] = useForm();
    const onChangeTable = (sorter) => {
        setTableFilter((ps) => ({
            ...ps,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "50",
        }));
    };
    const [toggleModalInventory, setToggleModalInventory] = useState({
        open: false,
        data: null,

        payroll_id: null,
    });

    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const toggleImportModal = () => {
        setIsImportModalOpen(!isImportModalOpen);
    };

    const filteredDataSource =
        dataSource &&
        dataSource.data &&
        dataSource.data.data &&
        dataSource.data.data.filter(
            (record) =>
                record.equipment_status !== "To Repair" &&
                record.equipment_status !== "Disposed"
        );

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
    const { mutate: mutateDeleteEquipment } = POST(
        `api/equipement_delete`,
        "inventory_admin"
    );
    const handleDeleteEquipment = (record) => {
        mutateDeleteEquipment(record, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "Inventory deleted successfully",
                        description: res.message,
                    });
                    refreshData();
                    window.location.reload();
                } else {
                    notification.error({
                        message: "Inventory deleted successfully",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    const refreshData = () => {
        // Add logic to fetch data again
        // Example: Call your API endpoint to fetch the latest data
        props.refetchData();
    };
    return (
        <>
            <Col xs={24} sm={24} md={24}>
                <Button
                    className="btn-main-primary btn-main-invert-outline b-r-none hides"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    size="large"
                    name="btn_add"
                    open={toggleModalInventory.open}
                    onClick={() =>
                        setToggleModalInventory((ps) => ({
                            ...ps,
                            open: true,
                        }))
                    }
                >
                    New Equipment{" "}
                </Button>

                <Button
                    className="btn-main-primary btn-main-invert-outline b-r-none hides"
                    style={{
                        marginLeft: "10px",
                        backgroundColor: "#ff6624",
                        color: "white",
                        borderColor: "#ff6624",
                    }}
                    icon={<FontAwesomeIcon icon={faFileExcel} color="#fff" />}
                    size="large"
                    name="btn_add"
                    onClick={toggleImportModal}
                >
                    Import Equipment{" "}
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
                        className="ant-table-default ant-table-striped"
                        dataSource={filteredDataSource}
                        rowKey={(record) => record.id}
                        pagination={false}
                        bordered={false}
                        onChange={onChangeTable}
                        scroll={{ x: "max-content" }}
                        // dataSource={dataSource}
                        // rowSelection={rowSelection}
                    >
                        <Table.Column
                            title={
                                <div
                                    style={{
                                        paddingLeft: "17px",
                                        fontSize: "15px",
                                    }}
                                >
                                    Action
                                </div>
                            }
                            key="edit"
                            render={(text, record) => {
                                return (
                                    <>
                                        <Button
                                            // className="btn-main-primary"
                                            type="link"
                                            size="medium"
                                            title="Edit"
                                            onClick={() => {
                                                setToggleModalInventory({
                                                    open: true,
                                                    data: record,
                                                    category: "Regular Hours",
                                                });
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faWrench} />
                                        </Button>
                                        <Popconfirm
                                            title="Are you sure to delete this data?"
                                            onConfirm={() => {
                                                handleDeleteEquipment(record);
                                            }}
                                            onCancel={() => {
                                                notification.error({
                                                    message: "Equipment",
                                                    description:
                                                        "Equipment Data not  delete",
                                                });
                                            }}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button
                                                type="link"
                                                className="text-danger"
                                                title="Delete"
                                                name="btn_delete"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </Button>
                                        </Popconfirm>
                                    </>
                                );
                            }}
                        />
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
                            key="category"
                            dataIndex={"category"}
                            sorter={true}
                        />

                        <Table.Column
                            title="Equipment Status"
                            key="equipment_status"
                            dataIndex={"equipment_status"}
                            sorter={true}
                        />
                        <Table.Column
                            title="No of Stock"
                            key="no_of_stock"
                            sorter
                            dataIndex={"no_of_stock"}
                        />

                        <Table.Column
                            title="Assigned Comlab"
                            key="assign_comlab"
                            dataIndex={"assign_comlab"}
                            sorter={true}
                        />

                        <Table.Column
                            title="Custodian"
                            key="person_liable"
                            dataIndex={"person_liable"}
                            sorter={true}
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
                            setPaginationTotal={dataSource?.data.total}
                            showLessItems={true}
                            showSizeChanger={false}
                            tblIdWrapper="tbl_wrapper"
                        />
                    </div>
                </Col>
            </Row>
            <ModalInventory
                toggleModalInventory={toggleModalInventory}
                setToggleModalInventory={setToggleModalInventory}
            />
            <ModalImportExcel
                isModalOpen={isImportModalOpen}
                handleOk={toggleImportModal}
                handleCancel={toggleImportModal}
                refreshData={refreshData}
            />
        </>
    );
}
