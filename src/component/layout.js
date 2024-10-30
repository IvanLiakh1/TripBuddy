import React from 'react';

import Footer from './footer/footer.jsx';
import Header from './header/header.jsx';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
