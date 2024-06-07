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
} from "antd";
import { logo } from "../../../providers/companyInfo";
import { encrypt } from "../../../providers/companyInfo";
import { Link, useNavigate } from "react-router-dom";
import { date, description } from "../../../providers/companyInfo";

import FloatInput from "../../../providers/FloatInput";
import FloatInputPassword from "../../../providers/FloatInputPassword";
import validateRules from "../../../providers/validateRules";

import { POST } from "../../../providers/useAxiosQuery";

export default function PageLogin() {
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
        try {
            console.log("onFinishLogin", values);

            mutateLogin(values, {
                onSuccess: (res) => {
                    // console.log("res", res);
                    if (res.data) {
                        localStorage.userdata = encrypt(
                            JSON.stringify(res.data)
                        );
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
        } catch (error) {
            console.error("An error occurred during login:", error);
            setErrorMessageLogin({
                type: "error",
                message: "An unexpected error occurred. Please try again.",
            });
        }
    };

    const onChange = (key) => {
        console.log(key);
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
                <div className="right">
                    <Card>
                        <div className="text-center mt-0">
                            <img src="../../../images/register.png" alt="" />
                        </div>

                        <Typography.Title className="text-center text-log-in mt-0">
                            Log In
                        </Typography.Title>

                        <Form
                            layout="vertical"
                            className="login-form"
                            onFinish={onFinishLogin}
                            autoComplete="off"
                        >
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
                                name="password"
                                rules={[validateRules.required]}
                                hasFeedback
                            >
                                <FloatInputPassword
                                    label="Password"
                                    placeholder="Password"
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

                            <div>
                                <p
                                    style={{
                                        marginTop: "15px",
                                        fontSize: "12px",
                                        width: "330px",
                                    }}
                                >
                                    By creating an account, you are agree to the
                                    Terms of Service and Privacy Policy.
                                </p>
                            </div>
                            <p
                                style={{
                                    marginLeft: "85px",
                                }}
                            >
                                Doesn't have an ?
                                <Link
                                    to="/signup"
                                    style={{
                                        marginTop: "15px",
                                    }}
                                >
                                    {" "}
                                    Sign Up here
                                </Link>
                            </p>
                        </Form>
                    </Card>
                </div>
            </div>
        </Layout.Content>
    );
}
