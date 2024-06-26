import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge, Dropdown, Image, Layout, Menu, Typography } from "antd";
import {
    apiUrl,
    defaultProfile,
    role,
    userData,
} from "../../providers/companyInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPowerOff, faXmark } from "@fortawesome/pro-light-svg-icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import {
    faBell,
    faClock,
    faComment,
    faComments,
} from "@fortawesome/pro-regular-svg-icons";

export default function Header(props) {
    const {
        width,
        sideMenuCollapse,
        setSideMenuCollapse,
        pageHeaderClass,
        pageHeaderIcon,
        title,
        subtitle,
        dataUserProfileInfo,
    } = props;

    const [profileInfo, setProfileInfo] = useState({
        image: defaultProfile,
        username: "",
        role: "",
    });
    const [showNotifications, setShowNotifications] = useState(true);
    const [notificationsCleared, setNotificationsCleared] = useState(false);
    const [showCreticalNotifications, setCreticalShowNotifications] =
        useState(true);
    const [creticalNotificationsCleared, setCreticalNotificationsCleared] =
        useState(false);

    useEffect(() => {
        if (dataUserProfileInfo) {
            if (dataUserProfileInfo.profile) {
                let image = defaultProfile;
                let username = `${dataUserProfileInfo.profile.firstname} ${dataUserProfileInfo.profile.lastname}`;
                let role = `${dataUserProfileInfo.user_role.role}`;
                if (dataUserProfileInfo.profile.attachments.length) {
                    image = apiUrl(
                        dataUserProfileInfo.profile.attachments[0].file_path
                    );
                }

                setProfileInfo({
                    image,
                    username,
                    role,
                });
            }
        }

        return () => {};
    }, [dataUserProfileInfo]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userdata");
        window.location.reload();
    };

    const menuNotification = (show) => {
        if (!show || notificationsCleared) {
            return {
                items: [
                    {
                        label: "No notification",
                        key: "1",
                    },
                ],
                notifications: 0,
            };
        }
        console.log("Current Role:", profileInfo.role);

        let notifications = 0;
        let items = [];

        if (profileInfo.role === "Super Admin") {
            notifications = 3;
            items = [
                ...items,
                {
                    label: (
                        <span>
                            <p> Test1@gmail.com Borrow Laptop </p>
                            <p> Test2@gmail.com Borrow Projector </p>
                            <p> Test2@gmail.com Borrow Camera </p>
                        </span>
                    ),
                    key: "1",
                },
            ];
        } else if (profileInfo.role === "Technician") {
            notifications = 45;
            items.push({
                label: (
                    <span>
                        <p>Please Repair this Keyboard in Cl 8</p>
                        <p>Please Repair this Mouse in Cl 10</p>
                        <p>Please Repair this Monitor in Cl 1</p>
                    </span>
                ),
                key: "technician",
            });
        } else if (profileInfo.role !== "Lab Staff") {
            notifications = 1;
            items.push({
                label: <span>Accept Your Borrow Items</span>,
                key: "2",
            });
        } else if (profileInfo.role === "Faculty") {
            notifications = 2;
            items.push({
                label: <span>Faculty Notifications</span>,
                key: "faculty",
            });
        } else if (profileInfo.role === "Procurement Officer") {
            notifications = 2;
            items.push({
                label: <span>Procurement Tasks</span>,
                key: "procurement",
            });
        } else if (profileInfo.role === "Comlab Adviser") {
            notifications = 2;
            items.push({
                label: <span>Advisory Notices</span>,
                key: "comlab",
            });
        } else if (profileInfo.role === "Student Assistant") {
            notifications = 1;
            items.push({
                label: <span>Assistant Duties</span>,
                key: "assistant",
            });
        } else if (profileInfo.role !== "Technician") {
            notifications = 1;
            items.push({
                label: <span>Please Repair this</span>,
                key: "3",
            });
        }

        items.push(
            {
                type: "divider",
            },
            {
                label: "Clear All",
                key: "clear-all",
                onClick: () => {
                    setShowNotifications(false);
                    setNotificationsCleared(true);
                },
            }
        );

        return { items, notifications };
    };

    const menuProfile = () => {
        const items = [
            {
                key: "/account/details",
                className: "menu-item-profile-details",
                label: (
                    <div className="menu-item-details-wrapper">
                        <Image
                            preview={false}
                            src={profileInfo.image}
                            alt={profileInfo.username}
                        />

                        <div className="info-wrapper">
                            <Typography.Text className="info-username">
                                {profileInfo.username}
                            </Typography.Text>

                            <br />
                            <Typography.Text className="info-role">
                                {profileInfo.role}
                            </Typography.Text>
                        </div>
                    </div>
                ),
            },
            {
                key: "/edit-profile",
                icon: <FontAwesomeIcon icon={faEdit} />,
                label: <Link to="/edit-profile">Edit Account Profile</Link>,
            },
        ];

        items.push({
            key: "/signout",
            className: "ant-menu-item-logout",
            icon: <FontAwesomeIcon icon={faPowerOff} />,
            label: (
                <Typography.Link onClick={handleLogout}>
                    Sign Out
                </Typography.Link>
            ),
        });

        return { items };
    };

    const [hasCollapse, setHasCollapse] = useState(false);

    useEffect(() => {
        const handleCollapseUnfold = () => {
            setHasCollapse(false);
        };

        const handleCollapseFold = () => {
            setHasCollapse(true);
        };

        const handleResize = () => {
            setHasCollapse(false);
        };

        const btnSidemenuCollapseUnfold = document.getElementById(
            "btn_sidemenu_collapse_unfold"
        );
        btnSidemenuCollapseUnfold.addEventListener(
            "type-of-event",
            handleCollapseUnfold
        );

        const btnSidemenuCollapseFold = document.getElementById(
            "btn_sidemenu_collapse_fold"
        );
        btnSidemenuCollapseFold.addEventListener(
            "type-of-event",
            handleCollapseFold
        );

        window.addEventListener("resize", handleResize);

        return () => {
            btnSidemenuCollapseUnfold.removeEventListener(
                "type-of-event",
                handleCollapseUnfold
            );
            btnSidemenuCollapseFold.removeEventListener(
                "type-of-event",
                handleCollapseFold
            );
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const menuCreticalStock = (show) => {
        const [notifications, setNotifications] = useState([
            "have a Cretical Stock Mouse is 0 out of stock",
            "have a Cretical Stock Monitor is 0 out of stock",
            "To Repair Keyboard In CL 10",
            "Despose Mouse In CL 10",
            "have a Cretical Stock Avr is 0 out of stock",
        ]);

        if (!show || creticalNotificationsCleared) {
            return {
                items: [
                    {
                        label: "No notification",
                        key: "1",
                    },
                ],
                notifications: 0,
            };
        }

        const removeNotification = (index) => {
            setNotifications((currentNotifications) =>
                currentNotifications.filter((_, i) => i !== index)
            );
        };

        const items = [
            ...notifications.map((notification, index) => ({
                label: (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <span>{notification}</span>
                        <FontAwesomeIcon
                            className="menu-submenu-notification"
                            icon={faXmark}
                            onClick={() => removeNotification(index)}
                            style={{
                                cursor: "pointer",
                                marginRight: "-8px",
                                marginTop: "-23px",
                            }}
                        />
                    </div>
                ),
                key: `notification-${index}`,
            })),
            {
                type: "divider",
            },
            {
                label: "Clear All",
                key: "clear-all",
                onClick: () => {
                    setCreticalShowNotifications(false);
                    setCreticalNotificationsCleared(true);
                },
            },
        ];

        return { items, notifications: notifications.length };
    };

    return (
        <Layout.Header>
            <div className="header-left-menu">
                {width >= 768 ? (
                    <PageHeader
                        className={pageHeaderClass}
                        title={
                            <>
                                <div className="ant-page-header-icon">
                                    <FontAwesomeIcon icon={pageHeaderIcon} />
                                </div>
                                <div className="ant-page-header-text">
                                    <div
                                        className="sub-title"
                                        id="pageHeaderSubtitle"
                                    >
                                        {subtitle}
                                    </div>
                                    <div className="title" id="pageHeaderTitle">
                                        {title}
                                    </div>
                                </div>
                            </>
                        }
                    />
                ) : (
                    <div className="menu-left-icon menu-left-icon-menu-collapse-on-close">
                        {sideMenuCollapse ? (
                            <MenuUnfoldOutlined
                                onClick={() => setSideMenuCollapse(false)}
                                className="menuCollapseOnClose"
                            />
                        ) : (
                            <MenuFoldOutlined
                                onClick={() => setSideMenuCollapse(true)}
                                className="menuCollapseOnClose"
                            />
                        )}
                    </div>
                )}
            </div>

            <div className="header-right-menu">
                <Dropdown
                    menu={menuProfile()}
                    placement="bottomRight"
                    overlayClassName="menu-submenu-profile-popup"
                    trigger={["click"]}
                >
                    <Image
                        preview={false}
                        rootClassName="menu-submenu-profile"
                        src={profileInfo.image}
                        alt={profileInfo.username}
                    />
                </Dropdown>
                <Dropdown
                    overlay={
                        <Menu
                            items={menuNotification(showNotifications).items}
                        />
                    }
                    placement="bottomRight"
                    overlayClassName="menu-submenu-notification-popup"
                    trigger={["click"]}
                >
                    <Badge
                        count={
                            menuNotification(showNotifications).notifications
                        }
                        overflowCount={99}
                    >
                        <FontAwesomeIcon
                            className="menu-submenu-notification"
                            icon={faComments}
                        />
                    </Badge>
                </Dropdown>
                <Dropdown
                    overlay={
                        <Menu
                            items={
                                menuCreticalStock(showCreticalNotifications)
                                    .items
                            }
                        />
                    }
                    placement="bottomRight"
                    overlayClassName="menu-submenu-notification-popup"
                    trigger={["click"]}
                >
                    <Badge
                        count={
                            menuCreticalStock(showCreticalNotifications)
                                .notifications
                        }
                        overflowCount={99}
                    >
                        <FontAwesomeIcon
                            className="menu-submenu-notification"
                            icon={faClock}
                        />
                    </Badge>
                </Dropdown>
            </div>
        </Layout.Header>
    );
}
