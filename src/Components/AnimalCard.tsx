import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimalViewModel from "../ViewModels/AnimalViewModel";
import ContactsModal from "./ContactsModal";
import { AnimalSize } from "../Enums/AnimalSize";
import { AnimalGender } from "../Enums/AnimalGender";
import { AdoptionStatus } from "../Enums/AdoptionStatus";
import DocumentsModal from "./DocumentsModal";

interface Animal {
    id: number;
    shelterId: number;
    photos?: string[];
    documents?: string[];
    name: string;
    species: string;
    breed: string;
    gender: AnimalGender;
    age: number;
    size: AnimalSize;
    weight: number;
    description?: string;
    isHealthy: boolean;
    isVaccinated: boolean;
    isSterilized: boolean;
    adoptionStatus: AdoptionStatus;
    arrivalDate: string;
    shelterContacts: {
        ownerName: string;
        location: string;
        phone?: string | null;
        email?: string | null;
        link?: string | null;
    };
}

interface AnimalCardProps {
    animal: Animal;
    isOwner: boolean;
    onEdit?: () => void;
}

const animalSizeLabels: { [key in AnimalSize]: string } = {
    [AnimalSize.Small]: "Маленький",
    [AnimalSize.Medium]: "Середній",
    [AnimalSize.Large]: "Великий",
};

const adoptionStatusLabels: { [key in AdoptionStatus]: string } = {
    [AdoptionStatus.NotAvailableForAdoption]: "Недоступно до всиновлення",
    [AdoptionStatus.AvailableForAdoption]: "Доступно до всиновлення",
    [AdoptionStatus.Adopted]: "Всиновлено",
    [AdoptionStatus.CurrentlyFostered]: "На перетримці",
};

