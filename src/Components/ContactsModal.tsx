import React from "react";
import ReactDOM from "react-dom";

interface ContactsModalProps {
    show: boolean;
    onClose: () => void;
    ownerName: string;
    location: string;
    phone?: string;
    email?: string;
    link?: string;
}

const ContactsModal: React.FC<ContactsModalProps> = ({
                                                         show,
                                                         onClose,
                                                         ownerName,
                                                         location,
                                                         phone,
                                                         email,
                                                         link
                                                     }) => {

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
            `}</style>

            <div
                className="glass-form p-4"
                style={{
                    width: "420px",
                    maxWidth: "90%",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    position: "relative",
                    borderRadius: "30px"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* close button */}
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
                    Контакти притулку
                </h2>

                <p><b>Власник:</b> {ownerName}</p>
                <p><b>Локація:</b> {location}</p>

                {phone && <p><b>Телефон:</b> {phone}</p>}
                {email && <p><b>Email:</b> {email}</p>}
                {link && (
                    <p>
                        <b>Посилання:</b>{" "}
                        <a href={link} target="_blank" rel="noreferrer">{link}</a>
                    </p>
                )}
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default ContactsModal;
