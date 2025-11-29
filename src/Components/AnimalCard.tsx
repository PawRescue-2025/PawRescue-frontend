import React, { useState } from "react";
import AnimalViewModel from "../ViewModels/AnimalViewModel";

import ContactsModal from "./ContactsModal";
import { AnimalSize } from "../Enums/AnimalSize";
import { AnimalGender } from "../Enums/AnimalGender";
import { AdoptionStatus } from "../Enums/AdoptionStatus";

interface Animal {
    id: number;
    shelterId: number;
    photos?: string[];
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

const animalVM = new AnimalViewModel();

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, isOwner, onEdit }) => {
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);
    const [showContacts, setShowContacts] = useState(false);

    const handleDelete = async () => {
        if (window.confirm("Ви дійсно хочете видалити цю тварину?")) {
            await animalVM.deleteAnimal(animal.id);
            alert("Тварину видалено");
            window.location.reload();
        }
    };

    return (
        <div className="animal-card" style={{border: "1px solid #ccc", borderRadius: "12px", padding: "16px", marginBottom: "16px"}}>

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h3>{animal.name}</h3>

                {isOwner && (
                    <div style={{display: "flex", gap: "8px"}}>
                        <button onClick={onEdit} style={actionBtnStyle}>Редагувати</button>
                        <button onClick={handleDelete} style={actionBtnStyle}>Видалити</button>
                        <button onClick={() => alert("Створити документ")} style={actionBtnStyle}>Документ</button>
                    </div>
                )}
            </div>

            {animal.photos && animal.photos.length > 0 && (
                <div style={{position: "relative", textAlign: "center"}}>
                    <img
                        src={animal.photos[activePhotoIndex]}
                        alt={animal.name}
                        style={{width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "10px"}}
                    />
                </div>
            )}

            <p><b>Вид:</b> {animal.species}</p>
            <p><b>Порода:</b> {animal.breed}</p>
            <p><b>Стать:</b> {animal.gender}</p>
            <p><b>Вік:</b> {animal.age} років</p>
            <p><b>Розмір:</b> {AnimalSize[animal.size]}</p>
            <p><b>Вага:</b> {animal.weight} кг</p>
            {animal.description && <p><b>Опис:</b> {animal.description}</p>}
            <p><b>Дата прибуття:</b> {new Date(animal.arrivalDate).toLocaleDateString()}</p>

            <div style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px"}}>
                <span style={badgeStyle(animal.isHealthy)}>Здорова</span>
                <span style={badgeStyle(animal.isVaccinated)}>Вакцинована</span>
                <span style={badgeStyle(animal.isSterilized)}>Стерилізована</span>
                <span style={statusBadgeStyle(animal.adoptionStatus)}>{AdoptionStatus[animal.adoptionStatus]}</span>
            </div>

            <button
                onClick={() => setShowContacts(true)}
                style={{marginTop: "12px", padding: "8px 12px", borderRadius: "8px", backgroundColor: "#3fb573", color: "#fff", border: "none", cursor: "pointer"}}
            >
                Зв’язатись
            </button>

            <ContactsModal
                show={showContacts}
                onClose={() => setShowContacts(false)}
                ownerName={animal.shelterContacts.ownerName}
                location={animal.shelterContacts.location}
                phone={animal.shelterContacts.phone || undefined}
                email={animal.shelterContacts.email || undefined}
                link={animal.shelterContacts.link || undefined}
            />

        </div>
    );
};

const actionBtnStyle: React.CSSProperties = {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3fb573",
    color: "#fff",
    cursor: "pointer"
};

const badgeStyle = (active: boolean): React.CSSProperties => ({
    padding: "4px 8px",
    borderRadius: "6px",
    backgroundColor: active ? "#3fb573" : "#ccc",
    color: "#fff",
    fontSize: "0.8rem"
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
        fontSize: "0.8rem"
    };
};

export default AnimalCard;
