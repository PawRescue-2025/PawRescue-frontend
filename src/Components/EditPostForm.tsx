import React, { useState } from "react";
import PostViewModel from "../ViewModels/PostViewModel";
import ReactDOM from "react-dom";

interface EditPostFormProps {
    postId: number;
    initialContent: string;
    initialEventDate: string | null;
    initialPhone?: string;
    initialEmail?: string;
    initialLink?: string;
    initialLocation?: string;
    onClose: () => void;
    onSaved: () => void;
}

const postVM = new PostViewModel();

const EditPostForm: React.FC<EditPostFormProps> = ({
                                                       postId,
                                                       initialContent,
                                                       initialEventDate,
                                                       initialPhone,
                                                       initialEmail,
                                                       initialLink,
                                                       initialLocation,
                                                       onClose,
                                                       onSaved
                                                   }) => {

    const [data, setData] = useState({
        content: initialContent,
        eventDate: initialEventDate ? new Date(initialEventDate) : null,
        contactPhone: initialPhone || "",
        contactEmail: initialEmail || "",
        contactLink: initialLink || "",
        location: initialLocation || ""
    });

    const handleSave = async () => {
        try {
            await postVM.editPost(
                postId,
                data.content,
                data.eventDate,
                data.contactPhone || null,
                data.contactEmail || null,
                data.contactLink || null,
                data.location || null
            );

            onSaved();
        } catch (err) {
            console.error(err);
            alert("Помилка оновлення публікації");
        }
    };

    const [locationQuery, setLocationQuery] = useState("");
    const [locationResults, setLocationResults] = useState<{ display_name: string }[]>([]);
    const [isLoadingLocations, setIsLoadingLocations] = useState(false);

    const searchLocations = async (query: string) => {
        if (!query || query.length < 2) {
            setLocationResults([]);
            return;
        }

        setIsLoadingLocations(true);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ua&q=${encodeURIComponent(query)}`
            );
            const data = await res.json();
            setLocationResults(data);
            console.log(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoadingLocations(false);
        }
    };

    const [locationTimeout, setLocationTimeout] = useState<any>(null);

    const handleLocationInput = (value: string) => {
        setLocationQuery(value);

        if (locationTimeout) clearTimeout(locationTimeout);

        setLocationTimeout(
            setTimeout(() => {
                searchLocations(value);
            }, 300)
        );
    };

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
                        Редагування поста
                    </h2>

                    <label className="mt-2">Контент</label>
                    <textarea
                        className="form-control input-glass"
                        value={data.content}
                        onChange={(e) => setData({...data, content: e.target.value})}
                        rows={3}
                    />

                    <label className="mt-3">Дата події</label>
                    <input
                        type="datetime-local"
                        className="form-control input-glass"
                        value={
                            data.eventDate
                                ? new Date(data.eventDate.getTime() - data.eventDate.getTimezoneOffset() * 60000)
                                    .toISOString()
                                    .slice(0, 16)
                                : ""
                        }
                        onChange={(e) =>
                            setData({
                                ...data,
                                eventDate: e.target.value ? new Date(e.target.value) : null
                            })
                        }
                    />

                    <label className="mt-3">Телефон</label>
                    <input
                        className="form-control input-glass"
                        value={data.contactPhone}
                        onChange={(e) => setData({...data, contactPhone: e.target.value})}
                    />

                    <label className="mt-3">Email</label>
                    <input
                        className="form-control input-glass"
                        value={data.contactEmail}
                        onChange={(e) => setData({...data, contactEmail: e.target.value})}
                    />

                    <label className="mt-3">Посилання</label>
                    <input
                        className="form-control input-glass"
                        value={data.contactLink}
                        onChange={(e) => setData({...data, contactLink: e.target.value})}
                    />

                    <div className="mb-3" style={{position: "relative"}}>
                        <label>Локація</label>
                        <input
                            className="form-control input-glass"
                            value={locationQuery}
                            onChange={(e) => handleLocationInput(e.target.value)}
                            placeholder="Почніть вводити назву міста або села..."
                        />

                        {isLoadingLocations && (
                            <div style={{padding: "8px", fontSize: "0.9rem"}}>
                                Завантаження...
                            </div>
                        )}

                        {locationResults.length > 0 && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    background: "white",
                                    borderRadius: "8px",
                                    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                                    zIndex: 9999,
                                    maxHeight: "250px",
                                    overflowY: "auto"
                                }}
                            >
                                {locationResults.map((loc, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setData({...data, location: loc.display_name});
                                            setLocationQuery(loc.display_name);
                                            setLocationResults([]);
                                        }}
                                        style={{
                                            padding: "10px 12px",
                                            cursor: "pointer",
                                            borderBottom: "1px solid #eee"
                                        }}
                                    >
                                        {loc.display_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSave}
                        className="btn btn-gradient w-100 py-3 mt-4"
                    >
                        Зберегти
                    </button>
                </div>
            </div>
        ),
        document.getElementById("modal-root") as HTMLElement
    );
};

export default EditPostForm;
