import { Layout } from "antd";
import { name } from "../../providers/companyInfo";

export default function Footer() {
    return <Layout.Footer>{`${name} ©2024 DEVELOPED BY  TEAM`}</Layout.Footer>;
}
