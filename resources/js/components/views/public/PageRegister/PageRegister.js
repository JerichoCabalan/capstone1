import React, { useState } from "react";
import { Layout, Typography, Card, Alert, Form, Button, Col, Row } from "antd";
import { logo, encrypt } from "../../../providers/companyInfo";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

import FloatInput from "../../../providers/FloatInput";
import FloatInputPassword from "../../../providers/FloatInputPassword";
import validateRules from "../../../providers/validateRules";
import { POST } from "../../../providers/useAxiosQuery";
import FloatSelect from "../../../providers/FloatSelect";
import FloatInputMask from "../../../providers/FloatInputMask";

export default function PageRegister() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [errorMessageLogin, setErrorMessageLogin] = useState({
        type: "",
        message: "",
    });

    const { mutate: mutateRegister, isLoading: isLoadingRegister } = POST(
        "api/register",
        "login"
    );

    const onFinish = (values) => {
        mutateRegister(values, {
            onSuccess: (res) => {
                console.log("res", res);
                message.success("Registration successful! Please login.");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 500);
            },
            onError: (err) => {
                message.error("Registration failed. Please try again.");
            },
        });
    };

    return (
        <Layout.Content>
            <div className="container">
                <div className="left">
                    <div className="logo-wrapper zoom-in-out-box-1">
                        {/* <img src={logo} /> */}
                    </div>
                    {/* <Typography.Title className="title">
                        FSUU
                        <p className="sub-title">
                            Father Saturnino Urios University
                        </p>
                    </Typography.Title> */}
                </div>
                <div className="rights">
                    <Card className="page-register">
                        <div className="text-center mt-0">
                            <img
                                src="../../../images/register.png"
                                alt=""
                                style={{ marginTop: "-80px" }}
                            />
                        </div>
                        <Typography.Title
                            className="text-center text-log-in mt-0"
                            style={{ marginTop: "-80px !important" }}
                        >
                            Sign Up
                        </Typography.Title>
                        <Form
                            layout="vertical"
                            className="login-form"
                            onFinish={onFinish}
                            autoComplete="off"
                            form={form}
                        >
                            <Row gutter={[12, 12]}>
                                <Col xs={12} sm={12} md={12}>
                                    <Form.Item
                                        name="firstname"
                                        rules={[validateRules.required]}
                                    >
                                        <FloatInput
                                            label="First Name"
                                            placeholder="First Name"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12}>
                                    <Form.Item name="lastname">
                                        <FloatInput
                                            label="Last Name"
                                            placeholder="Last Name"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                name="email"
                                rules={[validateRules.required]}
                                hasFeedback
                            >
                                <FloatInput
                                    label="E-mail"
                                    placeholder=" E-mail"
                                />
                            </Form.Item>
                            <Form.Item
                                name="username"
                                rules={[validateRules.required]}
                                hasFeedback
                            >
                                <FloatInput
                                    label="Username"
                                    placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item
                                name="phone_number"
                                rules={[validateRules.required]}
                                hasFeedback
                            >
                                <FloatInputMask
                                    label="Phone No"
                                    placeholder="Phone No"
                                    maskLabel="phone_number"
                                    maskType="999 9999 9999"
                                    required={true}
                                />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                rules={[validateRules.required]}
                                hasFeedback
                            >
                                <FloatSelect
                                    label="Role"
                                    placeholder="Role"
                                    options={[
                                        {
                                            value: "Lab Staff",
                                            label: "Lab Staff",
                                        },
                                        {
                                            value: "Technician",
                                            label: "Technician",
                                        },
                                        {
                                            value: "Procurement Officer",
                                            label: "Procurement Officer",
                                        },
                                        {
                                            value: "Comlab Adviser",
                                            label: "Comlab Adviser",
                                        },
                                        { value: "Faculty", label: "Faculty" },
                                        {
                                            value: "Students Assistant",
                                            label: "Students Assistant",
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[validateRules.required]}
                                hasFeedback
                            >
                                <FloatInputPassword
                                    label="Password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password_confirmation"
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please confirm your password!",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue("password") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    "The two passwords do not match!"
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <FloatInputPassword
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                />
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoadingRegister}
                                className="mt-10 btn-log-in page-login"
                                block
                                size="middle"
                            >
                                Sign Up
                            </Button>
                            {errorMessageLogin.message && (
                                <Alert
                                    className="mt-10"
                                    type={errorMessageLogin.type}
                                    message={errorMessageLogin.message}
                                />
                            )}
                            <p style={{ marginLeft: "85px" }}>
                                Already have an account?
                                <Link to="/login" style={{ marginTop: "15px" }}>
                                    {" "}
                                    Login here
                                </Link>
                            </p>
                        </Form>
                    </Card>
                </div>
            </div>
        </Layout.Content>
    );
}
