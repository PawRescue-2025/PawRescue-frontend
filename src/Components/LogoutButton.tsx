import React from "react";
import AuthViewModel from "../ViewModels/AuthViewModel";
import { useNavigate } from "react-router-dom";

const authVM = new AuthViewModel();


const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const userId = localStorage.getItem("userId");
            await authVM.logout(String(userId));

            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            localStorage.removeItem("status");

            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
            alert("Не вдалося вийти. Спробуйте ще раз.");
        }
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                padding: "0.5rem 1rem",
                borderRadius: "12px",
                border: "none",
                background: "rgba(255, 255, 255, 0.3)",
                cursor: "pointer",
                fontWeight: 600,
                transition: "0.3s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.5)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
        >
            Вийти
        </button>
    );

};

export default LogoutButton;
