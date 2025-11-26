import React, {useEffect, useState} from "react";
import {DEFAULT_PROFILE_PICTURE_URL} from "../config/constants";
import CommentViewModel from "../ViewModels/CommentViewModel";
import { ActivityStatus } from "../Enums/ActivityStatus";


interface CommentItemProps {
    id: number,
    authorId: string,
    authorName: string,
    authorProfileImage: string | null,
    content: string,
    creationDate: string,
    onReport: (id: number) => void,
    isForModerator: boolean,
    status: number
}
const commentVM = new CommentViewModel();

const CommentItem: React.FC<CommentItemProps> = ({
                                                     id,
                                                     authorId,
                                                     authorName,
                                                     authorProfileImage,
                                                     content,
                                                     creationDate,
                                                     onReport,
                                                     isForModerator,
                                                     status}) => {

    const [statusLabel, setStatusLabel] = useState(
        status === 1 ? "Розблокувати" : "Заблокувати"
    );


    const handleBlockComment = async () => {
        try {
            if (status === 1) {
                await commentVM.editCommentStatus(id, ActivityStatus.Active);
                alert("Коментар розблоковано.");
                setStatusLabel("Заблокувати");
            } else {
                await commentVM.editCommentStatus(id, ActivityStatus.Blocked);
                alert("Коментар заблоковано.");
                setStatusLabel("Розблокувати");
            }
        } catch (e) {
            console.error("Помилка блокування коментаря:", e);
            alert("Не вдалося заблокувати коментар.");
        }
    };


    return (
        <div
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
                src={authorProfileImage || DEFAULT_PROFILE_PICTURE_URL}
                alt={authorName}
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
                    <strong>{authorName}</strong>
                    <small style={{color: "#888", fontSize: "12px"}}>
                        {new Date(creationDate).toLocaleString()}
                    </small>
                </div>
                <p style={{margin: 0}}>{content}</p>
            </div>
            {isForModerator && (
                <button
                    onClick={handleBlockComment}
                    style={{
                        padding: "6px 10px",
                        background: "#d9534f",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        height: "32px"
                    }}
                >
                    {statusLabel}
                </button>
            )}

            {!isForModerator &&
            <button
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem"
                }}
                onClick={() => onReport(id)}
            >
                ⚠
            </button>
            }
        </div>
    );
};

export default CommentItem;
