import React, { useState, useEffect } from "react";
import { PostType } from "../Enums/PostType";
import { DEFAULT_PROFILE_PICTURE_URL } from "../config/constants";
import CommentViewModel from "../ViewModels/CommentViewModel";
import UserViewModel from "../ViewModels/UserViewModel";
import ComplaintForm from "./AddComplaintForm";

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

interface Comment {
    id: number;
    authorId: string;
    authorName: string;
    authorProfileImage: string | null;
    content: string;
    creationDate: string;
}
interface PostCardProps {
    post: Post;
    isForModerator: boolean;
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

const PostCard: React.FC<PostCardProps> = ({ post, isForModerator}) => {
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");

    const [isComplaintOpen, setIsComplaintOpen] = useState(false);
    const [commentComplaint, setCommentComplaint] = useState<{
        open: boolean;
        commentId: number | null;
        userId: string | null;
    }>({
        open: false,
        commentId: null,
        userId: null
    });


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

    return (
        <div className="post-card">
            {isForModerator && <button
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
                isOpen={isComplaintOpen}
                onClose={() => setIsComplaintOpen(false)}
                targetType="post"
                postId={post.id}
                reportedUserId={post.userId}
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

            {isForModerator &&
                <div style={{marginTop: "1rem", borderTop: "1px solid #ccc", paddingTop: "1rem", width: "100%"}}>
                    <h5>Коментарі</h5>
                    {comments.length === 0 && <p>Немає коментарів</p>}
                    {comments.map(comment => (
                        <div
                            key={comment.id}
                            style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "flex-start",
                                marginBottom: "12px",
                                padding: "8px",
                                borderRadius: "10px",
                                backgroundColor: "rgba(249,249,249,0.5)"
                            }}
                        >
                            <img
                                src={comment.authorProfileImage || DEFAULT_PROFILE_PICTURE_URL}
                                alt={comment.authorName}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "1px solid #ccc"
                                }}
                            />
                            <div style={{flex: 1}}>
                                <div style={{display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px"}}>
                                    <strong>{comment.authorName}</strong>
                                    <small style={{color: "#888", fontSize: "12px"}}>
                                        {new Date(comment.creationDate).toLocaleString()}
                                    </small>
                                </div>
                                <p style={{margin: 0}}>{comment.content}</p>
                            </div>
                            <button
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "1.2rem"
                                }}
                                onClick={() => {
                                    setCommentComplaint({
                                        open: true,
                                        commentId: comment.id,
                                        userId: comment.authorId
                                    });
                                }}
                            >
                                ⚠
                            </button>
                        </div>

                    ))}

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

            <ComplaintForm
                isOpen={commentComplaint.open}
                onClose={() => setCommentComplaint({open: false, commentId: null, userId: null})}
                targetType="comment"
                commentId={commentComplaint.commentId!}
                reportedUserId={commentComplaint.userId!}
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
