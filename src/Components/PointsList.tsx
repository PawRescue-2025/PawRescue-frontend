import React from "react";
import ReactDOM from "react-dom";

interface Props {
    show: boolean;
    onClose: () => void;
    reviews: any[];
}

const ReviewsList: React.FC<Props> = ({ show, onClose, reviews }) => {
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
                .list-item-glass {
                    background: rgba(255, 255, 255, 0.25);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 15px;
                    padding: 12px 15px;
                    margin-bottom: 10px;
                    transition: 0.3s ease;
                }
                .list-item-glass:hover {
                    background: rgba(255, 255, 255, 0.35);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
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
                    width: "600px",
                    maxWidth: "95%",
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
                    Відгуки
                </h2>

                {reviews.length === 0 ? (
                    <p className="text-muted text-center">Немає відгуків</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {reviews.map((r) => (
                            <li key={r.id} className="list-item-glass">
                                <div className="d-flex justify-content-between">
                                    <strong>{r.reviewerFullName || "Користувач"}</strong>
                                    <span>🐾 {r.points}</span>
                                </div>
                                <p className="mt-2 mb-1">{r.comment}</p>
                                <small className="text-muted">
                                    {new Date(r.reviewDate).toLocaleString()}
                                </small>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    className="btn btn-gradient w-100 py-3 mt-3"
                    onClick={onClose}
                >
                    Закрити
                </button>
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default ReviewsList;
