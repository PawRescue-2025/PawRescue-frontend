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
    const hasUpper = /[A-ZА-Я]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasLength = password.length >= 6;
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [documents, setDocuments] = useState<File[]>([]);
    const [userRole, setUserRole] = useState<UserType | null>(null);

    const handleLogin = async () => {
        try {
            const result = await authVM.logIn(email, password);
            alert("Login successful");
            navigate("/useful-links");
        } catch (error: any) {
            alert(error?.message || "Login failed");
        }
    };

    const handleSignUp = async () => {
        try {
            if (userRole === null) {
                alert("Будь ласка, оберіть роль.");
                return;
            }

            if (!email || !password || !fullName || !phoneNumber) {
                alert("Будь ласка, заповніть всі обов’язкові поля.");
                return;
            }

            if (!hasUpper || !hasDigit || !hasLength) {
                alert("Пароль не відповідає вимогам.");
                return;
            }

            if (userRole === UserType.Caring) {
                const result = await authVM.signUpUnverified(
                    email,
                    password,
                    fullName,
                    phoneNumber,
                    photo,
                    description
                );
                console.log(result);
                alert("Реєстрація (caring) успішна");
            } else {
                if (documents.length === 0) {
                    alert("Для даних ролей необхідно завантажити документи.");
                    return;
                }

                const result = await authVM.signUpVerified(
                    email,
                    password,
                    fullName,
                    phoneNumber,
                    userRole,
                    documents,
                    photo,
                    description
                );

                console.log(result);
                alert("Реєстрація (verified) успішна");
            }

            await authVM.logIn(email, password);
            let userId = localStorage.getItem("userId");
            if (userRole === UserType.ShelterOwner) {
                navigate("/add-shelter", { state: { userId } });
            } else {
                navigate("/useful-links");
            }
        } catch (error: any) {
            alert(error?.message || "Помилка під час реєстрації");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100 position-relative"
            style={{
                background: "linear-gradient(135deg, #a8e9d3 0%, #76c9a7 50%)",
            }}
        >

            <style>{`
        .glass-card {
            background: rgba(255, 255, 255, 0.35);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 2px solid rgba(255, 255, 255, 0.5);
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
            padding: 2rem;
            border-radius: 30px;
            width: 600px;
        }
    
        .input-glass {
            background: rgba(255, 255, 255, 0.25) !important;
            border: 1px solid rgba(255, 255, 255, 0.4) !important;
            color: #0c3e2d !important; /* більш контрастний темно-зелений */
            transition: 0.3s ease;
        }
    
        .input-glass::placeholder {
            color: rgba(12, 62, 45, 0.6) !important; /* більш темний placeholder */
        }
    
        .input-glass:focus {
            background: rgba(255, 255, 255, 0.35) !important;
            border-color: rgba(12, 135, 90, 0.6) !important;
            box-shadow: 0 0 20px rgba(12, 135, 90, 0.4) !important;
            transform: translateY(-2px);
        }
    
        .btn-gradient {
            background: rgba(12, 95, 61, 0.7);
            border: none;
            color: white;
            font-weight: 600;
            transition: 0.3s ease;
            box-shadow: 0 8px 20px rgba(45, 134, 89, 0.4);
        }
    
        .btn-gradient:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(45, 134, 89, 0.5);
            background: linear-gradient(135deg, #3fb573 0%, #52d98d 50%, #6effa7 100%);
        }
    
        .mode-btn {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: #0c3e2d; /* темно-зелений для контрасту */
            font-size: 0.85rem;
            padding: 0.4rem 0.8rem;
            transition: all 0.3s ease;
        }
    
        .mode-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
    
        .mode-btn.active {
            background: rgba(12, 95, 61, 0.7) !important;
            border-color: rgba(110, 255, 167, 0.5);
            color: white !important;
            box-shadow: 0 4px 15px rgba(110, 255, 167, 0.3);
        }
    
        label {
            color: #0c3e2d; /* темно-зелений для контрасту */
            font-weight: 600;
            text-shadow: 0 1px 2px rgba(0,0,0,0.15);
        }
    
        p, h2 {
            color: #0c3e2d; /* заголовки та параграфи темні */
            text-shadow: 0 1px 2px rgba(0,0,0,0.15);
        }
    `}</style>


            <div className="glass-card">
                <h2 className="text-center mb-3" style={{color: "rgba(24,67,29,0.85)", fontWeight: "700"}}>
                    PawRescue
                </h2>

                <p className="text-center mb-4" style={{color: "rgba(24,67,29,0.85)", fontSize: "0.9rem"}}>
                    {mode === "login" ? "З поверненням!" : "Приєднайся до спільноти небайдужих!"}
                </p>

                <div className="d-flex gap-2 mb-4">
                    <button
                        className={`mode-btn ${mode === "login" ? "active" : ""}`}
                        style={{width: "50%", height: "40px"}}
                        onClick={() => setMode("login")}
                    >
                        Увійти
                    </button>
                    <button
                        className={`mode-btn ${mode === "signup" ? "active" : ""}`}
                        style={{width: "50%", height: "40px"}}
                        onClick={() => setMode("signup")}
                    >
                        Зареєструватись
                    </button>
                </div>

                {mode === "login" && (
                    <>
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
                    </>
                )}

                {mode === "signup" && (
                    <>
                        <div className="mb-2">
                            <label>Оберіть свою роль</label>
                            <select
                                className="form-control input-glass"
                                value={userRole ?? ""}
                                onChange={e => setUserRole(Number(e.target.value) as UserType)}
                            >
                                <option value="">-- Оберіть роль --</option>
                                <option value={0}>Небайдужий</option>
                                <option value={1}>Власник притулку</option>
                                <option value={2}>Волонтер</option>
                            </select>
                        </div>

                        {userRole !== null && (
                            <>
                                <div className="mb-2">
                                    <label>Електронна адреса</label>
                                    <input className="form-control input-glass" value={email}
                                           onChange={e => setEmail(e.target.value)}/>
                                </div>

                                <div className="mb-2">
                                    <label>Пароль</label>
                                    <input type="password" className="form-control input-glass" value={password}
                                           onChange={e => setPassword(e.target.value)}/>
                                </div>

                                <div className="mb-2" style={{color: "white", fontSize: "0.85rem"}}>
                                    <p style={{marginBottom: "5px", fontWeight: 600}}>Пароль має містити:</p>
                                    <div style={{color: hasUpper ? "#c8ffda" : "#ff4040"}}>• принаймні одну велику
                                        літеру
                                    </div>
                                    <div style={{color: hasDigit ? "#c8ffda" : "#ff4040"}}>• принаймні одну цифру</div>
                                    <div style={{color: hasLength ? "#c8ffda" : "#ff4040"}}>• довжина більше 6
                                        символів
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label>Повне імʼя</label>
                                    <input className="form-control input-glass" value={fullName}
                                           onChange={e => setFullName(e.target.value)}/>
                                </div>

                                <div className="mb-2">
                                    <label>Номер телефону</label>
                                    <input className="form-control input-glass" value={phoneNumber}
                                           onChange={e => setPhoneNumber(e.target.value)}/>
                                </div>

                                <div className="mb-2">
                                    <label>Опис (необовʼязково)</label>
                                    <textarea className="form-control input-glass" value={description}
                                              onChange={e => setDescription(e.target.value)}/>
                                </div>

                                <div className="mb-2">
                                    <label>Фото (необовʼязково)</label>
                                    <input type="file" className="form-control input-glass"
                                           onChange={e => setPhoto(e.target.files?.[0] ?? null)}/>
                                </div>

                                {(userRole === UserType.Volunteer || userRole === UserType.ShelterOwner) && (
                                    <div className="mb-2">
                                        <label>Документи (обовʼязково)</label>
                                        <input type="file" multiple className="form-control input-glass"
                                               onChange={e => setDocuments(Array.from(e.target.files || []))}/>
                                    </div>
                                )}

                                <div className="mb-2">
                                </div>
                            </>
                        )}
                    </>
                )}

                <button
                    className="btn btn-gradient w-100 py-3"
                    onClick={mode === "login" ? handleLogin : handleSignUp}
                >
                    {mode === "login" ? "Увійти" : "Зареєструватись"}
                </button>
            </div>
        </div>
    );
}
