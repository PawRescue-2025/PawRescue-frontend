import React, { useState } from "react";
import ReactDOM from "react-dom";

interface ReportViewFormProps {
    show: boolean;
    onClose: () => void;
    report: {
        text: string;
        photos?: string[];
        documents?: string[];
    };
}

const ReportViewForm: React.FC<ReportViewFormProps> = ({ show, onClose, report }) => {
    const [activePhoto, setActivePhoto] = useState<string | null>(null);

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
                zIndex: 9999
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

                a {
                    color: #000000;
                    text-decoration: underline;
                }
            `}</style>

            <div
                className="glass-form p-4"
                style={{
                    width: "500px",
                    maxWidth: "90%",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    position: "relative",
                    borderRadius: "30px"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
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
                        cursor: "pointer"
                    }}
                >
                    &times;
                </button>

                <h2
                    className="text-center mb-3"
                    style={{ color: "rgba(24,67,29,0.88)", fontWeight: "700" }}
                >
                    Перегляд звіту
                </h2>

                {report.text && (
                    <div className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
                        <strong>Текст звіту:</strong>
                        <p>{report.text}</p>
                    </div>
                )}

                {report.photos && report.photos.length > 0 && (
                    <div className="mb-3">
                        <strong>Фото:</strong>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                            {report.photos.map((photo, idx) => (
                                <img
                                    key={idx}
                                    src={photo}
                                    alt={`report_photo_${idx}`}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        border: "1px solid rgba(255,255,255,0.5)",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => setActivePhoto(photo)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {report.documents && report.documents.length > 0 && (
                    <div className="mb-3">
                        <strong>Документи:</strong>
                        <ul style={{ marginTop: "6px" }}>
                            {report.documents.map((doc, idx) => (
                                <li key={idx} style={{ marginBottom: "6px" }}>
                                    <a href={doc} target="_blank" rel="noreferrer">
                                        {doc.split("/").pop()}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Photo Lightbox */}
                {activePhoto && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0,0,0,0.85)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 10000,
                            cursor: "pointer"
                        }}
                        onClick={() => setActivePhoto(null)}
                    >
                        <img
                            src={activePhoto}
                            alt="active_report_photo"
                            style={{
                                maxWidth: "90%",
                                maxHeight: "90%",
                                borderRadius: "12px",
                                boxShadow: "0 0 20px rgba(0,0,0,0.5)"
                            }}
                        />
                    </div>
                )}
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default ReportViewForm;
