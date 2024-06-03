import React from "react";
import FloatInput from "../../../providers/FloatInput";
import { Button, Col, Form, Row } from "antd";
import FloatSelect from "../../../providers/FloatSelect";
import TextArea from "antd/es/input/TextArea";
import FloatDatePicker from "../../../providers/FloatDatePicker";
export default function PageInventoryAdminForm() {
    return (
        <Form>
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Row gutter={[0, 0]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="category">
                                <FloatInput
                                    label="Unit No"
                                    placeholder="Unit No"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="category">
                                <FloatInput
                                    label="Description"
                                    placeholder="Description"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="category">
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

                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
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
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="category">
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
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="Person liable">
                                <FloatInput
                                    label="Date Acquired"
                                    placeholder="Date Acquired"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="category">
                                <FloatDatePicker
                                    label="Date Acquired"
                                    placeholder="Date Acquired"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="category">
                                <FloatInput
                                    label="Supplier"
                                    placeholder="Supplier"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="payroll_terms">
                                <FloatInput
                                    label="Amount"
                                    placeholder="Amount"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="payroll_terms">
                                <FloatInput
                                    label="Amount"
                                    placeholder="Amount"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Row gutter={[0, 0]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="department">
                                <FloatInput
                                    label="Item No"
                                    placeholder="Item No"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="employment_status">
                                <FloatInput
                                    label="Property No"
                                    placeholder="Property No"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="confidentiality_level">
                                <FloatInput
                                    label="Control No"
                                    placeholder="Control No"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="confidentiality_level">
                                <FloatInput
                                    label="Serial No"
                                    placeholder="Serial No"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="confidentiality_level">
                                <FloatInput
                                    label="Amount"
                                    placeholder="Amount"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="confidentiality_level">
                                <FloatInput
                                    label="No of Stocks"
                                    placeholder="No of Stocks"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="confidentiality_level">
                                <FloatInput
                                    label="Restocking Point"
                                    placeholder="Restocking Point"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="confidentiality_level">
                                <FloatInput
                                    label="Restocking Point"
                                    placeholder="Restocking Point"
                                    // onChange={(e) => handleDebounce(e)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Row gutter={[0, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="department">
                            <TextArea
                                styles={{ width: "100%" }}
                                label="Remarks"
                                placeholder="Remarks"
                                // onChange={(e) => handleDebounce(e)}
                                rows={7}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Row>
        </Form>
    );
}
