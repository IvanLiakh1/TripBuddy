import './style.css';

import React from 'react';

import cycle from '../../assets/bicycle.svg';
import photogrid from '../../assets/Photo _grid.png';
import Footer from '../../component/footer/footer.jsx';
import Header from '../../component/header/header.jsx';

function App() {
    return (
        <>
            <Header />
            <div className="main_page">
                <div className="about-us-container">
                    <img src={cycle} />
                    <span className="about-us-font">
                        TripBuddy — це сайт, на якому можна знайти учасників для подорожей та спортивних заходів, які
                        націлені на групові активні або пасивні відпочинки. На сайті зустрічаються два типи людей: люди,
                        які створюють ці події, та люди, які в пошуках цих подій.
                    </span>
                </div>
                <h2 className="about-us-font center" style={{ marginTop: 15, marginBottom: 10 }}>
                    НЕОБМЕЖЕНА КІЛЬКІСТЬ ВАРІАНТІВ ПРОВЕДЕННЯ ЧАСУ
                </h2>
                <img src={photogrid} className="photogrid" />
            </div>
            <Footer />
        </>
    );
}

export default App;
