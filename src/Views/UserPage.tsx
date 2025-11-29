import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import UserViewModel from "../ViewModels/UserViewModel";
import PostViewModel from "../ViewModels/PostViewModel";
import PointsViewModel from "../ViewModels/PointsViewModel";

import PostCard from "../Components/PostCard";
import EditUserForm from "../Components/EditUserForm";
import AddPointsForm from "../Components/AddPointsForm";
import PointsList from "../Components/PointsList";
import ComplaintForm from "../Components/AddComplaintForm";


import { PostType } from "../Enums/PostType";
import AddPostModal from "../Components/AddPostModal";

const userVM = new UserViewModel();
const postVM = new PostViewModel();
const pointsVM = new PointsViewModel();

const postTypeLabels: Record<number, string> = {
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

const UserProfilePage: React.FC = () => {
    const { userId } = useParams();
    const loggedUserId = localStorage.getItem("userId");

    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [points, setPoints] = useState(0);
    const [reviews, setReviews] = useState<any[]>([]);
    const [verificationStatus, setVerificationStatus] = useState<number | null>(null);

    const [editMode, setEditMode] = useState(false);
    const [showAddReview, setShowAddReview] = useState(false);
    const [showReviewsList, setShowReviewsList] = useState(false);

    const [filterType, setFilterType] = useState<PostType | "">("");
    const [sortNewest, setSortNewest] = useState(true);

    const [profileComplaintOpen, setProfileComplaintOpen] = useState(false);
    const [showNewPostForm, setShowNewPostForm] = useState(false);

    const fetchData = async () => {
        if (!userId) return;
        const userData = await userVM.getUserById(userId);
        setUser(userData);

        const postsData = await postVM.getPostsByUser(userId);
        const postsWithAuthors = await Promise.all(
            postsData.map(async (post: any) => {
                try {
                    const author = await userVM.getUserById(post.userId);
                    return {...post, author: { fullName: author.fullName, profileImage: author.photo || null,},};
                } catch {
                    return {...post, author: { fullName: "Невідомий користувач", profileImage: null,},};
                }
            })
        );

        setPosts(postsWithAuthors);

        const userPoints = await userVM.getUserPointsNumber(userId);
        setPoints(userPoints);

        const verification = await userVM.getUserVerificationStatus(userId);
        setVerificationStatus(verification);

        const reviewsData = await pointsVM.getPointsByRecipient(userId);
        setReviews(reviewsData);
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    const filteredPosts = posts
        .filter(p => filterType === "" || p.postType === filterType)
        .sort((a, b) => {
            const d1 = new Date(a.creationDate).getTime();
            const d2 = new Date(b.creationDate).getTime();
            return sortNewest ? d2 - d1 : d1 - d2;
        });

    if (!user) return <p className="text-center py-5">Завантаження...</p>;

    const isOwner = loggedUserId === user.id;
    const isModerator =
        localStorage.getItem("role") === "Moderator" ||
        localStorage.getItem("role") === "Admin";

    const handleSubmitAddForm = async () => {
        await fetchData();
        setShowNewPostForm(false);
    };


    const getVerificationLabel = () => {
        switch (verificationStatus) {
            case 0: return "Не верифіковано";
            case 1: return "Перевіряється";
            case 2: return "Верифіковано ✔";
            case 3: return "Відхилено ✖";
            default: return "";
        }
    };

    const getUserTypeLabel = () => {
        switch (user.role) {
            case 0: return "Небайдужий";
            case 1: return "Власник Притулку";
            case 2: return "Волонтер";
            case 3: return "Модератор";
            default: return "";
        }
    };

    const getActivityStatusLabel = () => {
        switch (user.status) {
            case 0: return "Активний";
            case 1: return "Заблокований";
            case 2: return "Видалений";
            default: return "";
        }
    };


    return (
        <div
            className="d-flex justify-content-center py-5"
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
                    min-height: 85vh;
                    margin-top: 50px;
                    position: relative;
                }
                .side-panel {
                    position: absolute;
                    right: 2rem;
                    top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .btn-gradient {
                    border-radius: 12px;
                    padding: 0.6rem 1rem;
                    background: rgba(12,95,61,0.7);
                    color: white;
                    border: none;
                    font-weight: 600;
                    transition: 0.3s ease;
                }
                .btn-gradient:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 25px rgba(45,134,89,0.5);
                    background: linear-gradient(135deg, #3fb573 0%, #52d98d 50%, #6effa7 100%);
                }
                .profile-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                .profile-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                    font-size: 0.95rem;
                }
                .badge {
                    display: inline-block;
                    padding: 0.2rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    margin-left: 0.5rem;
                    color: white;
                }
                .badge-type { background: #3fb573; }
                .badge-verification { background: #52d98d; }
                .filters-dropdowns {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                    align-items: center;
                }
                .filters-dropdowns select {
                    padding: 0.4rem 0.8rem;
                    border-radius: 12px;
                    border: 1px solid rgba(0,0,0,0.2);
                    background: rgba(255,255,255,0.25);
                    backdrop-filter: blur(10px);
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }
                .filters-dropdowns select:hover {
                    background: rgba(255,255,255,0.35);
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
            `}</style>

            <div className="glass-card">

                {/* SIDE PANEL */}
                <div className="side-panel">
                    {isOwner && (
                        <button className="btn-gradient" onClick={() => setEditMode(true)}>
                            Редагувати профіль
                        </button>
                    )}
                    {/*<button
                        className="btn-gradient"
                        onClick={() => setProfileComplaintOpen(true)}
                    >
                        Поскаржитись
                    </button>*/}
                    {!isOwner && !isModerator && (
                        <button
                            className="btn-gradient"
                            onClick={() => setProfileComplaintOpen(true)}
                        >
                            Поскаржитись
                        </button>
                    )}
                    {/*<button className="btn-gradient">Притулок</button>*/}
                    {user.role === 1 && (
                        <Link to={`/shelter/6`} className="btn-gradient btn">
                            Притулок
                        </Link>
                    )}

                    <div className="text-center p-3 rounded" style={{ background: "rgba(255,255,255,0.4)" }}>
                        <h4>Лапки 🐾</h4>
                        <h2>{points}</h2>
                        {/*<button className="btn btn-sm btn-success mt-2" onClick={() => setShowAddReview(true)}>
                            Додати відгук
                        </button>*/}
                        {!isOwner && !isModerator && (
                            <button className="btn btn-sm btn-success mt-2" onClick={() => setShowAddReview(true)}>
                                Додати відгук
                            </button>
                        )}
                        <button className="btn btn-sm btn-primary mt-2" onClick={() => setShowReviewsList(true)}>
                            Переглянути відгуки ({reviews.length})
                        </button>
                    </div>
                </div>

                {/* HEADER */}
                <div className="profile-header">
                    <img
                        src={user.photo || "/default-user.png"}
                        alt="avatar"
                        style={{ width: 130, height: 130, borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div>
                        {/* Ім'я + бейджі */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <h2 style={{ margin: 0 }}>{user.fullName}</h2>
                            <span className="badge badge-type">{getUserTypeLabel()}</span>
                            {(user.role === 1 || user.role === 2) && (
                                <span className="badge badge-verification">{getVerificationLabel()}</span>
                            )}
                            {/*<span className="badge badge-type">{getActivityStatusLabel()}</span>*/}
                            {isModerator && (
                                <>
                                    <span className="badge badge-type">{getActivityStatusLabel()}</span>
                                </>
                            )}
                        </div>

                        {/* Відступ від імені */}
                        <div style={{ marginTop: "1rem" }} className="profile-info">
                            <div><strong>Email:</strong> {user.email}</div>
                            <div><strong>Телефон:</strong> {user.phoneNumber}</div>
                            {user.description && <div><strong>Опис:</strong> {user.description}</div>}
                            {/*<div><strong>Реєстрація:</strong> {user?.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : "—"}</div>
                            {user?.deletionDate && <div><strong>Видалений:</strong> {new Date(user.deletionDate).toLocaleDateString()}</div>}*/}
                            {isModerator && (
                                <>
                                    <div><strong>Реєстрація:</strong> {user?.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : "—"}</div>
                                    {user?.deletionDate && <div><strong>Видалений:</strong> {new Date(user.deletionDate).toLocaleDateString()}</div>}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* FILTER DROPDOWNS */}
                {isOwner && (
                    <button
                        className="btn btn-gradient w-10"
                        onClick={() => setShowNewPostForm(prev => !prev)}
                    >
                        {showNewPostForm ? "Сховати форму" : "Створити пост"}
                    </button>
                )}

                <div className="filters-dropdowns">
                    <select
                        value={sortNewest ? "newest" : "oldest"}
                        onChange={(e) => setSortNewest(e.target.value === "newest")}
                    >
                        <option value="newest">Сортувати: новіші</option>
                        <option value="oldest">Сортувати: старіші</option>
                    </select>

                    <select
                        value={filterType === "" ? "" : filterType}
                        onChange={(e) => setFilterType(e.target.value === "" ? "" : Number(e.target.value))}
                    >
                        <option value="">Всі категорії</option>
                        {Object.entries(postTypeLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                {/* USER POSTS */}
                <div className="post-cards">
                    {filteredPosts.length === 0 ? (
                        <p className="text-muted">Постів немає</p>
                    ) : (
                        filteredPosts.map(p => <PostCard key={p.id} post={p} isForUsers={true} />)
                    )}
                </div>

            </div>

            {/* MODALS */}
            <EditUserForm show={editMode} onClose={() => setEditMode(false)} user={user} onSaved={fetchData} />
            <AddPointsForm show={showAddReview} onClose={() => setShowAddReview(false)} recipientId={userId!} onSaved={fetchData} />
            <PointsList show={showReviewsList} onClose={() => setShowReviewsList(false)} reviews={reviews} />
            <ComplaintForm
                complainantId={String(localStorage.getItem("userId"))}
                isOpen={profileComplaintOpen}
                onClose={() => setProfileComplaintOpen(false)}
                targetType="post" // or "comment" if you plan to allow complaints on comments
                reportedUserId={userId!}
                onSuccess={() => alert("Скарга відправлена")}
            />
            <AddPostModal
                show={showNewPostForm}
                onClose={() => setShowNewPostForm(false)}
                onSubmit={() => handleSubmitAddForm()}
                userType={user.role}
            />

        </div>
    );
};

export default UserProfilePage;
