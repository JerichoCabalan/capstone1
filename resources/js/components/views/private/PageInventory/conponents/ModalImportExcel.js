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
    const [loading, setLoading] = useState(false);

    const props = {
        name: "file",
        multiple: true,
        action: "",
        accept: ".xlsx,.xls",
        onChange(info) {
            const { status } = info.file;
            if (status === "uploading") {
                setLoading(true);
            } else if (status === "done") {
                setLoading(false);
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
            } else if (status === "error") {
                setLoading(false);
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
                    className="btn-main-primary btn-main-invert-outline b-r-none hides"
                    type="primary"
                    size="large"
                    style={{
                        marginLeft: "10px",
                        backgroundColor: "#ff6624",
                        color: "white",
                        borderColor: "#ff6624",
                    }}
                    key={2}
                    onClick={handleOk}
                >
                    Upload
                </Button>,
            ]}
        >
            <Spin spinning={loading}>
                {" "}
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
        </Modal>
    );
}
