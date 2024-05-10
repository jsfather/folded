import React from 'react';
import Appbar from '../components/Appbar';

const Layout = ({children, title}) => {
    return (
        <>
            <Appbar title={title}/>
            <main>{children}</main>
        </>
    )
}

export default Layout;