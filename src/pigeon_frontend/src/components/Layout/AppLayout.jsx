import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import RightSidebar from "../Sidebar/RightSidebar";
import Header from "../Header";

const style = {
    container: {
        padding: "0px 320px",
        display: "flex"
    }
}
const AppLayout = () => {
    return <div style={style.container}>
        <Sidebar />
        <Outlet />
        <RightSidebar />

    </div>;
};

export default AppLayout;