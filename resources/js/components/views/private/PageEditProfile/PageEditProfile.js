import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Collapse, Image, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/pro-regular-svg-icons";
import FloatInput from "../../../providers/FloatInput";
import FloatSelect from "../../../providers/FloatSelect";
import FloatInputMask from "../../../providers/FloatInputMask";
import { GET, POST } from "../../../providers/useAxiosQuery";
import validateRules from "../../../providers/validateRules";
import ModalFormEmail from "./ModalFormEmail";
import ModalFormPassword from "./ModalFormPassword";
import ModalUserUploadPictureForm from "./ModalUserUploadPictureForm";
import {
    apiUrl,
    defaultProfile,
    userData,
} from "../../../providers/companyInfo";
import notificationErrors from "../../../providers/notificationErrors";

export default function PageEditProfile() {
    const [form] = Form.useForm();

    const [selectedData, setSelectedData] = useState({
        username: "",
        email: "",
        firstname: "",
        lastname: "",
    });

    const [toggleModalFormEmail, setToggleModalFormEmail] = useState({
        open: false,
        data: null,
    });

    const [toggleModalFormPassword, setToggleModalFormPassword] = useState({
        open: false,
        data: null,
    });

    const [
        toggleModalUserUploadPictureForm,
        setToggleModalUserUploadPictureForm,
    ] = useState({
        open: false,
        data: null,
    });

    const [fileList, setFileList] = useState({
        imageUrl: defaultProfile,
        loading: false,
        file: null,
    });

    GET(`api/users/${userData().id}`, "users_info", (res) => {
        if (res.data) {
            let data = res.data;

            let username = data.username;
            let email = data.email;
            let firstname = data.firstname;
            let lastname = data.lastname;
            let phone_number = data.phone_number;
            let fullname = `${firstname} ${lastname}`;

            if (
                data.profile &&
                data.profile.attachments &&
                data.profile.attachments.length > 0
            ) {
                setFileList({
                    imageUrl: apiUrl(data.profile.attachments[0].file_path),
                    loading: false,
                    file: null,
                });
            }

            setSelectedData({
                username,
                email,
                firstname,
                lastname,
                phone_number,
                fullname,
            });
            form.setFieldsValue({
                username,
                email,
                firstname,
                lastname,
                phone_number,
                fullname,
            });
        }
    });

    const { mutate: mutateUpdateInfo } = POST(
        `api/user_profile_info_update`,
        "user_profile_info_update"
    );

    const onFinish = (values) => {
        console.log("onFinish", values);

        let data = {
            ...values,
            contact_number: values.contact_number
                ? values.contact_number.split(" ").join("")
                : "",
            fullname: `${values.firstname} ${values.lastname}`,
        };

        mutateUpdateInfo(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "User",
                        description: res.message,
                    });
                } else {
                    notification.success({
                        message: "User",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    const handleInputBlur = (value, field) => {
        console.log("handleInputBlur value, field", value, field);
        console.log("handleInputBlur selectedData", selectedData);
        if (field === "contact_number") {
            if (value !== undefined) {
                let newval = value.split("_").join("");
                newval = newval.split(" ").join("");
                let oldval = "";
                if (selectedData[field]) {
                    oldval = selectedData[field].split("_").join("");
                    oldval = selectedData[field].split(" ").join("");
                }
                if (oldval !== newval) {
                    form.submit();
                }
            }
        } else {
            if (selectedData[field] !== value) {
                form.submit();
            }
        }
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Row gutter={[12, 12]}>
                <Col sm={24} md={24} lg={14} xl={14} xxl={14}>
                    <Collapse
                        className="collapse-main-primary"
                        defaultActiveKey={["0", "1"]}
                        size="large"
                        expandIcon={({ isActive }) => (
                            <FontAwesomeIcon
                                icon={isActive ? faAngleUp : faAngleDown}
                            />
                        )}
                        items={[
                            {
                                key: "0",
                                label: "ACCOUNT INFORMATION",
                                children: (
                                    <Row gutter={[12, 0]}>
                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                        >
                                            <Form.Item name="username">
                                                <FloatInput
                                                    label="Username"
                                                    placeholder="Username"
                                                    disabled
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                        >
                                            <Form.Item name="fullname">
                                                <FloatInput
                                                    label="First Name"
                                                    placeholder="First Name"
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                        >
                                            <Form.Item name="email">
                                                <FloatInput
                                                    label="Email"
                                                    placeholder="Email"
                                                    disabled
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                        >
                                            <Form.Item name="phone_number">
                                                <FloatInput
                                                    label="Phone Number"
                                                    placeholder="Phone Number"
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={24}
                                            xl={24}
                                        >
                                            <Button
                                                type="link"
                                                className="p-0"
                                                onClick={() =>
                                                    setToggleModalFormEmail({
                                                        open: true,
                                                        data: {
                                                            id: userData().id,
                                                        },
                                                    })
                                                }
                                            >
                                                Change Email
                                            </Button>
                                        </Col>

                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={24}
                                            xl={24}
                                        >
                                            <Button
                                                type="link"
                                                className="p-0"
                                                onClick={() =>
                                                    setToggleModalFormPassword({
                                                        open: true,
                                                        data: {
                                                            id: userData().id,
                                                        },
                                                    })
                                                }
                                            >
                                                Change Password
                                            </Button>
                                        </Col>
                                    </Row>
                                ),
                            },
                        ]}
                    />
                </Col>

                <Col sm={24} md={24} lg={10} xl={10} xxl={10}>
                    <Collapse
                        className="collapse-main-primary"
                        defaultActiveKey={["0"]}
                        size="large"
                        expandIcon={({ isActive }) => (
                            <FontAwesomeIcon
                                icon={isActive ? faAngleUp : faAngleDown}
                            />
                        )}
                        items={[
                            {
                                key: "0",
                                label: "TAKE PHOTO",
                                children: (
                                    <Row gutter={[12, 12]}>
                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={24}
                                            xl={24}
                                            xxl={24}
                                            className="text-center"
                                        >
                                            <Image
                                                style={{
                                                    left: "38.75%",
                                                    right: "61.25%",
                                                    width: "200px",
                                                    height: "200px",
                                                    borderRadius: "100%",
                                                }}
                                                src={fileList.imageUrl}
                                            />
                                        </Col>
                                    </Row>
                                ),
                            },
                        ]}
                    />
                </Col>
            </Row>

            <ModalFormEmail
                toggleModalFormEmail={toggleModalFormEmail}
                setToggleModalFormEmail={setToggleModalFormEmail}
            />

            <ModalFormPassword
                toggleModalFormPassword={toggleModalFormPassword}
                setToggleModalFormPassword={setToggleModalFormPassword}
            />

            <ModalUserUploadPictureForm
                toggleModalUserUploadPictureForm={
                    toggleModalUserUploadPictureForm
                }
                setToggleModalUserUploadPictureForm={
                    setToggleModalUserUploadPictureForm
                }
            />
        </Form>
    );
}
