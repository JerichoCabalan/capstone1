import { Modal, Button, Form, notification, Spin, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { message, Upload } from "antd";
import { FileExcelOutlined, InboxOutlined } from "@ant-design/icons";
import FloatInput from "../../../../providers/FloatInput";
import FloatSelect from "../../../../providers/FloatSelect";
import FloatDatePicker from "../../../../providers/FloatDatePicker";
import notificationErrors from "../../../../providers/notificationErrors";
import { useForm } from "antd/es/form/Form";
import { POST } from "../../../../providers/useAxiosQuery";
import TextArea from "antd/es/input/TextArea";

export default function ModalInventory(props) {
    const { toggleModalInventory, setToggleModalInventory } = props;
    const [form] = Form.useForm();
    const { mutate: mutateInventoryAdmin } = POST(`api/inventory_modal`, [
        "inventory_admin",
    ]);

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
        setToggleModalInventory({
            open: false,
            data: null,
        });
    };
    useEffect(() => {
        if (toggleModalInventory.open) {
            form.setFieldsValue({
                unit_no: toggleModalInventory.data
                    ? toggleModalInventory.data.unit_no
                    : "",
                description: toggleModalInventory.data
                    ? toggleModalInventory.data.description
                    : "",
                assign_comlab: toggleModalInventory.data
                    ? toggleModalInventory.data.assign_comlab
                    : "",
                category: toggleModalInventory.data
                    ? toggleModalInventory.data.category
                    : "",
                equipment_status: toggleModalInventory.data
                    ? toggleModalInventory.data.equipment_status
                    : "",
                person_liable: toggleModalInventory.data
                    ? toggleModalInventory.data.person_liable
                    : "",
                supplier: toggleModalInventory.data
                    ? toggleModalInventory.data.supplier
                    : "",
                amount: toggleModalInventory.data
                    ? toggleModalInventory.data.amount
                    : "",
                item_no: toggleModalInventory.data
                    ? toggleModalInventory.data.item_no
                    : "",
                category: toggleModalInventory.data
                    ? toggleModalInventory.data.category
                    : "",
                property_no: toggleModalInventory.data
                    ? toggleModalInventory.data.property_no
                    : "",
                control_no: toggleModalInventory.data
                    ? toggleModalInventory.data.control_no
                    : "",
                serial_no: toggleModalInventory.data
                    ? toggleModalInventory.data.serial_no
                    : "",
                no_of_stock: toggleModalInventory.data
                    ? toggleModalInventory.data.no_of_stock
                    : "",
                restocking_point: toggleModalInventory.data
                    ? toggleModalInventory.data.restocking_point
                    : "",
                remarks: toggleModalInventory.data
                    ? toggleModalInventory.data.remarks
                    : "",
            });
        }

        return () => {};
    }, [toggleModalInventory]);

    return (
        <Modal
            className="ant-modal-wrap-2"
            style={{ backgroundColor: "red" }}
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
                    className="btn-main-primary"
                    type="primary"
                    size="large"
                    key={2}
                    onClick={() => form.submit()}
                >
                    Upload
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
                                        ]}
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
                                        ]}
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
                                        ]}
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
                                        label="Date Acquired"
                                        placeholder="Date Acquired"
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
                                        label="Date Acquired"
                                        placeholder="Date Acquired"
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
                                        label="Restocking Point"
                                        placeholder="Restocking Point"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Row gutter={[0, 0]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="remarks" style={{}}>
                                <TextArea
                                    label="Remarks"
                                    placeholder="Remarks"
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
