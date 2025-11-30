import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AnimalViewModel from "../ViewModels/AnimalViewModel";
import { AdoptionStatus } from "../Enums/AdoptionStatus";

const animalVM = new AnimalViewModel();

interface EditAnimalFormProps {
    show: boolean;
    animal: any;
    onClose: () => void;
    onSubmit: () => void;
}

interface EditAnimalData {
    name: string;
    age: number | "";
    weight: number | "";
    description: string;
    photos: File[];
    documents: File[];
    isHealthy: boolean;
    isVaccinated: boolean;
    isSterilized: boolean;
    adoptionStatus: AdoptionStatus;
}

const adoptionStatusLabels: { [key in AdoptionStatus]: string } = {
    [AdoptionStatus.NotAvailableForAdoption]: "Недоступно до всиновлення",
    [AdoptionStatus.AvailableForAdoption]: "Доступно до всиновлення",
    [AdoptionStatus.Adopted]: "Всиновлено",
    [AdoptionStatus.CurrentlyFostered]: "На перетримці",
};

const EditAnimalForm: React.FC<EditAnimalFormProps> = ({ show, animal, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<EditAnimalData>({
        name: "",
        age: "",
        weight: "",
        description: "",
        photos: [],
        documents: [],
        isHealthy: true,
        isVaccinated: true,
        isSterilized: true,
        adoptionStatus: AdoptionStatus.AvailableForAdoption,
    });

    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [documentPreviews, setDocumentPreviews] = useState<string[]>([]); // optional, if you want previews for docs

    useEffect(() => {
        if (animal) {
            setFormData({
                name: animal.name || "",
                age: animal.age || "",
                weight: animal.weight || "",
                description: animal.description || "",
                photos: [], // new files
                documents: [], // new files
                isHealthy: animal.isHealthy ?? true,
                isVaccinated: animal.isVaccinated ?? true,
                isSterilized: animal.isSterilized ?? true,
                adoptionStatus: animal.adoptionStatus ?? AdoptionStatus.AvailableForAdoption,
            });

            // ➤ Set existing photo URLs for preview
            setPhotoPreviews(animal.photos || []);
            setDocumentPreviews(animal.documents || []);
        }
    }, [animal]);

// When user selects new photos
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setFormData({ ...formData, photos: files });

        // Create temporary URLs for preview
        const urls = files.map((file) => URL.createObjectURL(file));
        setPhotoPreviews(urls);
    };

    // Обробник вибору документів
    const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setFormData({ ...formData, documents: files });

        // Створюємо прев'ю для документів (можна показати іконку або назву файлу)
        const urls = files.map((file) => URL.createObjectURL(file));
        setDocumentPreviews(urls);
    };




    if (!show) return null;

    const handleClose = () => {
        setFormData({
            name: "",
            age: "",
            weight: "",
            description: "",
            photos: [],
            documents: [],
            isHealthy: true,
            isVaccinated: true,
            isSterilized: true,
            adoptionStatus: AdoptionStatus.AvailableForAdoption,
        });
        onClose();
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await animalVM.editAnimal(
                animal.id,
                animal.shelterId,
                formData.name,
                animal.species,
                animal.breed,
                animal.gender,
                Number(formData.age),
                Number(formData.weight),
                animal.size,
                formData.isHealthy,
                formData.isVaccinated,
                formData.isSterilized,
                formData.adoptionStatus,
                new Date(animal.arrivalDate),
                formData.description,
                formData.photos,
                formData.documents
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
                    Редагувати тварину
                </h2>

                <form onSubmit={handleSave}>
                    <div className="mb-3">
                        <label>Ім'я</label>
                        <input
                            className="form-control input-glass"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Вік (роки)</label>
                        <input
                            type="number"
                            className="form-control input-glass"
                            value={formData.age}
                            min={0}
                            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Вага (кг)</label>
                        <input
                            type="number"
                            className="form-control input-glass"
                            value={formData.weight}
                            min={0}
                            onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Опис</label>
                        <textarea
                            className="form-control input-glass"
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Фотографії</label>
                        <input
                            type="file"
                            multiple
                            className="form-control input-glass"
                            onChange={handlePhotoChange}
                        />
                    </div>

                    {/* Display photo previews */}
                    <div className="mb-3 d-flex flex-wrap gap-2">
                        {photoPreviews.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`Preview ${idx}`}
                                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
                            />
                        ))}
                    </div>


                    <div className="mb-3">
                        <label>Документи</label>
                        <input
                            type="file"
                            multiple
                            className="form-control input-glass"
                            onChange={handleDocumentChange}
                        />
                    </div>

                    {/* Display document previews */}
                    <div className="mb-3 d-flex flex-wrap gap-2">
                        {documentPreviews.map((src, idx) => (
                            <div
                                key={idx}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    border: "1px solid rgba(0,0,0,0.1)",
                                    borderRadius: "10px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    padding: "5px",
                                    background: "#f7f7f7",
                                    overflow: "hidden",
                                }}
                            >
                                <span style={{ fontSize: "12px" }}>{formData.documents[idx]?.name}</span>
                            </div>
                        ))}
                    </div>


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
                                        {adoptionStatusLabels[value as AdoptionStatus]}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-gradient w-100 py-3">
                        Зберегти
                    </button>
                </form>
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default EditAnimalForm;
