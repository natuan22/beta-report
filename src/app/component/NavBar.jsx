import React from 'react'
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <NavLink
                to="/"
            >
                Bản tin sáng
            </NavLink>
            <NavLink
                to="/ban-tin-chieu"
            >
                Bản tin chiều
            </NavLink>

        </div>
    )
}

export default NavBar