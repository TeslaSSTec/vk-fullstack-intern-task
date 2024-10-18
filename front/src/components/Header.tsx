import styles from './Header.module.css';
import {NavLink, Outlet} from "react-router-dom";
import {useGetUserDataQuery} from "../store/api.ts";

function Header() {

    const {isSuccess, data} = useGetUserDataQuery()

    return (
        <>
            <header className={styles.header}>
                <div className={styles.linksHolder}>
                    <NavLink
                        className={({isActive}) => [styles.navLink, isActive ? styles.navLinkActive : ""].join(" ")}
                        to={"/"}>{"Все котики"}</NavLink>
                    <NavLink
                        className={({isActive}) => [styles.navLink, isActive ? styles.navLinkActive : ""].join(" ")}
                        to={"/favorites"}>{"Любимые котики"}</NavLink>
                </div>
                {isSuccess ?
                    <div className={styles.navLink}>{data.login}</div> :
                    <NavLink
                        className={({isActive}) => [styles.navLink, isActive ? styles.navLinkActive : ""].join(" ")}
                        to={"/auth"}>{"Войти"}</NavLink>}
            </header>
            <Outlet/>
        </>
    )
}

export default Header