import React from "react";
import { Link } from "react-router-dom";
import "./notFoundPage.scss"; 

const NotFoundPage = () => {

    document.body.style.overflow = "hidden"  

    return (
        <>
            <section className="page-not-found">
                <div className="floating-shapes">
                    <div className="shape shape1"></div>
                    <div className="shape shape2"></div>
                </div>

                <div className="content">
                    <div className="icon">🔎</div>
                    <h1 className="error-code">404</h1>
                    <h2 className="error-text">Page Not Found</h2>
                    <p className="description">
                        Oops! The page you’re looking for doesn’t exist. It might have been removed or relocated. Don’t worry, you can find your way back!
                    </p>

                    <Link to="/" className="back-btn">
                        ← Back to Home
                    </Link>
                </div>
            </section>
        </>
    );
};

export default NotFoundPage;