import React, { useState } from "react";
import { Avatar, Col, Divider, Drawer, List, Row } from "antd";

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

const PageRoles = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <List
                dataSource={[
                    {
                        id: 1,
                        name: "Lily",
                    },
                    {
                        id: 2,
                        name: "Lily",
                    },
                ]}
                bordered
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <a onClick={showDrawer} key={`a-${item.id}`}>
                                View Profile
                            </a>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                            }
                            title={
                                <a href="https://ant.design/index-cn">
                                    {item.name}
                                </a>
                            }
                            description="Progresser XTech"
                        />
                    </List.Item>
                )}
            />
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
            >
                <p
                    className="site-description-item-profile-p"
                    style={{
                        marginBottom: 24,
                    }}
                >
                    User Profile
                </p>
                {/* Rest of the Drawer content */}
            </Drawer>
        </>
    );
};

export default PageRoles;
