import React, { useState } from "react";
import FloatInput from "../../../../providers/FloatInput";
import { Button, Form, Modal } from "antd";

export default function ModalInventory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Modal
            title="New Inventory"
            open={isModalOpen}
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    key={1}
                >
                    CANCEL
                </Button>,
                <Button
                    className="btn-main-primary"
                    type="primary"
                    size="large"
                    key={2}
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Form>
                <Form.Item name="amount">
                    <FloatInput label="Amount" placeholder="Amount" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
