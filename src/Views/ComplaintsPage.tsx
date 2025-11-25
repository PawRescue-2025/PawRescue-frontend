import React, {useEffect, useState} from "react";
import ComplaintViewModel from "../ViewModels/ComplaintViewModel";
import { ComplaintStatus } from "../Enums/ComplaintStatus";
import { ComplaintCategory } from "../Enums/ComplaintCategory";
import UserViewModel from "../ViewModels/UserViewModel";
import PostViewModel from "../ViewModels/PostViewModel";


const postVM = new PostViewModel();
const complaintVM = new ComplaintViewModel();
const userVM = new UserViewModel();

interface Complaint {
    id: number;
    complainantId: string;
    userId?: string | null;
    postId?: number | null;
    commentId?: number | null;
    category: ComplaintCategory;
    description?: string | null;
    status: ComplaintStatus;
    creationDate: string;
}

const categoryLabels: { [key in ComplaintCategory]: string } = {
    [ComplaintCategory.Spam]: "Спам",
    [ComplaintCategory.EnemyLanguage]: "Мова ворога",
    [ComplaintCategory.Evil]: "Жорстокість",
    [ComplaintCategory.Another]: "Інше",
};

const statusLabels: { [key in ComplaintStatus]: string } = {
    [ComplaintStatus.New]: "Активна",
    [ComplaintStatus.Processed]: "Вирішена",
    [ComplaintStatus.Declined]: "Відхилена",
};

