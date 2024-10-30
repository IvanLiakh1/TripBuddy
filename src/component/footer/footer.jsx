import './FooterStyle.css';

import React from 'react';

function Footer() {
    return (
        <div className="footer-container">
            <div className="row">
                <div className="logo">TripBuddy</div>
                <div className="row2">
                    <p style={{ fontSize: 20, marginBottom: 20 }}>Знаходь нас</p>
                    <div className="social" style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
                        <div>
                            <p>Instagram</p>
                            <p>Twitter</p>
                        </div>
                        <div>
                            <p>@TripBuddy</p>
                            <p>@TripBuddy_Off</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: 20 }}>
                        <p style={{ fontSize: 20, marginBottom: 20 }}>Підтримка</p>
                        <div className="social" style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
                            <div>
                                <p>Повідомити про баг</p>
                                <p>Пропозиції</p>
                            </div>
                            <div>
                                <p>bugsTripBuddy@gmail.com</p>
                                <p>proposTripBuddy@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
