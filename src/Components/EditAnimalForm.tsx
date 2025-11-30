import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AnimalViewModel from "../ViewModels/AnimalViewModel";

import { AnimalSpecies } from "../Enums/AnimalSpecies";
import { AnimalGender } from "../Enums/AnimalGender";
import { AnimalSize } from "../Enums/AnimalSize";
import { AdoptionStatus } from "../Enums/AdoptionStatus";

const animalVM = new AnimalViewModel();

interface Animal {
    id: number;
    shelterId: number;
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
    photos?: string[];
    documents?: string[];
}

interface EditAnimalFormProps {
    show: boolean;
    animal: Animal;
    onClose: () => void;
    onSubmit: () => void;
}

interface AnimalFormData {
    name: string;
    species: string;
    breed: string;
    gender: AnimalGender | "";
    age: number | "";
    weight: number | "";
    size: AnimalSize | "";
    isHealthy: boolean;
    isVaccinated: boolean;
    isSterilized: boolean;
    adoptionStatus: AdoptionStatus | "";
    description: string;
    photos: File[];
    documents: File[];
}

const EditAnimalForm: React.FC<EditAnimalFormProps> = ({ show, animal, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<AnimalFormData>({
        name: "",
        species: "",
        breed: "",
        gender: "",
        age: "",
        weight: "",
        size: "",
        isHealthy: true,
        isVaccinated: true,
        isSterilized: true,
        adoptionStatus: AdoptionStatus.AvailableForAdoption,
        description: "",
        photos: [],
        documents: [],
    });

    useEffect(() => {
        if (animal) {
            setFormData({
                name: animal.name,
                species: animal.species,
                breed: animal.breed,
                gender: animal.gender,
                age: animal.age,
                weight: animal.weight,
                size: animal.size,
                isHealthy: animal.isHealthy,
                isVaccinated: animal.isVaccinated,
                isSterilized: animal.isSterilized,
                adoptionStatus: animal.adoptionStatus,
                description: animal.description || "",
                photos: [],
                documents: [],
            });
        }
    }, [animal]);

    if (!show) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(animal);
            console.log(formData);
            await animalVM.editAnimal(
                animal.id,
                animal.shelterId,
                formData.name,
                formData.species as AnimalSpecies,
                formData.breed,
                formData.gender as AnimalGender,
                Number(formData.age),
                Number(formData.weight),
                formData.size as AnimalSize,
                formData.isHealthy,
                formData.isVaccinated,
                formData.isSterilized,
                formData.adoptionStatus as AdoptionStatus,
                new Date(), // keep current date as arrivalDate or preserve previous one
                formData.description,
                formData.photos,
                formData.documents
            );
            onSubmit();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return ReactDOM.createPortal(
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
                zIndex: 9999,
            }}
            onClick={onClose}
        >
            <div
                className="glass-form p-4"
                style={{
                    width: "550px",
                    maxWidth: "90%",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "30px",
                    position: "relative",
                    paddingBottom: "30px",
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
                        cursor: "pointer",
                    }}
                >
                    &times;
                </button>

                <h2 className="text-center mb-3" style={{ color: "rgba(24,67,29,0.85)", fontWeight: "700" }}>
                    Редагувати тварину
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label>Ім'я</label>
                        <input
                            className="form-control input-glass"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    {/* Species */}
                    <div className="mb-3">
                        <label>Вид</label>
                        <input
                            className="form-control input-glass"
                            value={formData.species}
                            onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                            required
                        />
                    </div>

                    {/* Breed */}
                    <div className="mb-3">
                        <label>Порода</label>
                        <input
                            className="form-control input-glass"
                            value={formData.breed}
                            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        />
                    </div>

                    {/* Gender */}
                    <div className="mb-3">
                        <label>Стать</label>
                        <div>
                            {Object.values(AnimalGender).map((g) => (
                                <div key={g} className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={formData.gender === g}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as AnimalGender })}
                                        required
                                    />
                                    <label className="form-check-label">{g}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Age */}
                    <div className="mb-3">
                        <label>Вік (роки)</label>
                        <input
                            type="number"
                            className="form-control input-glass"
                            min={0}
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                            required
                        />
                    </div>

                    {/* Weight */}
                    <div className="mb-3">
                        <label>Вага (кг)</label>
                        <input
                            type="number"
                            className="form-control input-glass"
                            min={0}
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                            required
                        />
                    </div>

                    {/* Size */}
                    <div className="mb-3">
                        <label>Розмір</label>
                        <select
                            className="form-control input-glass"
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) as AnimalSize })}
                            required
                        >
                            <option value="">Оберіть розмір</option>
                            {Object.entries(AnimalSize)
                                .filter(([_, v]) => typeof v === "number")
                                .map(([label, value]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label>Опис</label>
                        <textarea
                            className="form-control input-glass"
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Photos */}
                    <div className="mb-3">
                        <label>Фотографії</label>
                        <input
                            type="file"
                            multiple
                            className="form-control input-glass"
                            onChange={(e) =>
                                setFormData({ ...formData, photos: e.target.files ? Array.from(e.target.files) : [] })
                            }
                        />
                    </div>

                    {/* Documents */}
                    <div className="mb-3">
                        <label>Документи</label>
                        <input
                            type="file"
                            multiple
                            className="form-control input-glass"
                            onChange={(e) =>
                                setFormData({ ...formData, documents: e.target.files ? Array.from(e.target.files) : [] })
                            }
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.isHealthy}
                            onChange={(e) => setFormData({ ...formData, isHealthy: e.target.checked })}
                        />
                        <label className="form-check-label">Здорова/ий</label>
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.isVaccinated}
                            onChange={(e) => setFormData({ ...formData, isVaccinated: e.target.checked })}
                        />
                        <label className="form-check-label">Вакцинована/ий</label>
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.isSterilized}
                            onChange={(e) => setFormData({ ...formData, isSterilized: e.target.checked })}
                        />
                        <label className="form-check-label">Стерилізована/кастрований</label>
                    </div>

                    {/* Adoption Status */}
                    <div className="mb-4">
                        <label>Статус усиновлення</label>
                        <select
                            className="form-control input-glass"
                            value={formData.adoptionStatus}
                            onChange={(e) =>
                                setFormData({ ...formData, adoptionStatus: Number(e.target.value) as AdoptionStatus })
                            }
                            required
                        >
                            {Object.entries(AdoptionStatus)
                                .filter(([_, v]) => typeof v === "number")
                                .map(([label, value]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-gradient w-100 py-3">
                        Зберегти зміни
                    </button>
                </form>
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default EditAnimalForm;
