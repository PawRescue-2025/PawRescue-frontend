import React, { useState } from "react";
import { UserType } from "../Enums/UserType";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthViewModel from "../ViewModels/AuthViewModel";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [mode, setMode] = useState<"login" | "signup">("login");
    const authVM = new AuthViewModel();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const handleLogin = async () => {
        try {
            const result = await authVM.logIn(email, password);

            console.log("Logged in:", result);
            alert("Login successful");

            navigate("/useful-links");

        } catch (error: any) {
            console.error(error);
            alert(error?.message || "Login failed");
        }
    };


    const handleSignUp = async () => {
        alert("Registered");
    };


    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100 position-relative overflow-hidden overflow-y-auto"
            style={{
                background: "linear-gradient(135deg, #53e2ae 0%, #0c875a 50%)",
            }}
        >


            <style>{`
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, -30px) scale(1.1); }
                }
                
                .glass-card {
                    background: rgba(255, 255, 255, 0.35);
                    backdrop-filter: blur(25px) saturate(180%);
                    -webkit-backdrop-filter: blur(25px) saturate(180%);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6);
                }
                
                .input-glass {
                    background: rgba(255, 255, 255, 0.25) !important;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.4) !important;
                    color: #1a5f3d !important;
                    transition: all 0.3s ease;
                }
                
                .input-glass:focus {
                    background: rgba(255, 255, 255, 0.35) !important;
                    border-color: rgba(110, 255, 167, 0.6) !important;
                    box-shadow: 0 0 20px rgba(110, 255, 167, 0.4) !important;
                    transform: translateY(-2px);
                }
                
                .input-glass::placeholder {
                    color: rgba(26, 95, 61, 0.6) !important;
                }
                
                .btn-gradient {
                    background: rgba(26, 95, 61, 0.6) !important;
                    border: none;
                    color: white;
                    font-weight: 600;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    box-shadow: 0 8px 20px rgba(45, 134, 89, 0.4);
                    transition: all 0.3s ease;
                }
                
                .btn-gradient:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 30px rgba(45, 134, 89, 0.5);
                    background: linear-gradient(135deg, #3fb573 0%, #52d98d 50%, #6effa7 100%);
                }
                
                .mode-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    font-size: 0.85rem;
                    padding: 0.4rem 0.8rem;
                    transition: all 0.3s ease;
                }
                
                .mode-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                }
                
                .mode-btn.active {
                    background: rgba(26, 95, 61, 0.6) !important;
                    border-color: rgba(110, 255, 167, 0.5);
                    box-shadow: 0 4px 15px rgba(110, 255, 167, 0.3);
                }
                
                label {
                    color: rgba(255, 255, 255, 0.95);
                    font-weight: 600;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    font-size: 0.9rem;
                    letter-spacing: 0.3px;
                }
                
                .logo-container {
                    background: rgba(255, 255, 255, 0.25);
                    backdrop-filter: blur(15px);
                    border: 2px solid rgba(255, 255, 255, 0.4);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                }
            `}</style>

            <div className="glass-card position-relative" style={{
                width: "600px",
                padding: "2.5rem",
                borderRadius: "30px",
                zIndex: 10
            }}>
                {/* Logo */}
                <div className="d-flex justify-content-center mb-4">
                    <div className="logo-container" style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">

                        </svg>
                    </div>
                </div>

                <h2 className="text-center mb-1" style={{
                    color: "white",
                    fontWeight: "700",
                    textShadow: "0 3px 15px rgba(0, 0, 0, 0.3)",
                    fontSize: "2rem"
                }}>
                    PawRescue
                </h2>

                <p className="text-center mb-4" style={{
                    color: "rgba(255, 255, 255, 0.85)",
                    fontSize: "0.9rem",
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
                }}>
                    {mode === "login" && "З поверненням!"}
                    {mode === "signup" && "Приєднайся до спільноти небайдужих!"}
                </p>

                {/* Mode selector */}
                <div className="d-flex gap-2 mb-4">
                    <button
                        className={`mode-btn flex-fill ${mode === "login" ? "active" : ""}`}
                        onClick={() => setMode("login")}
                    >
                        Увійти в акаунт
                    </button>
                    <button
                        className={`mode-btn flex-fill ${mode === "signup" ? "active" : ""}`}
                        onClick={() => setMode("signup")}
                    >
                        Зареєструватись
                    </button>
                </div>

                <div className="mb-3">
                    <label>Електронна адреса</label>
                    <input
                        className="form-control input-glass"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com"
                    />
                </div>

                <div className="mb-3">
                    <label>Пароль</label>
                    <input
                        type="password"
                        className="form-control input-glass"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                {(mode !== "login") && (
                    <>
                        <div className="mb-3">
                            <label>і т.д.</label>
                        </div>

                    </>
                )}

                <button
                    className="btn btn-gradient w-100 mb-3 py-3"
                    onClick={
                        mode === "login" ? handleLogin : handleSignUp
                    }
                >
                    {mode === "login" ? "Увійти" : "Зареєструватись"}
                </button>

                <p className="text-center mb-0" style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "0.85rem",
                    textShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"
                }}>
                    {mode === "login" ? "Ще не маєте профілю? Зареєструйтесь вище" : "Уже маєте акаунт? Увійдіть вище"}
                </p>
            </div>
        </div>
    );
}