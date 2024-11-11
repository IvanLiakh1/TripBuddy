import './homepage.css';
import React from 'react';
import cycle from '../../assets/bicycle.svg';
import photogrid from '../../assets/Photo _grid.png';
import Layout from '../../component/layout.jsx';

function HomePage() {
    return (
        <div className="app-container">
            <Layout>
                <div className="main_page">
                    <div className="about-us-container">
                        <img src={cycle} alt="велосипед" />
                        <span className="about-us-font">
                            TripBuddy — це сайт, на якому можна знайти учасників для подорожей та спортивних заходів,
                            які націлені на групові активні або пасивні відпочинки. На сайті зустрічаються два типи
                            людей: люди, які створюють ці події, та люди, які в пошуках цих подій.
                        </span>
                    </div>
                    <h2 className="about-us-font center" style={{ marginTop: 15, marginBottom: 10 }}>
                        НЕОБМЕЖЕНА КІЛЬКІСТЬ ВАРІАНТІВ ПРОВЕДЕННЯ ЧАСУ
                    </h2>
                    <img src={photogrid} alt="фото" className="photogrid" />
                </div>
            </Layout>
        </div>
    );
}

export default HomePage;
