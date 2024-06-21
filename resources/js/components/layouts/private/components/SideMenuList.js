import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUsers,
    faShieldKeyhole,
    faCogs,
    faTasks,
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
                path: "/users/user",
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
                title: "Borrowed Stock",
                path: "/inventory/borrowedstock",
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
        path: "/report",
        icon: <FontAwesomeIcon icon={faCogs} />,
        children: [
            {
                title: "Report",
                path: "/report/chart",
                moduleCode: "M-06",
            },
        ],
    },
    {
        title: "Permissions",
        path: "/permission",
        icon: <FontAwesomeIcon icon={faShieldKeyhole} />,
        children: [
            {
                title: "User Monitoring",
                path: "/permission/user-monitoring",
                moduleCode: "M-05",
            },
        ],
    },
    {
        title: "Test Borrows",
        path: "/test",
        icon: <FontAwesomeIcon icon={faShieldKeyhole} />,
        children: [
            {
                title: "Test",
                path: "/test/testing",
                moduleCode: "M-05",
            },
        ],
    },
];

export const staffSideMenu = [
    {
        title: "Home",
        path: "/staffdashboard",
        icon: <FontAwesomeIcon icon={faHome} />,
        moduleCode: "S-01",
    },
    {
        title: "Inventory",
        path: "/inventorys",
        icon: <FontAwesomeIcon icon={faUsers} />,
        moduleCode: "S-02",
    },
    {
        title: "Reports",
        path: "/report",
        icon: <FontAwesomeIcon icon={faTasks} />,
        moduleCode: "S-03",
    },
];
