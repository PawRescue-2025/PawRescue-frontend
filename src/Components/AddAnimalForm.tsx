import React, { useState } from "react";
import ReactDOM from "react-dom";

import { AnimalSpecies } from "../Enums/AnimalSpecies";
import { AnimalGender } from "../Enums/AnimalGender";
import { AnimalSize } from "../Enums/AnimalSize";
import { AdoptionStatus } from "../Enums/AdoptionStatus";

import AnimalViewModel from "../ViewModels/AnimalViewModel";
import {PostType} from "../Enums/PostType";

const animalVM = new AnimalViewModel();

interface AddAnimalFormProps {
    show: boolean;
    shelterId: number;
    onClose: () => void;
    onSubmit: () => void;
}

interface NewAnimalData {
    name: string;
    species: string | "";
    breed: string;
    gender: AnimalGender | "";
    age: number | "";
    weight: number | "";
    size: AnimalSize | "";
    isHealthy: boolean;
    isVaccinated: boolean;
    isSterilized: boolean;
    adoptionStatus: AdoptionStatus | "";
    arrivalDate: string;
    description: string;
    photos: File[];
    documents: File[];
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




const AddAnimalForm: React.FC<AddAnimalFormProps> = ({ show, shelterId, onClose, onSubmit }) => {
    const [newAnimal, setNewAnimal] = useState<NewAnimalData>({
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
        arrivalDate: "",
        description: "",
        photos: [],
        documents: [],
    });

    if (!show) return null;

    const resetForm = () => {
        setNewAnimal({
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
            arrivalDate: "",
            description: "",
            photos: [],
            documents: [],
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log(newAnimal);

            await animalVM.addAnimal(
                shelterId,
                newAnimal.name,
                newAnimal.species as AnimalSpecies,
                newAnimal.breed,
                newAnimal.gender as AnimalGender,
                Number(newAnimal.age),
                Number(newAnimal.weight),
                newAnimal.size as AnimalSize,
                newAnimal.isHealthy,
                newAnimal.isVaccinated,
                newAnimal.isSterilized,
                newAnimal.adoptionStatus as AdoptionStatus,
                new Date(),
                newAnimal.description,
                newAnimal.photos,
                newAnimal.documents
            );

            onSubmit();
            handleClose();
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
            onClick={handleClose}
        >
            {/* ------------- SHARED STYLES ------------- */}
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

            {/* ------------- MODAL ------------- */}
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
                {/* X CLOSE */}
                <button
                    onClick={handleClose}
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

                <h2
                    className="text-center mb-3"
                    style={{ color: "rgba(24,67,29,0.85)", fontWeight: "700" }}
                >
                    Додати тварину
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* NAME */}
                    <div className="mb-3">
                        <label>Ім'я</label>
                        <input
                            className="form-control input-glass"
                            value={newAnimal.name}
                            onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
                            required
                        />
                    </div>

                    {/* SPECIES */}
                    <div className="mb-3">
                        <label>Вид</label>
                        <input
                            className="form-control input-glass"
                            value={newAnimal.species}
                            onChange={(e) =>
                                setNewAnimal({ ...newAnimal, species: e.target.value as AnimalSpecies })
                            }
                            placeholder="Собака / Кіт"
                            required
                        />
                    </div>

                    {/* BREED */}
                    <div className="mb-3">
                        <label>Порода</label>
                        <input
                            className="form-control input-glass"
                            value={newAnimal.breed}
                            onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })}
                        />
                    </div>

