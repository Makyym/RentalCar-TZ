import clsx from "clsx";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import sprite from "../../assets/sprite.svg";

const activeLink = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
    return (
        <div className={s.panel}>
            <div className={s.navPanel}>
                <h3>
                    <svg width={104} height={16}>
                        <use href={`${sprite}#icon-Logo`}></use>
                    </svg>
                </h3>
                <nav className={s.nav}>
                    <NavLink to="/" className={activeLink}>
                        Home
                    </NavLink>
                    <NavLink to="/catalog" className={activeLink}>
                        Catalog
                    </NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Navigation