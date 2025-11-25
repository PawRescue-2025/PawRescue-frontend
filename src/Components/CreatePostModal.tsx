import React, {useState} from "react";
import {PostType} from "../Enums/PostType";
import PostViewModel from "../ViewModels/PostViewModel";

const postVM = new PostViewModel();

interface NewPostData {
    type: PostType | "";
    title: string;
    content: string;
    photos: File[];
    eventDate: string;
    location: string;
    contactPhone: string;
    contactEmail: string;
    contactLink: string;
}
interface CreatePostModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: () => void
}

const postTypeLabels: { [key in PostType]: string } = {
    [PostType.Lost]: "Зниклі",
    [PostType.Found]: "Знайдені",
    [PostType.FinancialHelp]: "Фінансова допомога",
    [PostType.MaterialHelp]: "Матеріальна допомога",
    [PostType.VolunteerHelp]: "Волонтерська допомога",
    [PostType.Adoption]: "Усиновлення",
    [PostType.Fostering]: "Опіка",
    [PostType.Useful]: "Корисні посилання",
    [PostType.Story]: "Історії",
    [PostType.Event]: "Події",
};
const CreatePostModal: React.FC<CreatePostModalProps> = ({ show, onClose, onSubmit}) => {
    const [newPost, setNewPost] = useState<NewPostData>({
        type: "",
        title: "",
        content: "",
        photos: [],
        eventDate: "",
        location: "",
        contactPhone: "",
        contactEmail: "",
        contactLink: "",
    });

    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddPost(e)
    };

    const handleAddPost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("userId")!;
            await postVM.addPost(
                userId,
                newPost.type as PostType,
                newPost.title,
                newPost.content,
                newPost.photos,
                new Date(newPost.eventDate),
                newPost.contactPhone,
                newPost.contactEmail,
                newPost.contactLink,
                newPost.location
            );
            setNewPost({
                type: "",
                title: "",
                content: "",
                photos: [],
                eventDate: "",
                contactPhone: "",
                contactEmail: "",
                contactLink: "",
                location: ""
            });
            onClose()
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
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
                    width: "550px",
                    maxHeight: "95vh",
                    overflowY: "auto",
                    borderRadius: "30px",
                    position: "relative"
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

                <h2 className="text-center mb-3" style={{color: "rgba(24,67,29,0.85)", fontWeight: "700"}}>
                    Створення поста
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Тип поста</label>
                        <select
                            className="form-control input-glass"
                            value={newPost.type}
                            onChange={(e) => setNewPost({...newPost, type: Number(e.target.value) as PostType})}
                            required
                        >
                            <option value="">Оберіть тип</option>
                            {Object.values(PostType)
                                .filter(v => typeof v === "number")
                                .map(pt => (
                                    <option key={pt} value={pt}>{postTypeLabels[pt as PostType]}</option>
                                ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Заголовок</label>
                        <input
                            className="form-control input-glass"
                            value={newPost.title}
                            onChange={e => setNewPost({...newPost, title: e.target.value})}
                            placeholder="Заголовок"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Контент</label>
                        <textarea
                            className="form-control input-glass"
                            value={newPost.content}
                            onChange={e => setNewPost({...newPost, content: e.target.value})}
                            placeholder="Напишіть текст..."
                            rows={3}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Фотографії</label>
                        <input
                            type="file"
                            multiple
                            className="form-control input-glass"
                            onChange={(e) =>
                                setNewPost({
                                    ...newPost,
                                    photos: e.target.files ? Array.from(e.target.files) : []
                                })
                            }
                        />
                    </div>

                    { newPost.type !== "" && (newPost.type === PostType.Event || newPost.type === PostType.VolunteerHelp) &&
                    <div className="mb-3">
                        <label>Дата події</label>
                        <input
                            type="datetime-local"
                            className="form-control input-glass black-font"
                            value={newPost.eventDate}
                            onChange={e => setNewPost({...newPost, eventDate: e.target.value})}
                        />
                    </div>
                    }

                    { newPost.type !== "" && !(newPost.type === PostType.Story || newPost.type === PostType.Useful) &&

                        <div className="mb-3">
                        <label>Локація</label>
                        <input
                            className="form-control input-glass"
                            value={newPost.location}
                            onChange={e => setNewPost({...newPost, location: e.target.value})}
                            placeholder="Місто, адреса…"
                        />
                    </div>
                    }

                    { newPost.type !== "" && !(newPost.type === PostType.Story || newPost.type === PostType.Useful) &&
                        <div >
                            <h5 className="mt-4 mb-2" style={{color: "rgba(24,67,29,0.85)", fontWeight: "700"}}>
                                Контактна інформація
                            </h5>

                            <div className="mb-3">
                                <label>Телефон</label>
                                <input
                                    className="form-control input-glass"
                                    value={newPost.contactPhone}
                                    onChange={e => setNewPost({...newPost, contactPhone: e.target.value})}
                                    placeholder="+380..."
                                />
                            </div>

                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    className="form-control input-glass"
                                    value={newPost.contactEmail}
                                    onChange={e => setNewPost({...newPost, contactEmail: e.target.value})}
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div className="mb-4">
                                <label>Посилання</label>
                                <input
                                    className="form-control input-glass"
                                    value={newPost.contactLink}
                                    onChange={e => setNewPost({...newPost, contactLink: e.target.value})}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    }

                    <button type="submit" className="btn btn-gradient w-100 py-3">
                        Додати пост
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;
