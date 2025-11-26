import React, {useState} from "react";
import ComplaintViewModel from "../ViewModels/ComplaintViewModel";
import {ComplaintCategory} from "../Enums/ComplaintCategory";
import ReactDOM from "react-dom";

interface ComplaintFormProps {
    complainantId: string;
    isOpen: boolean;
    onClose: () => void;
    targetType: "post" | "comment";
    postId?: number;
    commentId?: number;
    reportedUserId?: string;
    onSuccess?: () => void;
}

const complaintLabels: { [key in ComplaintCategory]: string } = {
    [ComplaintCategory.Spam]: "Спам",
    [ComplaintCategory.EnemyLanguage]: "Мова ворога",
    [ComplaintCategory.Evil]: "Жорстокість",
    [ComplaintCategory.Another]: "Інше",
};

const complaintVM = new ComplaintViewModel();

const ComplaintForm: React.FC<ComplaintFormProps> = ({
                                                         complainantId,
                                                         isOpen,
                                                         onClose,
                                                         targetType,
                                                         postId,
                                                         commentId,
                                                         reportedUserId,
                                                         onSuccess
                                                     }) => {

    const [category, setCategory] = useState<ComplaintCategory>(ComplaintCategory.Spam);
    const [description, setDescription] = useState("");

    const handleSend = async () => {
        if (!complainantId) {
            alert("Не вдалося визначити користувача");
            return;
        }

        if (category === ComplaintCategory.Another && description === ""){
            alert("Додайте опис до вашої скарги");
            return;
        }

        try {
            await complaintVM.addComplaint(
                complainantId,
                category,
                reportedUserId || null,
                postId || null,
                commentId || null,
                description || null
            );

            if (onSuccess) onSuccess();
            alert("Complaint added successfully");
            onClose();
        } catch (error) {
            console.error("Помилка створення скарги:", error);
        }
    };

    if (!isOpen) return null;
    return ReactDOM.createPortal(
        (
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
                    paddingBottom: "30px"
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
                        cursor: "pointer"
                    }}
                >
                    &times;
                </button>

                <h2
                    className="text-center mb-3"
                    style={{ color: "rgba(24,67,29,0.85)", fontWeight: "700" }}
                >
                    Скарга на {targetType === "post" ? "пост" : "коментар"}
                </h2>

                <div className="mb-3">
                    <label>Категорія</label>
                    <select
                        className="form-control input-glass"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                    >
                        {Object.values(ComplaintCategory).map((val) => (
                            <option key={val} value={val}>
                                {complaintLabels[val]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label>{category === ComplaintCategory.Another ? "Опис (обов'язково)" : "Опис (необов'язково)" } </label>
                    <textarea
                        className="form-control input-glass"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Опишіть проблему..."
                        rows={4}
                    />
                </div>

                <button
                    onClick={handleSend}
                    className="btn btn-gradient w-100 py-3"
                >
                    Надіслати скаргу
                </button>
            </div>
        </div>
        ),
        document.getElementById("modal-root") as HTMLElement
    );
};

export default ComplaintForm;
