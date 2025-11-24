import React, { useState } from "react";
import ShelterViewModel from "../ViewModels/ShelterViewModel";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddShelterPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const ownerId = location.state?.userId;

    const shelterVM = new ShelterViewModel();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [locationText, setLocationText] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactLink, setContactLink] = useState("");

    const handleAddShelter = async () => {
        if (!name || !description || !locationText) {
            alert("Будь ласка, заповніть основні поля.");
            return;
        }

        if (!contactPhone && !contactEmail && !contactLink) {
            alert("Потрібно заповнити хоча б один із контактів.");
            return;
        }

        try {
            const result = await shelterVM.addShelter(
                ownerId,
                name,
                description,
                locationText,
                contactPhone,
                contactEmail,
                contactLink
            );

            console.log("Shelter created:", result);
            alert("Притулок успішно створено!");

            navigate("/main");
        } catch (error: any) {
            console.error(error);
            alert(error?.message || "Помилка створення притулку");
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

            <div
                className="glass-card p-4"
                style={{
                    width: "650px",
                    borderRadius: "30px",
                }}
            >
                <h2
                    className="text-center mb-3"
                    style={{color: "rgba(24,67,29,0.85)", fontWeight: "700"}}
                >
                    Додати притулок
                </h2>

                <p
                    className="text-center mb-4"
                    style={{
                        color: "rgba(24,67,29,0.85)",
                        fontSize: "0.9rem",
                    }}
                >
                    Заповніть інформацію, щоб створити ваш притулок
                </p>

                <div className="mb-3">
                    <label>Назва притулку</label>
                    <input
                        className="form-control input-glass"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Назва"
                    />
                </div>

                <div className="mb-3">
                    <label>Опис</label>
                    <textarea
                        className="form-control input-glass"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Короткий опис притулку"
                        rows={3}
                    />
                </div>

                <div className="mb-3">
                    <label>Локація</label>
                    <input
                        className="form-control input-glass"
                        value={locationText}
                        onChange={e => setLocationText(e.target.value)}
                        placeholder="Місто, адреса..."
                    />
                </div>

                <h5
                    className="mt-4 mb-2"
                    style={{color: "rgba(24,67,29,0.85)", fontWeight: "700"}}
                >
                    Контактна інформація
                </h5>

                <p style={{color: "rgba(24,67,29,0.85)", fontSize: "0.85rem"}}>
                    Необхідно заповнити хоча б одне поле
                </p>

                <div className="mb-3">
                    <label>Телефон</label>
                    <input
                        className="form-control input-glass"
                        value={contactPhone}
                        onChange={e => setContactPhone(e.target.value)}
                        placeholder="+380..."
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        className="form-control input-glass"
                        value={contactEmail}
                        onChange={e => setContactEmail(e.target.value)}
                        placeholder="email@example.com"
                    />
                </div>

                <div className="mb-4">
                    <label>Посилання (Instagram, Facebook, сайт)</label>
                    <input
                        className="form-control input-glass"
                        value={contactLink}
                        onChange={e => setContactLink(e.target.value)}
                        placeholder="https://..."
                    />
                </div>

                <button className="btn btn-gradient w-100 py-3" onClick={handleAddShelter}>
                    Створити притулок
                </button>
            </div>
        </div>
    );
}
