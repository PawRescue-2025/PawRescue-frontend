import React, { useEffect, useState } from "react";
import UsefulLinkViewModel from "../ViewModels/UsefulLinkViewModel";
import UserViewModel from "../ViewModels/UserViewModel";

const linkVM = new UsefulLinkViewModel();
const userVM = new UserViewModel();

interface UsefulLink {
    id: number;
    type: string;
    title: string;
    content: string;
}

const UsefulLinksPage: React.FC = () => {
    const [links, setLinks] = useState<UsefulLink[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedTypes, setExpandedTypes] = useState<{ [key: string]: boolean }>({});

    const [editLink, setEditLink] = useState<UsefulLink | null>(null);
    const [newLink, setNewLink] = useState<{ type: string; title: string; content: string }>({
        type: "",
        title: "",
        content: "",
    });

    const [role, setRole] = useState("");
    const neededRole = "admin2@test.co"


    const fetchLinks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await linkVM.getAllUsefulLinks();
            setLinks(data);
        } catch (err: any) {
            setError(err.message || "Помилка при завантаженні");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
        fetchRole();
    }, []);

    const toggleType = (type: string) => {
        setExpandedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    //TODO: замінити імеіл на роль
    const fetchRole = async () => {
        setLoading(true);
        setError(null);
        try {
            let userId = localStorage.getItem("userId");
            // @ts-ignore
            const data = await userVM.getUserById(userId);
            setRole(data.email)

        } catch (err: any) {
            setError(err.message || "Помилка при завантаженні");
        } finally {
            setLoading(false);
        }
    };


    const handleAddOrEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editLink) {
                await linkVM.editUsefulLink(editLink.id, newLink.title, newLink.content);
                setEditLink(null);
            } else {
                await linkVM.addUsefulLink(newLink.type, newLink.title, newLink.content);
            }
            setNewLink({ type: "", title: "", content: "" });
            fetchLinks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await linkVM.deleteUsefulLink(id);
            fetchLinks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const groupedLinks = links.reduce((acc: { [key: string]: UsefulLink[] }, link) => {
        if (!acc[link.type]) acc[link.type] = [];
        acc[link.type].push(link);
        return acc;
    }, {});

    return (
        <div
            className="d-flex justify-content-center align-items-start py-5"
            style={{
                minHeight: "100vh",
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
                    margin-right: 4vw;
                    border-radius: 30px;
                    width: 90vw;
                    height: 90vh;
                }

                .link-type-header {
                    font-weight: 700;
                    font-size: 1.2rem;
                    cursor: pointer;
                    color: #0c3e2d;
                    margin-bottom: 0.5rem;
                    transition: all 0.3s ease;
                }

                .link-type-header:hover {
                    color: #3fb573;
                }

                .link-card {
                    background: rgba(255, 255, 255, 0.25);
                    border: 1px solid rgba(255,255,255,0.4);
                    border-radius: 15px;
                    padding: 1rem;
                    margin-bottom: 0.75rem;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                    transition: all 0.3s ease;
                    position: relative;
                }

                .link-card:hover {
                    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
                }

                h2, p {
                    color: #0c3e2d;
                }

                .link-actions {
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    display: flex;
                    gap: 0.5rem;
                }

                .btn-small {
                    background: rgba(12, 95, 61, 0.6);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    padding: 0.3rem 0.6rem;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-small:hover {
                    background: linear-gradient(135deg, #3fb573 0%, #52d98d 50%, #6effa7 100%);
                }

                form input, form textarea, form select {
                    margin-bottom: 0.75rem;
                }

                form button {
                    margin-top: 0.5rem;
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

            <div className="glass-card">
                <h1 className="text-center mb-4">Корисні посилання</h1>

                {error && <div className="text-red-500 mb-4">{error}</div>}


                //TODO: замінити імеіл на роль
                {role === neededRole &&
                <form onSubmit={handleAddOrEdit} className="mb-4">
                    <input
                        className="form-control input-glass"
                        placeholder="Тип посилання"
                        value={newLink.type}
                        onChange={(e) => setNewLink({...newLink, type: e.target.value})}
                        required
                    />
                    <input
                        className="form-control input-glass"
                        placeholder="Заголовок"
                        value={newLink.title}
                        onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                        required
                    />
                    <textarea
                        className="form-control input-glass"
                        placeholder="Контент"
                        value={newLink.content}
                        onChange={(e) => setNewLink({...newLink, content: e.target.value})}
                        required
                    />
                    <button type="submit" className="btn btn-gradient w-100 py-2">
                        {editLink ? "Зберегти зміни" : "Додати посилання"}
                    </button>
                </form>
                }


                {loading ? (
                    <p className="mt-3">Завантаження...</p>
                ) : (
                    Object.keys(groupedLinks).map((type) => (
                        <div key={type} className="mt-4">
                            <div
                                className="d-flex align-items-center link-type-header"
                                onClick={() => toggleType(type)}
                            >
                                <span style={{marginRight: "0.5rem"}}>
                                    {expandedTypes[type] ? "▼" : "►"}
                                </span>
                                {type}
                            </div>

                            {expandedTypes[type] &&
                                groupedLinks[type].map((link) => (
                                    <div key={link.id} className="link-card">
                                        <h3 className="font-semibold">{link.title}</h3>
                                        <p>{link.content}</p>
                                        {role === neededRole &&
                                        <div className="link-actions">
                                            <button
                                                className="btn-small"
                                                onClick={() => {
                                                    setEditLink(link);
                                                    setNewLink({
                                                        type: link.type,
                                                        title: link.title,
                                                        content: link.content,
                                                    });
                                                }}
                                            >
                                                Редагувати
                                            </button>
                                            <button
                                                className="btn-small"
                                                onClick={() => handleDelete(link.id)}
                                            >
                                                Видалити
                                            </button>
                                        </div>
                                        }
                                    </div>
                                ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UsefulLinksPage;
