import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationViewModel from "../ViewModels/VerificationViewModel";
import { VerificationStatus } from "../Enums/VerificationStatus";

const verificationVM = new VerificationViewModel();

interface Verification {
    id: number;
    userId: string;
    documents: string[];
    status: VerificationStatus;
    creationDate: string;
}

const statusLabels: { [key in VerificationStatus]: string } = {
    [VerificationStatus.NotVerified]: "Не верифіковано",
    [VerificationStatus.Pending]: "В роботі",
    [VerificationStatus.Verified]: "Підтверджено",
    [VerificationStatus.Declined]: "Відхилено",
};

const ModeratorVerificationsPage: React.FC = () => {
    const navigate = useNavigate();
    const [verifications, setVerifications] = useState<Verification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeStatus, setActiveStatus] = useState<VerificationStatus | -1>(-1);
    const [popupDocs, setPopupDocs] = useState<string[] | null>(null); // для popup

    const fetchVerifications = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await verificationVM.getAllVerifications();
            data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
            setVerifications(data);
            console.log(data)
        } catch (err: any) {
            setError(err.message || "Помилка при завантаженні запитів на верифікацію");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVerifications();
    }, []);

    const handleChangeStatus = async (id: number, status: VerificationStatus) => {
        try {
            await verificationVM.editVerificationStatus(id, status);
            fetchVerifications();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const filteredVerifications = verifications.filter(v => {
        const matchStatus = activeStatus === -1 || v.status === activeStatus;
        return matchStatus;
    });

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #a8e9d3 0%, #76c9a7 50%)",
                padding: "2rem",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <style>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(25px);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    border-radius: 20px;
                    padding: 2rem;
                    width: 90vw;
                    max-width: 1000px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    min-height: 85vh;
                    margin-top: 50px;
                }

                .verification-card {
                    background: rgba(255, 255, 255, 0.25);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 15px;
                    padding: 1rem 1.5rem;
                    margin-bottom: 1rem;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    width: 100%;
                }

                .verification-card:hover {
                    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                }

                .tab-bar {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                }

                .tab-button {
                    padding: 0.5rem 1rem;
                    border-radius: 12px;
                    border: none;
                    cursor: pointer;
                    font-weight: 600;
                    transition: 0.3s;
                }

                .tab-button.active {
                    background: rgba(12, 95, 61, 0.7);
                    color: white;
                    box-shadow: 0 8px 20px rgba(45, 134, 89, 0.4);
                }

                .tab-button:not(.active) {
                    background: rgba(255,255,255,0.3);
                    color: #333;
                }

                .tab-button:hover:not(.active) {
                    background: rgba(255,255,255,0.5);
                }

                .btn-status {
                    padding: 0.3rem 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: 0.3s;
                }

                .btn-status:hover {
                    opacity: 0.8;
                }

                .btn-doc {
                    padding: 0.3rem 0.5rem;
                    border: 1px solid #555;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    background: #eee;
                    transition: 0.3s;
                }

                .btn-doc:hover {
                    background: #ddd;
                }

                .search-input {
                    padding-right: 2rem;
                    background: rgba(255, 255, 255, 0.25);
                    border: 1px solid rgba(255,255,255,0.4);
                    color: #000;
                    border-radius: 12px;
                    width: 200px;
                    transition: all 0.3s ease;
                }
                .search-input::placeholder {
                    color: rgba(0,0,0,0.5);
                }
                .search-input:focus {
                    background: rgba(255, 255, 255, 0.35);
                    outline: none;
                    box-shadow: 0 0 8px rgba(0,0,0,0.1);
                }
            `}</style>

            <div className="glass-card">
                <h1 style={{textAlign: "center", marginBottom: "2rem"}}>Верифікації</h1>

                {error && <div style={{color: "red", marginBottom: "1rem"}}>{error}</div>}

                <div className="tab-bar">
                    <button
                        className={`tab-button ${activeStatus === -1 ? "active" : ""}`}
                        onClick={() => setActiveStatus(-1)}
                    >
                        Всі статуси
                    </button>
                    {Object.values(VerificationStatus)
                        .filter(v => typeof v === "number")
                        .map(s => (
                            <button
                                key={s}
                                className={`tab-button ${activeStatus === s ? "active" : ""}`}
                                onClick={() => setActiveStatus(s as VerificationStatus)}
                            >
                                {statusLabels[s as VerificationStatus]}
                            </button>
                        ))}

                </div>

                {loading ? <p>Завантаження...</p> : (
                    filteredVerifications.map(v => (
                        <div key={v.id} className="verification-card">
                            <p><b>Запит №:</b> {v.id}</p>
                            <p>
                                <b>Користувач:</b>{" "}
                                <span
                                    style={{textDecoration: "underline", cursor: "pointer", color: "#0645ad"}}
                                    onClick={() => navigate(`/profile/${v.userId}`)}
                                >
                                    {v.userId}
                                </span>
                            </p>
                            <p>
                                <button className="tab-button active" onClick={() => setPopupDocs(v.documents)}>Переглянути документи</button>
                            </p>

                            <div style={{marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap"}}>
                                {Object.values(VerificationStatus)
                                    .filter(v => typeof v === "number")
                                    .map(s => (
                                        <button
                                            key={s}
                                            onClick={() => handleChangeStatus(v.id, s as VerificationStatus)}
                                            className="btn-status"
                                            style={{
                                                background: s === v.status ? "#4caf50" : "#eee",
                                                color: s === v.status ? "white" : "black",
                                            }}
                                        >
                                            {statusLabels[s as VerificationStatus]}
                                        </button>
                                    ))}
                            </div>

                        </div>
                    ))
                )}
            </div>

            {popupDocs && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.45)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 99999
                    }}
                    onClick={() => setPopupDocs(null)}
                >
                    <div
                        style={{
                            background: "rgb(160,214,160)",
                            borderRadius: "20px",
                            padding: "2rem",
                            width: "60%",
                            maxHeight: "80vh",
                            overflowY: "auto",
                            position: "relative",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPopupDocs(null)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "15px",
                                border: "none",
                                background: "transparent",
                                fontSize: "2rem",
                                cursor: "pointer",
                                color: "#444",
                            }}
                        >
                            ×
                        </button>

                        <h2>Документи</h2>
                        <ul>
                            {popupDocs.map((doc, idx) => (
                                <li key={idx} style={{margin: "0.5rem 0"}}>
                                    <a href={doc} target="_blank" rel="noopener noreferrer" style={{color: "#0645ad", textDecoration: "underline"}}>
                                        Документ {idx + 1}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModeratorVerificationsPage;
