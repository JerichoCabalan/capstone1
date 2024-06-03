import { Modal, Button, Form, notification, Spin } from "antd";
import { useEffect, useState } from "react";
import { message, Upload } from "antd";
import { FileExcelOutlined, InboxOutlined } from "@ant-design/icons";

export default function ModalImportExcel({
    isModalOpen,
    handleOk,
    handleCancel,
}) {
    const { Dragger } = Upload;
    const [loading, setLoading] = useState(false); // Add this line

    const props = {
        name: "file",
        multiple: true,
        action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        accept: ".xlsx,.xls",
        onChange(info) {
            const { status } = info.file;
            if (status === "uploading") {
                setLoading(true); // Set loading to true when the upload starts
            } else if (status === "done") {
                setLoading(false); // Set loading to false when the upload finishes
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
            } else if (status === "error") {
                setLoading(false); // Set loading to false when the upload fails
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    return (
        <Modal
            title="Import Excel"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            forceRender
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
                    onClick={handleOk}
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Spin spinning={loading}>
                {" "}
                {/* Add this line */}
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <FileExcelOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support for a single or Excel upload. Strictly
                        prohibited from uploading company data or other banned
                        files.
                    </p>
                </Dragger>
            </Spin>{" "}
            {/* Add this line */}
        </Modal>
    );
}
