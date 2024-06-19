import {
    Modal,
    Button,
    Form,
    notification,
    Row,
    Col,
    Space,
    Input,
    Divider,
} from "antd";
import { useEffect, useState, useRef } from "react";
import {
    FileExcelOutlined,
    InboxOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import FloatInput from "../../../../providers/FloatInput";
import FloatSelect from "../../../../providers/FloatSelect";
import FloatDatePicker from "../../../../providers/FloatDatePicker";
import notificationErrors from "../../../../providers/notificationErrors";
import { useForm } from "antd/es/form/Form";
import { POST } from "../../../../providers/useAxiosQuery";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

export default function ModalInventory(props) {
    const { toggleModalInventory, setToggleModalInventory } = props;
    const [form] = Form.useForm();
    const { mutate: mutateInventoryAdmin } = POST(
        `api/inventory_modal`,
        "inventory_admin"
    );
    const [assignComlabItems, setAssignComlabItems] = useState(() => {
        const savedItems = localStorage.getItem("assignComlabItems");
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [categoryItems, setCategoryItems] = useState(() => {
        const savedItems = localStorage.getItem("categoryItems");
        return savedItems ? JSON.parse(savedItems) : [];
    });

    const inputRef = useRef(null);
    const [name, setName] = useState("");
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem("items");
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const addAssignComlabItem = (e) => {
        e.preventDefault();
        const newItem = name || `New item ${assignComlabItems.length + 1}`;
        const newItems = [...assignComlabItems, newItem];
        localStorage.setItem("assignComlabItems", JSON.stringify(newItems));
        setAssignComlabItems(newItems);
        setName("");
    };

    const addCategoryItem = (e) => {
        e.preventDefault();
        const newItem = name || `New item ${categoryItems.length + 1}`;
        const newItems = [...categoryItems, newItem];
        localStorage.setItem("categoryItems", JSON.stringify(newItems));
        setCategoryItems(newItems);
        setName("");
    };

    const addItem = (e) => {
        e.preventDefault();
        const newItem = name || `New item ${items.length + 1}`;
        const newItems = [...items, newItem];
        localStorage.setItem("items", JSON.stringify(newItems));
        setItems(newItems);
        setName("");

        form.setFieldsValue({
            equipment_status: newItem,
        });

        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const onFinish = (values) => {
        console.log("onFinish values", values);

        let date_acquired = form.getFieldValue("date_acquired")
            ? form.getFieldValue("date_acquired").format("YYYY-MM-DD")
            : "";

        let data = {
            ...values,
            id:
                toggleModalInventory.data && toggleModalInventory.data.id
                    ? toggleModalInventory.data.id
                    : "",
            date_acquired,
        };

        let notifMessage = "Add Equipment";

        if (toggleModalInventory.data && toggleModalInventory.data.id) {
            notifMessage = "Edit Equipment";
        }

        mutateInventoryAdmin(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: notifMessage,
                        description: res.message,
                    });
                    setToggleModalInventory({
                        open: false,
                        data: null,
                    });
                } else {
                    notification.error({
                        message: notifMessage,
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setToggleModalInventory({
            open: false,
            data: null,
        });
    };
    useEffect(() => {
        if (toggleModalInventory.open && toggleModalInventory.data) {
            form.setFieldsValue({
                unit_no: toggleModalInventory.data.unit_no || "",
                description: toggleModalInventory.data.description || "",
                assign_comlab: toggleModalInventory.data.assign_comlab || "",
                category: toggleModalInventory.data.category || "",
                equipment_status:
                    toggleModalInventory.data.equipment_status || "",
                person_liable:
                    toggleModalInventory.data.person_liable ||
                    "Dr. Vicente A. Pitogo",
                supplier: toggleModalInventory.data.supplier || "",
                amount: toggleModalInventory.data.amount || "",
                item_no: toggleModalInventory.data.item_no || "",
                category: toggleModalInventory.data.category || "",
                property_no: toggleModalInventory.data.property_no || "",
                control_no: toggleModalInventory.data.control_no || "",
                serial_no: toggleModalInventory.data.serial_no || "",
                no_of_stock: toggleModalInventory.data.no_of_stock || "",
                restocking_point:
                    toggleModalInventory.data.restocking_point || "",
                remarks: toggleModalInventory.data.remarks || "",
                date_acquired: toggleModalInventory.data
                    ? dayjs(toggleModalInventory.data.date_acquired)
                    : "",
            });
        } else {
            form.resetFields();
        }
    }, [toggleModalInventory]);
    return (
        <Modal
            className="ant-modal-wrap-2 custom-modal"
            title={
                (toggleModalInventory.data && toggleModalInventory.data.id
                    ? "EDIT"
                    : "ADD") + " Equipment"
            }
            open={toggleModalInventory.open}
            onCancel={handleCancel}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    key={1}
                    onClick={handleCancel}
                >
                    CANCEL
                </Button>,
                <Button
                    className="btn-main-primary btn-main-invert-outline b-r-none hides"
                    size="large"
                    style={{
                        marginLeft: "10px",
                        backgroundColor: "#f27510",
                        color: "white",
                        borderColor: "#f27510",
                    }}
                    type="primary"
                    key={2}
                    onClick={() => form.submit()}
                >
                    Submit
                </Button>,
            ]}
        >
            <Form form={form} onFinish={onFinish}>
                <Row gutter={[12, 12]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Row gutter={[0, 0]}>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="unit_no">
                                    <FloatInput
                                        label="Unit No"
                                        placeholder="Unit No"
                                        required
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="description">
                                    <FloatInput
                                        label="Description"
                                        placeholder="Description"
                                        required
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="assign_comlab">
                                    <FloatSelect
                                        label="Assigned ComLab"
                                        placeholder="Assigned ComLab"
                                        required
                                        options={[
                                            {
                                                value: "CL1",
                                                label: "CL1",
                                            },
                                            {
                                                value: "CL2",
                                                label: "CL2",
                                            },
                                            {
                                                value: "CL3",
                                                label: "CL3",
                                            },
                                            {
                                                value: "CL4",
                                                label: "CL4",
                                            },
                                            {
                                                value: "CL5",
                                                label: "CL5",
                                            },
                                            {
                                                value: "CL6",
                                                label: "CL6",
                                            },
                                            {
                                                value: "CL10",
                                                label: "CL10",
                                            },
                                            {
                                                value: "NetLab",
                                                label: "NetLab",
                                            },
                                            {
                                                value: "Multimedia",
                                                label: "Multimedia",
                                            },
                                            {
                                                value: "MSIT",
                                                label: "MSIT",
                                            },
                                            ...assignComlabItems.map(
                                                (item) => ({
                                                    value: item,
                                                    label: item,
                                                })
                                            ),
                                        ]}
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <Divider
                                                    style={{ margin: "8px 0" }}
                                                />
                                                <Space
                                                    style={{
                                                        padding: "0 8px 4px",
                                                    }}
                                                >
                                                    <Input
                                                        style={{
                                                            width: "170px",
                                                        }}
                                                        placeholder="Add Assigned ComLab"
                                                        value={name}
                                                        onChange={onNameChange}
                                                        onKeyDown={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        ref={inputRef}
                                                    />
                                                    <Button
                                                        type="text"
                                                        icon={<PlusOutlined />}
                                                        onClick={
                                                            addAssignComlabItem
                                                        }
                                                    ></Button>
                                                </Space>
                                            </>
                                        )}
                                    />
                                </Form.Item>
                            </Col>

                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="category">
                                    <FloatSelect
                                        required
                                        label="Category"
                                        placeholder="Category"
                                        options={[
                                            {
                                                value: "Keyboard",
                                                label: "Keyboard",
                                            },
                                            {
                                                value: "Mouse",
                                                label: "Mouse",
                                            },
                                            {
                                                value: "Monitor",
                                                label: "Monitor",
                                            },
                                            {
                                                value: "Power Supply",
                                                label: "Power Supply",
                                            },
                                            {
                                                value: "System Unit",
                                                label: "System Unit",
                                            },
                                            {
                                                value: "AVR",
                                                label: "AVR",
                                            },
                                            {
                                                value: "Laptop Charger",
                                                label: "Laptop Charger",
                                            },
                                            {
                                                value: "Projector",
                                                label: "Projector",
                                            },
                                            {
                                                value: "HDMI",
                                                label: "HDMI",
                                            },
                                            {
                                                value: "TV",
                                                label: "TV",
                                            },
                                            ...categoryItems.map((item) => ({
                                                value: item,
                                                label: item,
                                            })),
                                        ]}
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <Divider
                                                    style={{ margin: "8px 0" }}
                                                />
                                                <Space
                                                    style={{
                                                        padding: "0 8px 4px",
                                                    }}
                                                >
                                                    <Input
                                                        style={{
                                                            width: "170px",
                                                        }}
                                                        placeholder="Add Category"
                                                        value={name}
                                                        onChange={onNameChange}
                                                        onKeyDown={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        ref={inputRef}
                                                    />
                                                    <Button
                                                        type="text"
                                                        icon={<PlusOutlined />}
                                                        onClick={
                                                            addCategoryItem
                                                        }
                                                    ></Button>
                                                </Space>
                                            </>
                                        )}
                                    />
                                </Form.Item>
                            </Col>

                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="equipment_status">
                                    <FloatSelect
                                        required
                                        label="Equipment Status"
                                        placeholder="Equipment Status"
                                        options={[
                                            {
                                                value: "Working",
                                                label: "Working",
                                            },
                                            {
                                                value: "Damaged",
                                                label: "Damaged",
                                            },
                                            {
                                                value: "To Repair",
                                                label: "To Repair",
                                            },
                                            {
                                                value: "Excess",
                                                label: "Excess",
                                            },
                                            {
                                                value: "Borrowed",
                                                label: "Borrowed",
                                            },
                                            {
                                                value: "Unreturned",
                                                label: "Unreturned",
                                            },
                                            {
                                                value: "Lost",
                                                label: "Lost",
                                            },
                                            ...items.map((item) => ({
                                                value: item,
                                                label: item,
                                            })),
                                        ]}
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <Divider
                                                    style={{ margin: "8px 0" }}
                                                />
                                                <Space
                                                    style={{
                                                        padding: "0 8px 4px",
                                                    }}
                                                >
                                                    <Input
                                                        style={{
                                                            width: "170px",
                                                        }}
                                                        placeholder="Add Equipment Status"
                                                        value={name}
                                                        onChange={onNameChange}
                                                        onKeyDown={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        ref={inputRef}
                                                    />
                                                    <Button
                                                        type="text"
                                                        icon={<PlusOutlined />}
                                                        onClick={addItem}
                                                    ></Button>
                                                </Space>
                                            </>
                                        )}
                                    />
                                </Form.Item>
                            </Col>

                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="date_acquired">
                                    <FloatDatePicker
                                        required
                                        label="Date Acquired"
                                        placeholder="Date Acquired"
                                        format="YYYY-MM-DD"
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="supplier">
                                    <FloatInput
                                        required
                                        label="Supplier"
                                        placeholder="Supplier"
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="amount">
                                    <FloatInput
                                        required
                                        label="Amount"
                                        placeholder="Amount"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Row gutter={[0, 0]}>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="item_no">
                                    <FloatInput
                                        required
                                        label="Item No"
                                        placeholder="Item No"
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="property_no">
                                    <FloatInput
                                        label="Property No"
                                        placeholder="Property No"
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="control_no">
                                    <FloatInput
                                        required
                                        label="Control No"
                                        placeholder="Control No"
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="serial_no">
                                    <FloatInput
                                        required
                                        label="Serial No"
                                        placeholder="Serial No"
                                    />
                                </Form.Item>
                            </Col>

                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="no_of_stock">
                                    <FloatInput
                                        required
                                        label="No of Stocks"
                                        placeholder="No of Stocks"
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="restocking_point">
                                    <FloatInput
                                        required
                                        label="Restocking Point"
                                        placeholder="Restocking Point"
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Form.Item name="person_liable">
                                    <FloatInput
                                        required
                                        label="Person Liable"
                                        placeholder="Person Liable"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Row gutter={[0, 0]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="remarks" style={{}}>
                                <TextArea
                                    style={{ width: "1234px" }}
                                    required
                                    label="Remarks"
                                    placeholder="Remarks"
                                    defaultValue="No. Sticker"
                                    rows={7}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Row>
            </Form>
        </Modal>
    );
}
