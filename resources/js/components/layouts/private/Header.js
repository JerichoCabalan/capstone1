import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Dropdown, Image, Layout, Menu, Row, Typography } from "antd";
import {
    apiUrl,
    defaultProfile,
    role,
    userData,
} from "../../providers/companyInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPowerOff, faBell } from "@fortawesome/pro-light-svg-icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { TableGlobalSearch } from "../../providers/CustomTableFilter";
import { GET } from "../../providers/useAxiosQuery";
// Import your custom hook

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

    const { data: dataBorrowStatus, error } = GET(
        "api/borrow_stock",
        "borrow_stock"
    ); // Fetch notification data
    const [notifications, setNotifications] = useState([]);

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

    useEffect(() => {
        if (dataBorrowStatus) {
            setNotifications(dataBorrowStatus); // Update notifications state with fetched data
        }
    }, [dataBorrowStatus]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userdata");
        window.location.reload();
    };

    const menuNotification = () => {
        const items = notifications.length
            ? notifications.map((notification, index) => ({
                  label: notification.message,
                  key: index,
              }))
            : [
                  {
                      label: "No notifications",
                      key: "1",
                  },
              ];

        console.log("Notification Items:", items); // Debug notification items
        return { items };
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
            "click",
            handleCollapseUnfold
        );

        const btnSidemenuCollapseFold = document.getElementById(
            "btn_sidemenu_collapse_fold"
        );
        btnSidemenuCollapseFold.addEventListener("click", handleCollapseFold);

        window.addEventListener("resize", handleResize);

        return () => {
            btnSidemenuCollapseUnfold.removeEventListener(
                "click",
                handleCollapseUnfold
            );
            btnSidemenuCollapseFold.removeEventListener(
                "click",
                handleCollapseFold
            );
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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

            <div
                className="header-right-menu"
                style={{
                    marginLeft: "410px",
                }}
            >
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
                    menu={menuNotification()}
                    placement="bottomRight"
                    overlayClassName="menu-submenu-notification-popup"
                    trigger={["click"]}
                >
                    <FontAwesomeIcon
                        className="menu-submenu-notification"
                        icon={faBell}
                    />
                </Dropdown>
            </div>
        </Layout.Header>
    );
}
