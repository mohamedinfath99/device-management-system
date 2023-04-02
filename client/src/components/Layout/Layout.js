import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import '../Styles/Common.css'



const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>

            <Header />

            <main className="main-section">
                <Toaster />
                {children}
            </main>

            <Footer />

        </div>
    );
};

Layout.defaultProps = {
    title: "DEVICE MANAGEMENT SYSTEM",
    description: "MERN Stack Project",
    keywords: "MongoDB, Express.js, React.js, Node.js",
    author: "RM. Infath",
};


export default Layout;