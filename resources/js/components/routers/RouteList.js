import { Routes, Route } from "react-router-dom";
import { faBooks, faHome, faUsers } from "@fortawesome/pro-regular-svg-icons";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Page404 from "../views/errors/Page404";
import PageRequestPermission from "../views/errors/PageRequestPermission";

import PageLogin from "../views/public/PageLogin/PageLogin";

import PageEditProfile from "../views/private/PageEditProfile/PageEditProfile";
import PageDashboard from "../views/private/PageDashboard/PageDashboard";

import PageRegister from "../views/public/PageRegister/PageRegister";

import PageInventory from "../views/public/PageInventory/PageInventory";
import PageRoles from "../views/private/PageUser/components/AllUsercomponents/PageRoles";
import PageAllUser from "../views/private/PageUser/components/AllUsercomponents/PageAllUser";
import PageInventoryAdminForm from "../views/private/PageInventory/PageInventoryAdminForm";
import PageCategoryAdmin from "../views/private/PageInventory/PageCategoryAdmin";
import PageBinAdmin from "../views/private/PageInventory/PageBinAdmin";
import PageBorrowedStock from "../views/private/PageInventory/PageBorrowedStock";
import { faShieldKeyhole } from "@fortawesome/pro-light-svg-icons";
import PageUser from "../views/private/PageUser/PageUser";
import PageUserRolePermission from "../views/private/PagePermission/PageUserRolePermission";
import PageDashBoardStaff from "../views/private/PageDashboardStaff/PageDashboardStaff";
import PageReportChat from "../views/private/PageReport/PageReportChart";
import EquipmentRoute from "./EquipmentRoute";
import PageInventoryBorrowStaff from "../views/private/PageStaff/PageInventoryBorrowStaff";

export default function RouteList() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute
                        title="LOGIN"
                        pageId="PageLogin"
                        component={PageLogin}
                    />
                }
            />

            <Route
                path="/signup"
                element={
                    <PublicRoute
                        title="LOGIN"
                        pageId="PageLogin"
                        component={PageRegister}
                    />
                }
            />
            <Route
                path="/"
                element={
                    <EquipmentRoute
                        title="LOGIN"
                        pageId="PageLogin"
                        component={PageInventory}
                    />
                }
            />
            <Route
                path="/edit-profile"
                element={
                    <PrivateRoute
                        moduleName="Edit Profile"
                        title="User"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserProfile"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Edit Profile",
                            },
                        ]}
                        component={PageEditProfile}
                    />
                }
            />
            <Route
                path="/test/testing"
                element={
                    <PrivateRoute
                        moduleName="Edit Profile"
                        title="User"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserProfile"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/test/testing",
                            },
                            {
                                name: "Edit Profile",
                            },
                        ]}
                        component={PageInventory}
                    />
                }
            />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute
                        // moduleCode="M-01"
                        moduleName="Home"
                        title="Home"
                        subtitle="ADMIN"
                        pageId="PageHome"
                        pageHeaderIcon={faHome}
                        breadcrumb={[
                            {
                                name: "Home",
                            },
                        ]}
                        component={PageDashboard}
                    />
                }
            />

            {/* users */}

            <Route
                path="/users/user"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="User"
                        title="User"
                        subtitle="VIEW / EDIT"
                        pageId="User"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Inventory",
                                link: "/dashboard",
                            },
                            {
                                name: "Users",
                            },
                            {
                                name: "Users",
                            },
                        ]}
                        component={PageAllUser}
                    />
                }
            />
            <Route
                path="/users/roles"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="User"
                        title="User"
                        subtitle="VIEW / EDIT"
                        pageId="User"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Inventory",
                                link: "/dashboard",
                            },
                            {
                                name: "Users",
                            },
                            {
                                name: "Roles",
                            },
                        ]}
                        component={PageRoles}
                    />
                }
            />
            <Route
                path="/inventory/equipment"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Equipment"
                        title="Equipment"
                        subtitle="VIEW / EDIT"
                        pageId="Equipment"
                        pageHeaderIcon={faShieldKeyhole}
                        breadcrumb={[
                            {
                                name: "Inventory",
                                link: "/dashboard",
                            },
                            {
                                name: "Inventory",
                            },
                            {
                                name: "Equipment",
                            },
                        ]}
                        component={PageInventoryAdminForm}
                    />
                }
            />
            <Route
                path="/inventory/borrowedstock"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Equipment"
                        title="Equipment"
                        subtitle="VIEW / EDIT"
                        pageId="Equipment"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Home",
                                link: "/dashboard",
                            },
                            {
                                name: "Inventory",
                            },
                            {
                                name: "Borrowed Stock",
                            },
                        ]}
                        component={PageBorrowedStock}
                    />
                }
            />
            <Route
                path="/inventory/creticalstock"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Inventory Category"
                        title="Creticalstock"
                        subtitle="VIEW / EDIT"
                        pageId="Creticalstock"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Home",
                                link: "/dashboard",
                            },
                            {
                                name: "Inventory",
                            },
                            {
                                name: "Cretical Stock",
                            },
                        ]}
                        component={PageCategoryAdmin}
                    />
                }
            />
            <Route
                path="/inventory/bin"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Equipment"
                        title="Equipment"
                        subtitle="VIEW / EDIT"
                        pageId="Equipment"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Inventory",
                                link: "/dashboard",
                            },
                            {
                                name: "Inventory",
                            },
                            {
                                name: "Bin",
                            },
                        ]}
                        component={PageBinAdmin}
                    />
                }
            />

            <Route
                path="/permission/user-monitoring"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="User Current Edit Permission"
                        title="User's Edit Permission"
                        subtitle="EDIT"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Users",
                                link: "/permission/user-monitoring",
                            },
                            {
                                name: "Edit Permission",
                            },
                        ]}
                        component={PageUserRolePermission}
                    />
                }
            />
            <Route
                path="/report/chart"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Equipment Report Chart"
                        title="Equipment Report Chart"
                        subtitle="Equipment Report Chart"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Users",
                                link: "/report/chart",
                            },
                            {
                                name: "Equipment Report Chart",
                            },
                        ]}
                        component={PageReportChat}
                    />
                }
            />

            {/* end permission */}

            {/* STAFF DASHBOARD */}
            <Route
                path="/staffdashboard"
                element={
                    <PrivateRoute
                        // moduleCode="M-01"
                        moduleName="Home"
                        title="Home"
                        subtitle="ADMIN"
                        pageId="PageHome"
                        pageHeaderIcon={faHome}
                        breadcrumb={[
                            {
                                name: "Home",
                            },
                        ]}
                        component={PageDashBoardStaff}
                    />
                }
            />

            <Route
                path="/inventorys"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Equipment Report Chart"
                        title="Equipment Report Chart"
                        subtitle="Equipment Report Chart"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/staffdashboard",
                            },
                            {
                                name: "Users",
                                link: "/inventorys",
                            },
                            {
                                name: "Equipment Report Chart",
                            },
                        ]}
                        component={PageInventoryBorrowStaff}
                    />
                }
            />

            {/* END STAFF DASHBOARD */}

            <Route
                path="/request-permission"
                element={<PageRequestPermission />}
            />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
