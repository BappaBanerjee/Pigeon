import React from "react";
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

const sidebarNavItems = [
    {
        display: 'Home',
        icon: <i className='bx bx-home'></i>,
        to: '/',
        section: ''
    },
    {
        display: 'Getting Started',
        icon: <i className='bx bx-star'></i>,
        to: '/started',
        section: 'started'
    },
    {
        display: 'Calendar',
        icon: <i className='bx bx-calendar'></i>,
        to: '/calendar',
        section: 'calendar'
    },
    {
        display: 'User',
        icon: <i className='bx bx-user'></i>,
        to: '/user',
        section: 'user'
    },
    {
        display: 'Orders',
        icon: <i className='bx bx-receipt'></i>,
        to: '/order',
        section: 'order'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();



    return <div className='right_sidebar' style={{ backgroundImage: "url(/pigeonLogo.jpg)", backgroundRepeat: "round" }}>

    </div>;
};

export default Sidebar;