const animalVM = new AnimalViewModel();

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, isOwner, onEdit }) => {
    const navigate = useNavigate();
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);
    const [showContacts, setShowContacts] = useState(false);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

    const handleDelete = async () => {
        if (window.confirm("Ви дійсно хочете видалити цю тварину?")) {
            await animalVM.deleteAnimal(animal.id);
            alert("Тварину видалено");
            window.location.reload();
        }
    };

    const nextPhoto = () => {
        if (!animal.photos) return;
        setActivePhotoIndex((prev) => (prev + 1) % animal.photos!.length);
    };

    const prevPhoto = () => {
        if (!animal.photos) return;
        setActivePhotoIndex((prev) => (prev - 1 + animal.photos!.length) % animal.photos!.length);
    };

    return (
        <div className="animal-card" style={{
            background: "rgba(255, 255, 255, 0.25)",
            borderRadius: "12px",
            border: "1px solid rgba(0,0,0,0.1)",
            padding: "50px",
            marginBottom: "16px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
        }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>{animal.name}</h3>
                {isOwner && (
                    <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={onEdit} style={actionBtnStyle}>Редагувати</button>
                        <button onClick={handleDelete} style={{ ...actionBtnStyle, backgroundColor: "#d9534f" }}>Видалити</button>
                    </div>
                )}
            </div>

            {/* Photo */}
            {/*{animal.photos && animal.photos.length > 0 && (
                <div style={{ position: "relative", marginTop: "12px", textAlign: "center" }}>
                    <img
                        src={animal.photos[activePhotoIndex]}
                        alt={animal.name}
                        style={{
                            width: "100%",
                            maxHeight: "400px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            border: "1px solid rgba(0,0,0,0.1)"
                        }}
                    />
                    {animal.photos.length > 1 && (
                        <>
                            <button onClick={prevPhoto} style={carouselBtnStyle}>‹</button>
                            <button onClick={nextPhoto} style={{ ...carouselBtnStyle, right: "-10px", left: "auto" }}>›</button>
                        </>
                    )}
                </div>
            )}*/}
            {/* Photo Carousel */}
            {animal.photos && animal.photos.length > 0 && (
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
                            src={animal.photos[activePhotoIndex]}
                            alt={animal.name}
                            style={{
                                width: "90%",
                                height: "400px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                border: "1px solid rgba(255,255,255,0.5)",
                                cursor: "pointer"  // <-- indicate clickable
                            }}
                            onClick={() => setIsPhotoModalOpen(true)}
                        />
                        {isPhotoModalOpen && (
                            <div
                                onClick={() => setIsPhotoModalOpen(false)}
                                style={{
                                    position: "relative",
                                    top: 0,
                                    left: 0,
                                    height: "100%",
                                    backgroundColor: "rgba(0,0,0,0.8)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 1000,
                                    cursor: "zoom-out"
                                }}
                            >
                                <img
                                    src={animal.photos[activePhotoIndex]}
                                    alt={animal.name}
                                    style={{
                                        maxWidth: "90%",
                                        maxHeight: "90%",
                                        objectFit: "contain",
                                        borderRadius: "10px"
                                    }}
                                />
                            </div>
                        )}

                        {animal.photos.length > 1 && (
                            <>
                                <button onClick={prevPhoto} style={carouselBtnStyle}>‹</button>
                                <button onClick={nextPhoto} style={{ ...carouselBtnStyle, right: "-10px", left: "auto" }}>›</button>
                            </>
                        )}
                    </div>

                    {animal.photos.length > 1 && (
                        <div style={{ display: "flex", gap: "6px", marginTop: "8px", justifyContent: "center" }}>
                            {animal.photos.map((_, idx) => (
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


            {/* Info + Badges */}
            <div style={{ display: "flex", marginTop: "16px", gap: "16px" }}>
                {/* Ліва колонка: інформація */}
                <div style={{ flex: 1 }}>
                    <p><b>Вид:</b> {animal.species}</p>
                    <p><b>Порода:</b> {animal.breed}</p>
                    <p><b>Стать:</b> {animal.gender}</p>
                    <p><b>Вік:</b> {animal.age} років</p>
                    <p><b>Розмір:</b> {animalSizeLabels[animal.size as AnimalSize]}</p>
                    <p><b>Вага:</b> {animal.weight} кг</p>
                    {animal.description && <p><b>Опис:</b> {animal.description}</p>}
                    <p><b>Дата прибуття:</b> {new Date(animal.arrivalDate).toLocaleDateString()}</p>
                </div>

                {/* Права колонка: бейджики */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={badgeStyle(animal.isHealthy)}>Здорова/ий</span>
                    <span style={badgeStyle(animal.isVaccinated)}>Вакцинована/ий</span>
                    <span style={badgeStyle(animal.isSterilized)}>Стерилізована/кастрований</span>
                    <span style={statusBadgeStyle(animal.adoptionStatus)}>{adoptionStatusLabels[animal.adoptionStatus as AdoptionStatus]}</span>
                </div>
            </div>

            {/* Документи */}
            {/*{animal.documents && animal.documents.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                    <span style={{ fontSize: "0.85rem", color: "#555", fontWeight: 600 }}>Документи:</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
                        {animal.documents.map((fileUrl, idx) => (
                            <a
                                key={idx}
                                href={fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{ fontSize: "0.95rem", color: "#3fb573", textDecoration: "underline" }}
                            >
                                {fileUrl.split("/").pop()}
                            </a>
                        ))}
                    </div>
                </div>
            )}*/}

            {/* Contact Button по центру */}
            <div style={{ textAlign: "center", marginTop: "16px" }}>
                <button
                    onClick={() => setShowContacts(true)}
                    style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        backgroundColor: "#3fb573",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 600
                    }}
                >
                    Зв’язатись
                </button>
                {(animal.documents?.length ?? 0) > 0 && <button
                    onClick={() => setShowDocumentsModal(true)}
                    style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        backgroundColor: "#3fb573",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 600,
                        marginLeft: "8px"
                    }}
                >
                    Документи
                </button>
                }

            </div>

            <ContactsModal
                show={showContacts}
                onClose={() => setShowContacts(false)}
                ownerName={animal.shelterContacts.ownerName}
                location={animal.shelterContacts.location}
                phone={animal.shelterContacts.phone || undefined}
                email={animal.shelterContacts.email || undefined}
                link={animal.shelterContacts.link || undefined}
            />
            <DocumentsModal
                show={showDocumentsModal}
                onClose={() => setShowDocumentsModal(false)}
                documents={animal.documents || []}
            />

        </div>
    );
};

const actionBtnStyle: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3fb573",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600
};

const badgeStyle = (active: boolean): React.CSSProperties => ({
    padding: "4px 8px",
    borderRadius: "6px",
    backgroundColor: active ? "#3fb573" : "#ccc",
    color: "#fff",
    fontSize: "0.8rem",
    textAlign: "center"
});

const statusBadgeStyle = (status: AdoptionStatus): React.CSSProperties => {
    let color = "#ccc";
    switch (status) {
        case AdoptionStatus.AvailableForAdoption: color = "#3fb573"; break;
        case AdoptionStatus.CurrentlyFostered: color = "#fbbc05"; break;
        case AdoptionStatus.Adopted: color = "#4285f4"; break;
    }
    return {
        padding: "4px 8px",
        borderRadius: "6px",
        backgroundColor: color,
        color: "#fff",
        fontSize: "0.8rem",
        textAlign: "center"
    };
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


export default AnimalCard;
