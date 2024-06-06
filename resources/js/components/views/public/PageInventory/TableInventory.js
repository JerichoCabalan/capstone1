import { Row, Col, Table, Card, Popconfirm } from "antd";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../providers/CustomTableFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencil,
    faTrash,
    faUserGear,
    faUserPlus,
} from "@fortawesome/pro-regular-svg-icons";
import notificationErrors from "../../../providers/notificationErrors";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { description } from "../../../providers/companyInfo";

export default function TableInventory(props) {
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

    return (
        <Row
            gutter={[12, 12]}
            id="tbl_wrapper"
            style={{
                marginTop: "-24px",
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
                        key="assigned_comlab"
                        dataIndex={"assigned_comlab"}
                        sorter={true}
                    />
                    <Table.Column
                        title="Status"
                        key="equipment_status"
                        dataIndex={"equipment_status"}
                        sorter={true}
                    />
                    <Table.Column
                        title="Quantity of Stock"
                        key="no_of_stock"
                        sorter
                        dataIndex={"no_of_stock"}
                    />
                    <Table.Column
                        title="Action"
                        key="user_id"
                        sorter
                        render={(text, record) => (
                            <Popconfirm
                                // title={`Are you sure you want to borrow this ${record.description}?`}
                                title="Are you sure you want to Borrow?"
                                onConfirm={() => {
                                    console.log("Icon clicked!", record);
                                    navigate("/login");
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <FontAwesomeIcon icon={faUserPlus} />
                            </Popconfirm>
                        )}
                    />
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
    );
}
