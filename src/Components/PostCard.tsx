import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostType } from "../Enums/PostType";
import { DEFAULT_PROFILE_PICTURE_URL } from "../config/constants";
import CommentViewModel from "../ViewModels/CommentViewModel";
import UserViewModel from "../ViewModels/UserViewModel";
import ComplaintForm from "./AddComplaintForm";
import CommentItem from "./CommentItem";
import PostViewModel from "../ViewModels/PostViewModel";
import { ActivityStatus } from "../Enums/ActivityStatus";


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
    status: number;
    author?: {
        fullName: string;
        profileImage: string | null;
    };
}

interface Comment {
    id: number;
    authorId: string;
    authorName: string;
    authorProfileImage: string | null;
    content: string;
    creationDate: string;
    status: number;
}

interface PostCardProps {
    post: Post;
    isForUsers: boolean;
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
const commentVM = new CommentViewModel();
const userVM = new UserViewModel();
const postVM = new PostViewModel();


const PostCard: React.FC<PostCardProps> = ({ post, isForUsers}) => {
    const navigate = useNavigate();
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [statusLable, setStatusLable] = useState(post.status === 1 ? "Розблокувати" : "Заблокувати");

    const [isComplaintOpen, setIsComplaintOpen] = useState(false);
    const [commentComplaint, setCommentComplaint] = useState<{
        open: boolean;
        commentId: number | null
    }>({
        open: false,
        commentId: null
    });
    const [showAllComments, setShowAllComments] = useState(false);

    const fetchComments = async () => {
        try {
            const data = await commentVM.getCommentsByPost(post.id);
            const commentsWithAuthors = await Promise.all(data.map(async (c: any) => {
                try {
                    const user = await userVM.getUserById(c.authorId);
                    return {
                        ...c,
                        authorName: user.fullName || "Користувач",
                        authorProfileImage: user.profileImage || DEFAULT_PROFILE_PICTURE_URL
                    };
                } catch {
                    return {
                        ...c,
                        authorName: "Користувач",
                        authorProfileImage: DEFAULT_PROFILE_PICTURE_URL
                    };
                }
            }));

            setComments(commentsWithAuthors);
        } catch (err) {
            console.error("Помилка завантаження коментарів:", err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);


    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            let currentUserId = localStorage.getItem("userId");
            await commentVM.addComment(post.id, String(currentUserId), newComment);
            setNewComment("");
            fetchComments();
        } catch (err) {
            console.error("Помилка додавання коментаря:", err);
        }
    };

    const nextPhoto = () => {
        if (!post.photos) return;
        setActivePhotoIndex((prev) => (prev + 1) % post.photos!.length);
    };

    const prevPhoto = () => {
        if (!post.photos) return;
        setActivePhotoIndex((prev) => (prev - 1 + post.photos!.length) % post.photos!.length);
    };

    const handleBlockPost = async () => {
        try {
            if (post.status === 1){
                await postVM.editPostStatus(post.id, ActivityStatus.Active);
                alert("Публікацію розблоковано.");
                setStatusLable("Заблокувати")
            }else{
                await postVM.editPostStatus(post.id, ActivityStatus.Blocked);
                alert("Публікацію заблоковано.");
                setStatusLable("Розблокувати")
            }

        } catch (e) {
            console.error("Помилка блокування:", e);
            alert("Не вдалося заблокувати публікацію.");
        }
    };

    return (
        <div className="post-card">
            {isForUsers && <button
                className="report-btn"
                onClick={() => setIsComplaintOpen(true)}
                style={{
                    position: "relative",
                    bottom: "10px",
                    left: "97%",
                    marginBottom: " -50%",
                    fontSize: "1.5rem",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                ⚠
            </button>
            }

            <div className="post-header"
                 onClick={() => navigate(`/profile/${post.userId}`)}>
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
                    <div><strong>{post.author?.fullName || "Користувач"}</strong></div>
                </div>

                <span className="post-type" style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "8px",
                    background: "rgba(63, 181, 115, 0.2)",
                    color: "#0c3e2d",
                }}
                >{postTypeLabels[post.postType]}</span>
            </div>

            <ComplaintForm
                complainantId={String(localStorage.getItem("userId"))}
                isOpen={isComplaintOpen}
                onClose={() => setIsComplaintOpen(false)}
                targetType="post"
                postId={post.id}
            />

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
                    width: "100%"
                }}>
                    <div style={{
                        position: "relative",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <img
                            src={post.photos[activePhotoIndex]}
                            alt="post_photo"
                            style={{
                                width: "90%",
                                height: "400px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                border: "1px solid rgba(255,255,255,0.5)"
                            }}
                        />
                        {post.photos.length > 1 && (
                            <>
                                <button onClick={prevPhoto} style={carouselBtnStyle}>‹</button>
                                <button onClick={nextPhoto}
                                        style={{...carouselBtnStyle, right: "-10px", left: "auto"}}>›
                                </button>
                            </>
                        )}
                    </div>

                    {post.photos.length > 1 && (
                        <div style={{display: "flex", gap: "6px", marginTop: "8px", justifyContent: "center"}}>
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
                <p><b>Посилання:</b> <a href={post.contactLink} target="_blank" rel="noreferrer">{post.contactLink}</a>
                </p>}
            {post.eventDate && <p><b>Дата події:</b> {new Date(post.eventDate).toLocaleString()}</p>}
            <small>{new Date(post.creationDate).toLocaleDateString()}</small>

            {isForUsers &&
                <div style={{marginTop: "1rem", borderTop: "1px solid #ccc", paddingTop: "1rem", width: "100%"}}>
                    <h5>Коментарі</h5>
                    {comments.length === 0 && <p>Немає коментарів</p>}

                    {comments.slice(0, showAllComments ? comments.length : 2).map(comment => (
                        <CommentItem
                            key={comment.id}
                            id={comment.id}
                            authorId={comment.authorId}
                            authorName={comment.authorName}
                            authorProfileImage={comment.authorProfileImage}
                            content={comment.content}
                            creationDate={comment.creationDate}
                            onReport={(id) =>
                                setCommentComplaint({
                                    open: true,
                                    commentId: id
                                })
                            }
                            isForModerator={false}
                            status={comment.status}
                        />
                    ))}
                        <button
                            onClick={() => setShowAllComments(!showAllComments)}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "#3fb573",
                                cursor: "pointer",
                                marginTop: "8px",
                                fontWeight: "600"
                            }}
                        >
                            {comments.length > 2 && !showAllComments ? "Переглянути всі коментарі" : "" }
                            {comments.length > 0 && showAllComments ? "Сховати коментарі" : "" }
                        </button>

                    <div style={{marginTop: "0.5rem", display: "flex", gap: "0.5rem"}}>
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Написати коментар..."
                            style={{flex: 1, borderRadius: "8px", border: "none", padding: "0.5rem"}}
                        />
                        <button
                            onClick={handleAddComment}
                            style={{
                                borderRadius: "8px",
                                padding: "0.25rem 0.7rem",
                                backgroundColor: "#3fb573",
                                fontSize: "1.5rem",
                                color: "white",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            }
            {!isForUsers && (
                <div style={{ display: "flex", gap: "10px", position: "relative", bottom: "-10px", left: "-10px" }}>
                    <button
                        onClick={handleBlockPost}
                        style={{
                            padding: "6px 12px",
                            background: "#d9534f",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                    >
                        {statusLable}
                    </button>
                </div>
            )}


            <ComplaintForm
                complainantId={String(localStorage.getItem("userId"))}
                isOpen={commentComplaint.open}
                onClose={() => setCommentComplaint({open: false, commentId: null})}
                targetType="comment"
                commentId={commentComplaint.commentId!}
            />
        </div>
    );
};


const carouselBtnStyle: React.CSSProperties = {
    position: "absolute",
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
    alignItems: "center",
    left: "-10px"
};

export default PostCard;
