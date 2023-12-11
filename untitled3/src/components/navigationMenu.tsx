import React from "react";
import { Link } from "react-router-dom";

const NavigationMenu: React.FC = () => {
    return (
        <nav style={navStyles}>
            <ul style={ulStyles}>
                <li style={liStyles}>
                    <Link to="/stocks" style={linkStyles}>
                        Список акций
                    </Link>
                </li>
                <li style={liStyles}>
                    <Link to="/brokers" style={linkStyles}>
                        Список брокеров
                    </Link>
                </li>
                <li style={liStyles}>
                    <Link to="/settings" style={linkStyles}>
                        Настройки
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

const navStyles = {
    background: "#333",
    padding: "10px",
};

const ulStyles = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
};

const liStyles = {
    marginRight: "20px",
};

const linkStyles = {
    textDecoration: "none",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
};

export default NavigationMenu;
