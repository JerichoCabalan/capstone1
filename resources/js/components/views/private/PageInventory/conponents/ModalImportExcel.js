import { Modal, Button, Spin, message, Upload } from "antd";
import { useState } from "react";
import { FileExcelOutlined } from "@ant-design/icons";

export default function ModalImportExcel({
    isModalOpen,
    handleOk,
    handleCancel,
    refreshData,
}) {
    const { Dragger } = Upload;
    const [loading, setLoading] = useState(false);

    const handleUploadChange = (info) => {
        const { status } = info.file;
        if (status === "uploading") {
            setLoading(true);
        } else {
            setLoading(false);
            if (status === "done") {
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
                refreshData();
                window.location.reload(); // Refresh the site
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };

    return (
        <Modal
            title="Import Excel"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    key={1}
                    style={{
                        marginLeft: "10px",
                        backgroundColor: "#ff6624",
                        color: "white",
                        borderColor: "#ff6624",
                    }}
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
                <Dragger
                    name="equipment_file"
                    action="/api/process_excel_chart"
                    multiple={false}
                    onChange={handleUploadChange}
                >
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
            </Spin>
        </Modal>
    );
}
