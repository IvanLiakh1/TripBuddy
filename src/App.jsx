import React, { useEffect, useState } from 'react';

import Footer from './component/footer/footer.jsx';
import Header from './component/header/header.jsx';

function App() {
    return (
        <>
            <Header />
            <div style={{ width: 50, height: 600 }}></div>
            <Footer />
        </>
    );
}

export default App;
