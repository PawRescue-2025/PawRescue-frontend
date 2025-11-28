import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UserViewModel from "../ViewModels/UserViewModel";

const userVM = new UserViewModel();

interface Props {
    show: boolean;
    onClose: () => void;
    onSaved: () => void;
    user: any;
}

const EditUserForm: React.FC<Props> = ({ show, onClose, user, onSaved }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
            setFullName(user.fullName || "");
            setPhoneNumber(user.phoneNumber || "");
            setDescription(user.description || "");
        }
    }, [user]);

    const handleSave = async () => {
        await userVM.editUser(
            user.id,
            email,
            password || "",
            fullName,
            phoneNumber,
            photo,
            description
        );
        onSaved();
        onClose();
    };

    if (!show) return null;

    return ReactDOM.createPortal(
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.45)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
            onClick={onClose}
        >
            <style>{`
                .glass-form {
                    background: linear-gradient(135deg, #a8e9d3 0%, #76c9a7 50%);
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
                    border-radius: 30px;
                }
                .input-glass {
                    background: rgba(255, 255, 255, 0.25) !important;
                    border: 1px solid rgba(255, 255, 255, 0.4) !important;
                    color: #0c3e2d !important;
                    transition: 0.3s ease;
                }
                .input-glass::placeholder {
                    color: rgba(12, 62, 45, 0.6) !important;
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
            `}</style>

            <div
                className="glass-form p-4"
                style={{
                    width: "500px",
                    maxWidth: "90%",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "30px",
                    position: "relative",
                    paddingBottom: "30px",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "transparent",
                        border: "none",
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        color: "#0c3e2d",
                        cursor: "pointer",
                    }}
                >
                    &times;
                </button>

                <h2
                    className="text-center mb-3"
                    style={{ color: "rgba(24,67,29,0.85)", fontWeight: "700" }}
                >
                    Редагувати профіль
                </h2>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        className="form-control input-glass"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Пароль (новий)</label>
                    <input
                        type="password"
                        className="form-control input-glass"
                        placeholder="Залиште порожнім щоб не змінювати"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>ПІБ</label>
                    <input
                        className="form-control input-glass"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Телефон</label>
                    <input
                        className="form-control input-glass"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Опис</label>
                    <textarea
                        className="form-control input-glass"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Фото</label>
                    <input
                        type="file"
                        className="form-control input-glass"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                    />
                </div>

                <button
                    className="btn btn-gradient w-100 py-3"
                    onClick={handleSave}
                >
                    Зберегти
                </button>
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default EditUserForm;
