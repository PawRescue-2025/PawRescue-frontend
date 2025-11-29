import React, { useEffect, useState } from "react";
import ResourcesViewModel from "../ViewModels/ResourcesViewModel";
import { useParams } from "react-router-dom";

const vm = new ResourcesViewModel();

interface Resource {
    id: number;
    shelterId: number;
    category: string;
    name: string;
    description: string;
    isPresent: boolean;
}

const ResourcesPage: React.FC = () => {
    const { shelterId } = useParams();
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editResource, setEditResource] = useState<Resource | null>(null);

    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPresent, setIsPresent] = useState(true);

    const loadResources = async () => {
        setLoading(true);
        const data = await vm.getResourcesByShelter(Number(shelterId));
        setResources(data);
        setLoading(false);
    };

    useEffect(() => {
        loadResources();
    }, [shelterId]);

    const openAddModal = () => {
        setEditResource(null);
        setCategory("");
        setName("");
        setDescription("");
        setIsPresent(true);
        setIsModalOpen(true);
    };

    const openEditModal = (r: Resource) => {
        setEditResource(r);
        setCategory(r.category);
        setName(r.name);
        setDescription(r.description);
        setIsPresent(r.isPresent);
        setIsModalOpen(true);
    };

    const saveResource = async () => {
        if (!category || !name || !description){
            alert("Будь ласка, заповніть усі поля!");
            return
        }
        if (editResource) {
            await vm.editResourceDescription(editResource.id, description);
            if (editResource.isPresent !== isPresent) {
                await vm.editResourceIsPresent(editResource.id);
            }
        } else {
            await vm.addResource(
                Number(shelterId),
                category,
                name,
                description,
                isPresent
            );
        }
        setIsModalOpen(false);
        loadResources();
    };

    const deleteResource = async (id: number) => {
        if (window.confirm("Ви дійсно хочете видалити цей ресурс?")) {
            await vm.deleteResource(id);
            loadResources();
        }
    };

    const togglePresent = async (id: number) => {
        await vm.editResourceIsPresent(id);
        loadResources();
    };

    const [sortField, setSortField] = useState<keyof Resource | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleSort = (field: keyof Resource) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const sortedResources = () => {
        if (!sortField) return resources;

        return [...resources].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }

            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
            }

            if (typeof aValue === "boolean" && typeof bValue === "boolean") {
                return sortOrder === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
            }

            return 0;
        });
    };

    return (
        <div
            className="d-flex justify-content-center align-items-start py-5"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #a8e9d3 0%, #76c9a7 50%)"
            }}
        >
            <style>{`
                .glass-card {
                    background: rgba(255,255,255,0.35);
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    border: 2px solid rgba(255,255,255,0.5);
                    box-shadow: 0 15px 50px rgba(0,0,0,0.15);
                    border-radius: 25px;
                    padding: 2rem;
                    width: 90vw;
                    min-height: 85vh;
                    margin-top: 50px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 1rem;
                    color: #0c3e2d;
                    text-align: center; /* центр по горизонталі */
                }
                
                th, td {
                    padding: 14px;
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                    vertical-align: middle; /* центр по вертикалі */
                }


                .btn-gradient {
                    background: rgba(12, 95, 61, 0.7);
                    border: none;
                    color: white;
                    font-weight: 600;
                    transition: 0.3s ease;
                    border-radius: 10px;
                    padding: 8px 16px;
                }

                .btn-gradient:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 30px rgba(45,134,89,0.5);
                    background: linear-gradient(135deg, #3fb573 0%, #52d98d 50%, #6effa7 100%);
                }

                .status-btn {
                    border: none;
                    padding: 6px 16px;
                    border-radius: 10px;
                    color: white;
                    cursor: pointer;
                }

                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0,0,0,0.4);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }

                .modal-window {
                    background: rgba(255,255,255,0.95);
                    border-radius: 20px;
                    padding: 25px;
                    width: 420px;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
                }

                input, textarea {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 12px;
                    border-radius: 10px;
                    border: 1px solid rgba(0,0,0,0.2);
                }
               
            `}</style>

            <div className="glass-card">
                <h1 className="text-center mb-4">Ресурси притулку</h1>

                <div className="mb-3">
                    <button className="btn-gradient" onClick={openAddModal}>
                        Додати ресурс
                    </button>
                </div>

                {loading ? (
                    <p>Завантаження...</p>
                ) : (
                    <table style={{tableLayout: "fixed", width: "100%"}}>
                        <thead>
                        <tr>
                            {(["category", "name", "description", "isPresent"] as (keyof Resource)[]).map((field) => (
                                <th
                                    key={field}
                                    onClick={() => handleSort(field)}
                                    style={{
                                        cursor: "pointer",
                                        width: "20%",
                                        background: sortField === field ? "rgba(63, 181, 115, 0.25)" : "rgba(255,255,255,0.35)",
                                        transition: "background 0.3s ease",
                                    }}
                                >
                                    {field === "category" ? "Категорія" :
                                        field === "name" ? "Назва" :
                                            field === "description" ? "Опис" :
                                                "Статус"}
                                    {sortField === field && (sortOrder === "asc" ? " ↑" : " ↓")}
                                </th>
                            ))}
                            <th style={{width: "20%", background: "rgba(255,255,255,0.35)"}}>Дії</th>
                        </tr>
                        </thead>

                        <tbody>
                        {sortedResources().map(r => (
                            <tr key={r.id}>
                                <td>{r.category}</td>
                                <td>{r.name}</td>
                                <td>{r.description}</td>
                                <td>
                                    <button
                                        className="status-btn"
                                        style={{background: r.isPresent ? "#1f6f5c" : "#8e2e24"}}
                                        onClick={() => togglePresent(r.id)}
                                    >
                                        {r.isPresent ? "Наявний" : "Відсутній"}
                                    </button>
                                </td>
                                <td style={{display: "flex", gap: 10, justifyContent: "center"}}>
                                    <button className="btn-gradient" onClick={() => openEditModal(r)}>Редагувати
                                    </button>
                                    <button className="btn-gradient" style={{background: "#e05d5d"}}
                                            onClick={() => deleteResource(r.id)}>Видалити
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                )}
            </div>

            {isModalOpen && (
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
                    onClick={() => setIsModalOpen(false)}
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
                            width: "450px",
                            maxHeight: "95vh",
                            overflowY: "auto",
                            borderRadius: "30px",
                            position: "relative"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
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
                            {editResource ? "Редагувати ресурс" : "Додати ресурс"}
                        </h2>

                        <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>

                            {!editResource && (
                                <>
                                    <div>
                                        <label>Категорія</label>
                                        <input
                                            className="form-control input-glass"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            placeholder="Введіть категорію..."
                                            required={!editResource}
                                        />
                                    </div>

                                    <div>
                                        <label>Назва</label>
                                        <input
                                            className="form-control input-glass"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Введіть назву..."
                                            required={!editResource}
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <label>Опис</label>
                                <textarea
                                    className="form-control input-glass"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Введіть опис..."
                                    rows={3}
                                />
                            </div>

                            <div style={{display: "flex", alignItems: "center"}}>
                                <input
                                    type="checkbox"
                                    checked={isPresent}
                                    onChange={() => setIsPresent(!isPresent)}
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        accentColor: "green",
                                        marginRight: "8px",
                                        cursor: "pointer"
                                    }}
                                />
                                <label style={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                    fontWeight: "500",
                                    marginTop: "-13px",
                                }}>
                                    Наявний
                                </label>

                            </div>


                            <button
                                onClick={saveResource}
                                className="btn btn-gradient w-100 py-2"
                            >
                                Зберегти
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ResourcesPage;
