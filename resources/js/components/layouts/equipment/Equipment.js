import { useEffect } from "react";
import { name } from "../../providers/companyInfo";
import { Layout } from "antd";

export default function Equipment(props) {
    const { children, title, pageId } = props;

    useEffect(() => {
        if (title) {
            document.title = title + " | " + "Equipment Item";
        }

        return () => {};
    }, [title]);

    return (
        <Layout className="public-layout" id={pageId ?? ""}>
            {children}
        </Layout>
    );
}
