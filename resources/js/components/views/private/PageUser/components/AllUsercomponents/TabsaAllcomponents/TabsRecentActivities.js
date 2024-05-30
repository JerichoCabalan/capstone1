import { Card, Col, Form } from "antd";
import React from "react";
import FloatInput from "../../../../../../providers/FloatInput";
import FloatSelect from "../../../../../../providers/FloatSelect";

export default function TabsRecentActivities() {
    return (
        <div>
            <p>Date</p>
            <Card
                style={{
                    width: "300px",
                    marginLeft: "293px",
                }}
            >
                <p>Card content</p>
            </Card>
            <Form>
                <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                    <Form.Item name="payroll_code">
                        <FloatSelect
                            label="Edit Status"
                            placeholder="Edit Status"
                            options={[
                                {
                                    label: "Active",
                                    value: "Active",
                                },
                                {
                                    label: "Inactive",
                                    value: "Inative",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Form>
        </div>
    );
}
