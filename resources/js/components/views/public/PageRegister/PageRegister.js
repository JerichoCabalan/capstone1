import React, { useState } from "react";
import {
    Layout,
    Typography,
    Card,
    Alert,
    Form,
    Button,
    Tabs,
    DatePicker,
    Col,
    Row,
} from "antd";
import { logo } from "../../../providers/companyInfo";
import { encrypt } from "../../../providers/companyInfo";
import { Link, useNavigate } from "react-router-dom";
import { date, description } from "../../../providers/companyInfo";

import FloatInput from "../../../providers/FloatInput";
import FloatInputPassword from "../../../providers/FloatInputPassword";
import validateRules from "../../../providers/validateRules";

import { POST } from "../../../providers/useAxiosQuery";
import FloatSelect from "../../../providers/FloatSelect";
import FloatInputMask from "../../../providers/FloatInputMask";

export default function PageRegister() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("login");

    const [errorMessageLogin, setErrorMessageLogin] = useState({
        type: "",
        message: "",
    });

    const { mutate: mutateLogin, isLoading: isLoadingButtonLogin } = POST(
        "api/login",
        "login"
    );

    const onFinishLogin = (values) => {
        console.log("onFinishLogin", values);

        mutateLogin(values, {
            onSuccess: (res) => {
                // console.log("res", res);
                if (res.data) {
                    localStorage.userdata = encrypt(JSON.stringify(res.data));
                    localStorage.token = res.token;

                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    setErrorMessageLogin({
                        type: "error",
                        message: res.message,
                    });
                }
            },
            onError: (err) => {
                setErrorMessageLogin({
                    type: "error",
                    message: (
                        <>
                            Unrecognized username or password.{" "}
                            <b>Forgot your password?</b>
                        </>
                    ),
                });
            },
        });
    };

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <Layout.Content>
            <div
                className="container"
                // style={{
                //     height: "700px",
                // }}
            >
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
                                style={{
                                    marginTop: "-80px",
                                }}
                            />
                        </div>

                        <Typography.Title
                            className="text-center text-log-in mt-0"
                            style={{
                                marginTop: "-80px !important",
                            }}
                        >
                            Sign Up{" "}
                        </Typography.Title>

                        <Form
                            layout="vertical"
                            className="login-form"
                            onFinish={onFinishLogin}
                            autoComplete="off"
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
                                    label="Username / E-mail"
                                    placeholder="Username / E-mail"
                                />
                            </Form.Item>
                            <Form.Item
                                name="phonenumber"
                                rules={[validateRules.required]}
                                hasFeedback
                            >
                                <FloatInputMask
                                    label="Phone No"
                                    placeholder="Phone No"
                                    maskLabel="contact_number"
                                    maskType="999 999 9999"
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
                                name="confirm_password"
                                rules={[validateRules.required]}
                                hasFeedback
                            >
                                <FloatInputPassword
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoadingButtonLogin}
                                className="mt-10 btn-log-in page-login"
                                block
                                size="middle"
                            >
                                Log In
                            </Button>

                            {errorMessageLogin.message && (
                                <Alert
                                    className="mt-10"
                                    type={errorMessageLogin.type}
                                    message={errorMessageLogin.message}
                                />
                            )}

                            <p
                                style={{
                                    marginLeft: "85px",
                                }}
                            >
                                Already have an account?
                                <Link
                                    to="/login"
                                    style={{
                                        marginTop: "15px",
                                    }}
                                >
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
