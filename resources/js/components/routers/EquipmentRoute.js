import React from "react";
import PrivateLayout from "../layouts/private/Private";
import Equipment from "../layouts/equipment/Equipment";

const EquipmentRoute = (props) => {
    const { component: Component } = props;

    return (
        <Equipment {...props}>
            <Component {...props} />
        </Equipment>
    );
};

export default EquipmentRoute;
