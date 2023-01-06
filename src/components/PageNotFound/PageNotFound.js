import React from "react";
import './PageNotFound.css';
import { useHistory } from "react-router-dom";

function PageNotFound() {
    const navigate = useHistory();
    
    return (
        <div className="page-not-found">
            <div className="page-not-found__text">
                <h1 className="page-not-found__title">404</h1>
                <p className="page-not-found__message">Страница не найдена</p>
            </div>
            <p onClick={() => navigate.goBack()} className="page-not-found__link">Назад</p>
        </div>
    )
};

export default PageNotFound;