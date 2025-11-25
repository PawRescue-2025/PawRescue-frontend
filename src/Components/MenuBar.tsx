import React, { useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import UserViewModel from "../ViewModels/UserViewModel";

let userVM = new UserViewModel();

const MenuBar: React.FC = () => {

    const [userRole, setUserRole] = useState<number>();

    const loadUser = async () => {
        try {
            let userId = localStorage.getItem("userId");
            let res  = await userVM.getUserById(String(userId))
            setUserRole(Number(res.status))
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <nav
            style={{
                position: "fixed",
                top: "1rem",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(255, 255, 255, 0.35)",
                backdropFilter: "blur(10px)",
                padding: "0.7rem 1.4rem",
                borderRadius: "18px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 1000,
                display: "flex",
                gap: "1rem",
                fontWeight: 600
            }}
        >

            <div style={{width: '150px'}}>
            </div>

            <NavLink
                to="/main"
                style={({isActive}) => ({
                    textDecoration: "none",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "10px",
                    color: isActive ? "black" : "#333",
                    background: isActive ? "rgba(255,255,255,0.7)" : "transparent",
                    transition: "0.3s"
                })}
            >
                Головна
            </NavLink>

            {/*{userRole === 3 &&*/}
            <NavLink
                to="/complaints"
                style={({isActive}) => ({
                    textDecoration: "none",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "10px",
                    color: isActive ? "black" : "#333",
                    background: isActive ? "rgba(255,255,255,0.7)" : "transparent",
                    transition: "0.3s"
                })}
            >
                Скарги
            </NavLink>
            {/*}*/}

            <NavLink
                to="/useful-links"
                style={({isActive}) => ({
                    textDecoration: "none",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "10px",
                    color: isActive ? "black" : "#333",
                    background: isActive ? "rgba(255,255,255,0.7)" : "transparent",
                    transition: "0.3s"
                })}
            >
                Корисні посилання
            </NavLink>

            <div style={{width: '100px'}}>
            </div>

            <div>
                <LogoutButton/>
            </div>

        </nav>
    );
};

export default MenuBar;