const ModeratorComplaintsPage: React.FC = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeCategory, setActiveCategory] = useState<ComplaintCategory | -1>(-1);
    const [activeStatus, setActiveStatus] = useState<ComplaintStatus | -1>(-1);
    const [search, setSearch] = useState("");

    const [hoveredPost, setHoveredPost] = useState<{
        post: any | null;
        x: number;
        y: number;
    } | null>(null);

    const [postCache, setPostCache] = useState<{ [key: number]: any }>({});


    const [hoveredUser, setHoveredUser] = useState<{
        user: any | null;
        x: number;
        y: number;
    } | null>(null);

    const [userCache, setUserCache] = useState<{ [key: string]: any }>({});

    const loadUser = async (userId: string, x: number, y: number) => {
        if (userCache[userId]) {
            setHoveredUser({ user: userCache[userId], x, y });
            return;
        }

        try {
            const user = await userVM.getUserById(userId);
            setUserCache(prev => ({ ...prev, [userId]: user }));
            setHoveredUser({ user, x, y });
        } catch (err) {
            console.error(err);
        }
    };

    const loadPost = async (postId: number, x: number, y: number) => {
        if (postCache[postId]) {
            setHoveredPost({ post: postCache[postId], x, y });
            return;
        }

        try {
            const post = await postVM.getPostById(postId);
            setPostCache(prev => ({ ...prev, [postId]: post }));
            setHoveredPost({ post, x, y });
        } catch (err) {
            console.error(err);
        }
    };

    const fetchComplaints = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await complaintVM.getAllComplaints();
            data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
            setComplaints(data);
        } catch (err: any) {
            setError(err.message || "Помилка при завантаженні скарг");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleChangeStatus = async (id: number, status: ComplaintStatus) => {
        try {
            await complaintVM.editComplaintStatus(id, status);
            fetchComplaints();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Ви дійсно хочете видалити цю скаргу?")) return;
        try {
            await complaintVM.deleteComplaint(id);
            fetchComplaints();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const filteredComplaints = complaints.filter(c => {
        const matchCategory = activeCategory === -1 || c.category === activeCategory;
        const matchStatus = activeStatus === -1 || c.status === activeStatus;
        const matchSearch = !search || (c.description?.toLowerCase().includes(search.toLowerCase()));
        return matchCategory && matchStatus && matchSearch;
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
                .user-tooltip {
                    position: fixed;
                    background: rgba(255,255,255,0.9);
                    backdrop-filter: blur(10px);
                    border-radius: 10px;
                    padding: 0.8rem 1rem;
                    border: 1px solid rgba(0,0,0,0.2);
                    box-shadow: 0 4px 18px rgba(0,0,0,0.15);
                    z-index: 9999;
                    min-width: 200px;
                    transition: opacity 0.15s ease;
                }

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

                .complaint-card {
                    background: rgba(255, 255, 255, 0.25);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 15px;
                    padding: 1rem 1.5rem;
                    margin-bottom: 1rem;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    width: 100%;
                }

                .complaint-card:hover {
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

                .btn-gradient {
                    border-radius: 12px;
                    border: none;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.3s;
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
                <h1 style={{textAlign: "center", marginBottom: "2rem"}}>Скарги</h1>

                {error && <div style={{color: "red", marginBottom: "1rem"}}>{error}</div>}

                <div className="tab-bar">
                    <button
                        className={`tab-button ${activeCategory === -1 ? "active" : ""}`}
                        onClick={() => setActiveCategory(-1)}
                    >
                        Всі категорії
                    </button>
                    {Object.values(ComplaintCategory).filter(v => typeof v === "string").map(c => (
                        <button
                            key={c}
                            className={`tab-button ${activeCategory === c ? "active" : ""}`}
                            onClick={() => setActiveCategory(c as ComplaintCategory)}
                        >
                            {categoryLabels[c as ComplaintCategory]}
                        </button>
                    ))}
                </div>

                <div className="tab-bar">
                    <button
                        className={`tab-button ${activeStatus === -1 ? "active" : ""}`}
                        onClick={() => setActiveStatus(-1)}
                    >
                        Всі статуси
                    </button>
                    {Object.values(ComplaintStatus).filter(v => typeof v === "number").map(s => (
                        <button
                            key={s}
                            className={`tab-button ${activeStatus === s ? "active" : ""}`}
                            onClick={() => setActiveStatus(s as ComplaintStatus)}
                        >
                            {statusLabels[s as ComplaintStatus]}
                        </button>
                    ))}
                </div>

                <div style={{position: "absolute", top: "1.5rem", right: "1.5rem"}}>
                    <div style={{position: "relative"}}>
                        <input
                            className="form-control search-input"
                            placeholder="Пошук..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#666"
                        }}>
                🔍
            </span>
                    </div>
                </div>

                {loading ? <p>Завантаження...</p> : (
                    filteredComplaints.map(c => (
                        <div key={c.id} className="complaint-card" style={{position: "relative"}}>
                            <button
                                onClick={() => handleDelete(c.id)}
                                style={{
                                    position: "absolute",
                                    top: "-10px",
                                    right: "5px",
                                    background: "transparent",
                                    border: "none",
                                    color: "red",
                                    fontSize: "2.5rem",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }}
                                title="Видалити скаргу"
                            >
                                ×
                            </button>

                            <p><b>Скарга ID:</b> {c.id}</p>
                            {c.complainantId && (
                                <p>
                                    <b>Коментатор:</b>{" "}
                                    <span
                                        style={{textDecoration: "underline", cursor: "pointer", color: "#0645ad"}}
                                        onMouseEnter={(e) => loadUser(c.complainantId!, e.clientX, e.clientY)}
                                        onMouseMove={(e) => setHoveredUser(prev => prev ? {
                                            ...prev,
                                            x: e.clientX,
                                            y: e.clientY
                                        } : prev)}
                                        onMouseLeave={() => setHoveredUser(null)}
                                    >
                                    {c.complainantId}
                                     </span>
                                </p>
                            )}
                            {c.userId && (
                                <p>
                                    <b>Користувач:</b>{" "}
                                    <span
                                        style={{textDecoration: "underline", cursor: "pointer", color: "#0645ad"}}
                                        onMouseEnter={(e) => loadUser(c.userId!, e.clientX, e.clientY)}
                                        onMouseMove={(e) => setHoveredUser(prev => prev ? {
                                            ...prev,
                                            x: e.clientX,
                                            y: e.clientY
                                        } : prev)}
                                        onMouseLeave={() => setHoveredUser(null)}
                                    >
                                    {c.userId}
                                     </span>
                                </p>
                            )}
                            {c.postId && (
                                <p>
                                    <b>Пост:</b>{" "}
                                    <span
                                        style={{textDecoration: "underline", cursor: "pointer", color: "#0645ad"}}
                                        onMouseEnter={(e) => loadPost(c.postId!, e.clientX, e.clientY)}
                                        onMouseMove={(e) =>
                                            setHoveredPost(prev => prev ? {...prev, x: e.clientX, y: e.clientY} : prev)
                                        }
                                        onMouseLeave={() => setHoveredPost(null)}
                                    >
                                {c.postId}
                                    </span>
                                </p>
                            )}

                            {c.commentId && <p><b>Коментар:</b> {c.commentId}</p>}
                            <p><b>Категорія:</b> {categoryLabels[c.category]}</p>
                            {c.description && <p><b>Опис:</b> {c.description}</p>}
                            <p><b>Статус:</b> {statusLabels[c.status]}</p>
                            <p><small>Створено: {new Date(c.creationDate).toLocaleString()}</small></p>

                            <div style={{marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap"}}>
                                {Object.values(ComplaintStatus).filter(v => typeof v === "number").map(s => (
                                    <button
                                        key={s}
                                        onClick={() => handleChangeStatus(c.id, s as ComplaintStatus)}
                                        className="btn-status"
                                        style={{
                                            background: s === c.status ? "#4caf50" : "#eee",
                                            color: s === c.status ? "white" : "black",
                                        }}
                                    >
                                        {statusLabels[s as ComplaintStatus]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
            {hoveredUser && hoveredUser.user && (
                <div
                    className="user-tooltip"
                    style={{top: hoveredUser.y + 10, left: hoveredUser.x + 10}}
                >
                    <div><b>ID:</b> {hoveredUser.user.id}</div>
                    <div><b>Ім'я:</b> {hoveredUser.user.fullName}</div>
                    <div><b>Email:</b> {hoveredUser.user.email}</div>
                </div>
            )}

            {hoveredPost && hoveredPost.post && (
                <div
                    className="user-tooltip"
                    style={{ top: hoveredPost.y + 10, left: hoveredPost.x + 10 }}
                >
                    <div><b>ID Поста:</b> {hoveredPost.post.id}</div>
                    <div><b>Автор:</b> {hoveredPost.post.userId}</div>
                    <div><b>Текст:</b> {hoveredPost.post.content.slice(0, 120)}...</div>
                    {hoveredPost.post.imageUrl && (
                        <img
                            src={hoveredPost.post.imageUrl}
                            alt="preview"
                            style={{ width: "100%", borderRadius: 8, marginTop: 6 }}
                        />
                    )}
                </div>
            )}

        </div>
    );
};

export default ModeratorComplaintsPage;