                    {/* GENDER */}
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
                                        checked={newAnimal.gender === g}
                                        onChange={(e) =>
                                            setNewAnimal({
                                                ...newAnimal,
                                                gender: e.target.value as AnimalGender,
                                            })
                                        }
                                        required
                                    />
                                    <label className="form-check-label">{g}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AGE */}
                    <div className="mb-3">
                        <label>Вік (роки)</label>
                        <input
                            type="number"
                            className="form-control input-glass"
                            value={newAnimal.age}
                            min = {0}
                            onChange={(e) => setNewAnimal({ ...newAnimal, age: Number(e.target.value) })}
                            required
                        />
                    </div>

                    {/* WEIGHT */}
                    <div className="mb-3">
                        <label>Вага (кг)</label>
                        <input
                            type="number"
                            className="form-control input-glass"
                            value={newAnimal.weight}
                            min = {0}
                            onChange={(e) => setNewAnimal({ ...newAnimal, weight: Number(e.target.value) })}
                            required
                        />
                    </div>

                    {/* SIZE */}
                    <div className="mb-3">
                        <label>Розмір</label>
                        <select
                            className="form-control input-glass"
                            value={newAnimal.size}
                            onChange={(e) =>
                                setNewAnimal({ ...newAnimal, size: Number(e.target.value) as AnimalSize })
                            }
                            required
                        >
                            <option value="">Оберіть розмір</option>
                            {Object.entries(AnimalSize)
                                .filter(([_, v]) => typeof v === "number")
                                .map(([label, value]) => (
                                    <option key={value} value={value}>
                                        {animalSizeLabels[value as AnimalSize]}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* ARRIVAL */}
                    {/*<div className="mb-3">
                        <label>Дата прибуття</label>
                        <input
                            type="date"
                            className="form-control input-glass"
                            value={newAnimal.arrivalDate}
                            onChange={(e) => setNewAnimal({ ...newAnimal, arrivalDate: e.target.value })}
                            required
                        />
                    </div>*/}

                    {/* DESCRIPTION */}
                    <div className="mb-3">
                        <label>Опис</label>
                        <textarea
                            className="form-control input-glass"
                            rows={3}
                            value={newAnimal.description}
                            onChange={(e) =>
                                setNewAnimal({ ...newAnimal, description: e.target.value })
                            }
                        />
                    </div>

                    {/* FILES */}
                    <div className="mb-3">
                        <label>Фотографії</label>
                        <input
                            type="file"
                            multiple
                            className="form-control input-glass"
                            onChange={(e) =>
                                setNewAnimal({
                                    ...newAnimal,
                                    photos: e.target.files ? Array.from(e.target.files) : [],
                                })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label>Документи</label>
                        <input
                            type="file"
                            multiple
                            className="form-control input-glass"
                            onChange={(e) =>
                                setNewAnimal({
                                    ...newAnimal,
                                    documents: e.target.files ? Array.from(e.target.files) : [],
                                })
                            }
                        />
                    </div>

                    {/* CHECKBOXES */}
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={newAnimal.isHealthy}
                            onChange={(e) => setNewAnimal({ ...newAnimal, isHealthy: e.target.checked })}
                        />
                        <label className="form-check-label">Здорова/ий</label>
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={newAnimal.isVaccinated}
                            onChange={(e) => setNewAnimal({ ...newAnimal, isVaccinated: e.target.checked })}
                        />
                        <label className="form-check-label">Вакцинована/ий</label>
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={newAnimal.isSterilized}
                            onChange={(e) => setNewAnimal({ ...newAnimal, isSterilized: e.target.checked })}
                        />
                        <label className="form-check-label">Стерилізована/кастрований</label>
                    </div>

                    {/* ADOPTION STATUS */}
                    <div className="mb-4">
                        <label>Статус усиновлення</label>
                        <select
                            className="form-control input-glass"
                            value={newAnimal.adoptionStatus}
                            onChange={(e) =>
                                setNewAnimal({
                                    ...newAnimal,
                                    adoptionStatus: Number(e.target.value) as AdoptionStatus,
                                })
                            }
                            required
                        >
                            {Object.entries(AdoptionStatus)
                                .filter(([_, v]) => typeof v === "number")
                                .map(([label, value]) => (
                                    <option key={value} value={value}>
                                        {adoptionStatusLabels[value as AdoptionStatus]}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-gradient w-100 py-3">
                        Додати тварину
                    </button>
                </form>
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default AddAnimalForm;
