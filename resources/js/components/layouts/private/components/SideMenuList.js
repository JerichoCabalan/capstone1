import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUsers,
    faShieldKeyhole,
    faCogs,
} from "@fortawesome/pro-light-svg-icons";

export const adminHeaderMenuLeft = (
    <>
        {/* <div className="ant-menu-left-icon">
            <Link to="/subscribers/current">
                <span className="anticon">
                    <FontAwesomeIcon icon={faUsers} />
                </span>
                <Typography.Text>Subscribers</Typography.Text>
            </Link>
        </div> */}
    </>
);

export const adminHeaderDropDownMenuLeft = () => {
    const items = [
        // {
        //     key: "/subscribers/current",
        //     icon: <FontAwesomeIcon icon={faUsers} />,
        //     label: <Link to="/subscribers/current">Subscribers</Link>,
        // },
    ];

    return <Menu items={items} />;
};

export const adminSideMenu = [
    {
        title: "Home",
        path: "/dashboard",
        icon: <FontAwesomeIcon icon={faHome} />,
        moduleCode: "M-01",
    },
    {
        title: "Users",
        path: "/users",
        icon: <FontAwesomeIcon icon={faUsers} />,
        children: [
            {
                title: "Users",
                path: "/users/users",
                moduleCode: "M-02",
            },
            {
                title: "Roles",
                path: "/users/roles",
                moduleCode: "M-03",
            },
        ],
    },
    {
        title: "Inventory",
        path: "/inventory",
        icon: <FontAwesomeIcon icon={faShieldKeyhole} />,
        children: [
            {
                title: "Category",
                path: "/inventory/category",
                moduleCode: "M-04",
            },
            {
                title: "Equipment",
                path: "/inventory/equipment",
                moduleCode: "M-05",
            },
            {
                title: "Critical Stock",
                path: "/inventory/creticalstock",
                moduleCode: "M-05",
            },
            {
                title: "Bin",
                path: "/inventory/bin",
                moduleCode: "M-05",
            },
        ],
    },
    {
        title: "Reports",
        // path: "/system-settings",
        icon: <FontAwesomeIcon icon={faCogs} />,
        // // children: [
        // //     {
        // //         title: "Email Templates",
        // //         path: "/system-settings/email-templates",
        // //         moduleCode: "M-06",
        // //     },
        // // ],
    },
];
