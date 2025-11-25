import React, { useEffect, useState } from "react";
import PostViewModel from "../ViewModels/PostViewModel";
import { PostType } from "../Enums/PostType";
import UserViewModel from "../ViewModels/UserViewModel";
import { DEFAULT_PROFILE_PICTURE_URL } from "../config/constants";


const userVM = new UserViewModel();
const postVM = new PostViewModel();

interface Post {
    id: number;
    postType: PostType;
    title: string;
    content: string;
    creationDate: string;
    eventDate: string;
    location?: string;
    contactPhone?: string;
    contactEmail?: string;
    contactLink?: string;
    photos?: string[];
    userId: string;
    author?: {
        fullName: string;
        profileImage: string | null;
    };
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

const MainPostsPage: React.FC = () => {
    const POSTS_PER_PAGE = 20;
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newPost, setNewPost] = useState<{
        type: PostType | "";
        title: string;
        content: string;
        photos: File[];
        eventDate: string;
        contactPhone: string;
        contactEmail: string;
        contactLink: string;
        location: string;
    }>({
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
    const [showNewPostForm, setShowNewPostForm] = useState(false);


    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<PostType | "">("");

    const [activePhotoIndex, setActivePhotoIndex] = useState(0);

    const nextPhoto = (photos: string[]) => {
        setActivePhotoIndex(prev => (prev + 1) % photos.length);
    };

    const prevPhoto = (photos: string[]) => {
        setActivePhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
    };


    const fetchPosts = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await postVM.getAllPosts(page, 10);

            const postsWithAuthors = await Promise.all(
                data.map(async (post: any) => {
                    try {
                        const user = await userVM.getUserById(post.userId);

                        return {
                            ...post,
                            author: {
                                fullName: user.fullName,
                                profileImage: user.profileImageUrl || null,
                            }
                        };
                    } catch {
                        return {
                            ...post,
                            author: {
                                fullName: "Невідомий користувач",
                                profileImage: null
                            }
                        };
                    }
                })
            );

            setPosts(postsWithAuthors);
            console.log(postsWithAuthors)

        } catch (err: any) {
            setError(err.message || "Помилка при завантаженні постів");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchPosts();
    }, [page]);

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
            setShowNewPostForm(false);
            fetchPosts();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const filteredPosts = posts
        .filter(p => filterType === "" || p.postType === filterType)
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase()))
        // .sort((a, b) => sortDesc ? new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime() : new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (page - 1) * POSTS_PER_PAGE,
        page * POSTS_PER_PAGE
    );


    return (
        <div
            className="d-flex justify-content-center align-items-center py-5"
            style={{ minHeight: "100vh", background: "linear-gradient(135deg, #a8e9d3 0%, #76c9a7 50%)" }}
        >
            <style>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(25px);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    border-radius: 20px;
                    padding: 2rem;
                    width: 90vw;
                }

                .post-cards {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }

                .post-card {
                    background: rgba(255, 255, 255, 0.25);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 15px;
                    padding: 1rem 1.5rem;
                    margin-bottom: 1rem;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    width: 60%;
                }

                .post-card:hover {
                    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                }


                .post-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .post-type {
                    font-size: 0.85rem;
                    font-weight: 600;
                    padding: 0.2rem 0.5rem;
                    border-radius: 8px;
                    background: rgba(63, 181, 115, 0.2);
                    color: #0c3e2d;
                }

                .filter-panel {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                }

                .form-control, .btn {
                    border-radius: 12px;
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
                    transform: translateY(-2px);
                    box-shadow: 0 12px 25px rgba(45, 134, 89, 0.5);
                    background: linear-gradient(135deg, #3fb573 0%, #52d98d 50%, #6effa7 100%);
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
                
                .report-btn {
                    position: relative;
                    bottom: 10px;
                    left: 97%;
                    margin-bottom: -50%;
                    font-size: 1.5rem;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                }

            `}</style>

            <div className="glass-card">
                <div className="mb-3">
                    <button
                        className="btn btn-gradient w-10"
                        onClick={() => setShowNewPostForm(prev => !prev)}
                    >
                        {showNewPostForm ? "Сховати форму" : "Створити пост"}
                    </button>
                </div>
                <h1 className="text-center mb-4">Стрічка постів</h1>

                {error && <div className="text-red-500 mb-4">{error}</div>}

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

                <div className="filter-panel">
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <button
                            className={`btn btn-sm ${filterType === "" ? "btn-gradient active" : "btn-outline-secondary"}`}
                            onClick={() => setFilterType("")}
                        >
                            Всі типи
                        </button>
                        {Object.values(PostType)
                            .filter(v => typeof v === "number")
                            .map(pt => (
                                <button
                                    key={pt}
                                    className={`btn btn-sm ${filterType === pt ? "btn-gradient active" : "btn-outline-secondary"}`}
                                    onClick={() => setFilterType(pt as PostType)}
                                >
                                    {postTypeLabels[pt as PostType]}
                                </button>
                            ))
                        }
                    </div>
                </div>
                {/*<div className="d-flex flex-wrap gap-2 mb-3">*/}

                {/*    <button className="btn btn-gradient" onClick={() => setSortDesc(!sortDesc)}>*/}
                {/*        {sortDesc ? "Новіші" : "Старіші"}*/}
                {/*    </button>*/}
                {/*</div>*/}

                <div className="post-cards">
                    {loading ? <p>Завантаження...</p> : (
                        paginatedPosts.map(post => (
                            <div key={post.id} className="post-card">

                                <button
                                    className="report-btn"
                                    onClick={() => console.log("Скарга на пост", post.id)}
                                >
                                    ⚠
                                </button>

                                <div className="post-header">
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        marginBottom: "12px",
                                        marginTop: "-30px"
                                    }}>
                                        <img
                                            src={post.author?.profileImage || DEFAULT_PROFILE_PICTURE_URL}
                                            alt="author"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                border: "2px solid rgba(255,255,255,0.7)"
                                            }}
                                        />

                                        <div>
                                            <strong>{post.author?.fullName || "Користувач"}</strong>
                                        </div>

                                    </div>

                                    <span className="post-type">{postTypeLabels[post.postType]}</span>
                                </div>


                                <div className="post-header">
                                    <h3>{post.title || "(Без заголовка)"}</h3>
                                </div>

                                {post.photos && post.photos.length > 0 && (
                                    <div style={{
                                        marginTop: "1rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        marginBottom: "1rem",
                                    }}>

                                        {post.photos.length === 1 && (
                                            <img
                                                src={post.photos[0]}
                                                alt="post_photo"
                                                style={{
                                                    width: "500px",
                                                    height: "500px",
                                                    objectFit: "cover",
                                                    borderRadius: "10px",
                                                    border: "1px solid rgba(255,255,255,0.5)"
                                                }}
                                            />
                                        )}

                                        {post.photos.length > 1 && (
                                            <div style={{
                                                position: "relative",
                                                width: "500px",
                                                height: "500px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                                <img
                                                    src={post.photos[activePhotoIndex]}
                                                    alt="carousel_photo"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        borderRadius: "10px",
                                                        border: "1px solid rgba(255,255,255,0.5)"
                                                    }}
                                                />

                                                <button
                                                    onClick={() => prevPhoto(post.photos!)}
                                                    style={{
                                                        position: "absolute",
                                                        left: "-50px",
                                                        top: "50%",
                                                        transform: "translateY(-50%)",
                                                        background: "transparent",
                                                        border: "none",
                                                        borderRadius: "50%",
                                                        width: "40px",
                                                        height: "40px",
                                                        color: "black",
                                                        fontSize: "2rem",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    ‹
                                                </button>

                                                <button
                                                    onClick={() => nextPhoto(post.photos!)}
                                                    style={{
                                                        position: "absolute",
                                                        right: "-50px",
                                                        top: "50%",
                                                        transform: "translateY(-50%)",
                                                        background: "transparent",
                                                        border: "none",
                                                        borderRadius: "50%",
                                                        width: "40px",
                                                        height: "40px",
                                                        color: "black",
                                                        fontSize: "2rem",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    ›
                                                </button>

                                            </div>
                                        )}

                                        {post.photos.length > 1 && (
                                            <div style={{
                                                display: "flex",
                                                gap: "6px",
                                                marginTop: "8px",
                                                justifyContent: "center"
                                            }}>
                                                {post.photos.map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        style={{
                                                            width: "10px",
                                                            height: "10px",
                                                            borderRadius: "50%",
                                                            background: idx === activePhotoIndex ? "#3fb573" : "#ccc",
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() => setActivePhotoIndex(idx)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}


                                <h5>{post.content || "(немає контенту)"}</h5>
                                {post.location && <p><b>Локація:</b> {post.location}</p>}
                                {post.contactPhone && <p><b>Телефон:</b> {post.contactPhone}</p>}
                                {post.contactEmail && <p><b>Email:</b> {post.contactEmail}</p>}
                                {post.contactLink &&
                                    <p><b>Посилання:</b> <a href={post.contactLink} target="_blank"
                                                            rel="noreferrer">{post.contactLink}</a>
                                    </p>}
                                {"eventDate" in post && post.eventDate &&
                                    <p><b>Дата події:</b> {new Date(post.eventDate).toLocaleString()}</p>
                                }

                                <small>{new Date(post.creationDate).toLocaleDateString()}</small>

                            </div>
                        ))
                    )}
                </div>


                <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                    <button
                        className="btn btn-gradient"
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        style={{fontSize: "1.2rem"}}
                    >
                        ←
                    </button>

                    <span style={{fontWeight: 600}}>Сторінка {page} з {totalPages}</span>

                    <button
                        className="btn btn-gradient"
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        style={{fontSize: "1.2rem"}}
                    >
                        →
                    </button>
                </div>

            </div>

            {showNewPostForm && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                    onClick={() => setShowNewPostForm(false)}
                >
                    <div
                        style={{
                            background: "white",
                            borderRadius: "15px",
                            padding: "2rem",
                            width: "500px",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            position: "relative",
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowNewPostForm(false)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                background: "transparent",
                                border: "none",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                            }}
                        >
                            &times;
                        </button>

                        <h4>Новий пост</h4>
                        <form onSubmit={handleAddPost}>

                            <label>Тип поста</label>
                            <select
                                className="form-control mb-2"
                                value={newPost.type}
                                onChange={e => setNewPost({...newPost, type: Number(e.target.value) as PostType})}
                                required
                            >
                                <option value="">Оберіть тип поста</option>
                                {Object.values(PostType).filter(v => typeof v === "number").map(pt => (
                                    <option key={pt} value={pt}>{postTypeLabels[pt as PostType]}</option>
                                ))}
                            </select>

                            <label>Заголовок</label>
                            <input
                                className="form-control mb-2"
                                placeholder="Заголовок"
                                value={newPost.title}
                                onChange={e => setNewPost({...newPost, title: e.target.value})}
                                required
                            />

                            <label>Контент</label>
                            <textarea
                                className="form-control mb-2"
                                placeholder="Контент"
                                value={newPost.content}
                                onChange={e => setNewPost({...newPost, content: e.target.value})}
                                required
                            />

                            <label>Фотографії</label>
                            <input
                                type="file"
                                className="form-control mb-2"
                                multiple
                                onChange={e => setNewPost({...newPost, photos: e.target.files ? Array.from(e.target.files) : []})}
                            />

                            <label>Дата події</label>
                            <input
                                type="datetime-local"
                                className="form-control mb-2"
                                value={newPost.eventDate}
                                onChange={e => setNewPost({...newPost, eventDate: e.target.value})}
                            />

                            <label>Локація</label>
                            <input
                                className="form-control mb-2"
                                placeholder="Локація"
                                value={newPost.location}
                                onChange={e => setNewPost({...newPost, location: e.target.value})}
                            />

                            <label>Телефон</label>
                            <input
                                className="form-control mb-2"
                                placeholder="Телефон"
                                value={newPost.contactPhone}
                                onChange={e => setNewPost({...newPost, contactPhone: e.target.value})}
                            />

                            <label>Email</label>
                            <input
                                className="form-control mb-2"
                                placeholder="Email"
                                value={newPost.contactEmail}
                                onChange={e => setNewPost({...newPost, contactEmail: e.target.value})}
                            />

                            <label>Посилання</label>
                            <input
                                className="form-control mb-2"
                                placeholder="Посилання"
                                value={newPost.contactLink}
                                onChange={e => setNewPost({...newPost, contactLink: e.target.value})}
                            />

                            <button type="submit" className="btn btn-gradient w-100 py-2 mt-2">Додати пост</button>
                        </form>
                    </div>
                </div>
            )}



        </div>
    );
};

export default MainPostsPage;
