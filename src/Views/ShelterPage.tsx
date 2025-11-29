import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import ShelterViewModel from "../ViewModels/ShelterViewModel";
import AnimalViewModel from "../ViewModels/AnimalViewModel";

import AddAnimalForm from "../Components/AddAnimalForm";
import EditShelterForm from "../Components/EditShelterForm";
import EditAnimalForm from "../Components/EditAnimalForm";
import AnimalCard from "../Components/AnimalCard";

import { AnimalGender } from "../Enums/AnimalGender";
import { AnimalSize } from "../Enums/AnimalSize";
import { AdoptionStatus } from "../Enums/AdoptionStatus";

const shelterVM = new ShelterViewModel();
const animalVM = new AnimalViewModel();

const ShelterPage: React.FC = () => {
    const { shelterId } = useParams();
    const loggedUserId = localStorage.getItem("userId");

    const [shelter, setShelter] = useState<any>(null);
    const [animals, setAnimals] = useState<any[]>([]);
    const [showAddAnimal, setShowAddAnimal] = useState(false);
    const [showEditShelter, setShowEditShelter] = useState(false);

    // Edit animal modal
    const [showEditAnimal, setShowEditAnimal] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState<any>(null);

    // filters
    const [filterSpecies, setFilterSpecies] = useState<string>("");
    const [filterGender, setFilterGender] = useState<AnimalGender | "">("");
    const [filterSize, setFilterSize] = useState<AnimalSize | "">("");
    const [filterHealthy, setFilterHealthy] = useState<boolean | "">("");
    const [filterVaccinated, setFilterVaccinated] = useState<boolean | "">("");
    const [filterSterilized, setFilterSterilized] = useState<boolean | "">("");
    const [filterAdoptionStatus, setFilterAdoptionStatus] = useState<AdoptionStatus | "">("");

    const [searchQuery, setSearchQuery] = useState("");
    const [sortNewest, setSortNewest] = useState(true);

    const fetchShelterData = async () => {
        if (!shelterId) return;

        const data = await shelterVM.getShelterById(Number(shelterId));
        setShelter(data);

        if (data?.id) {
            const list = await animalVM.getAnimalsByShelter(data.id);
            setAnimals(list);
        }
    };

    useEffect(() => {
        fetchShelterData();
    }, [shelterId]);

    if (!shelter) return <p className="text-center py-5">Завантаження...</p>;

    const isOwner = loggedUserId === String(shelter.ownerId);

    const filteredAnimals = animals
        .filter(a => !filterSpecies || a.species.toLowerCase().includes(filterSpecies.toLowerCase()))
        .filter(a => !filterGender || a.gender === filterGender)
        .filter(a => !filterSize || a.size === filterSize)
        .filter(a => filterHealthy === "" || a.isHealthy === filterHealthy)
        .filter(a => filterVaccinated === "" || a.isVaccinated === filterVaccinated)
        .filter(a => filterSterilized === "" || a.isSterilized === filterSterilized)
        .filter(a => filterAdoptionStatus === "" || a.adoptionStatus === filterAdoptionStatus)
        .filter(a =>
            !searchQuery ||
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.species.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const d1 = new Date(a.arrivalDate).getTime();
            const d2 = new Date(b.arrivalDate).getTime();
            return sortNewest ? d2 - d1 : d1 - d2;
        });

    return (
        <div
            className="d-flex justify-content-center py-5"
            style={{ minHeight: "100vh", background: "linear-gradient(135deg, #a8e9d3 0%, #76c9a7 50%)" }}
        >
            {/* ----------- STYLES ----------- */}
            <style>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(25px);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    border-radius: 20px;
                    padding: 2rem;
                    width: 90vw;
                    min-height: 85vh;
                    margin-top: 50px;
                    position: relative;
                }
                .side-panel {
                    position: absolute;
                    right: 2rem;
                    top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .btn-gradient {
                    border-radius: 12px;
                    padding: 0.6rem 1rem;
                    background: rgba(12,95,61,0.7);
                    color: white;
                    border: none;
                    font-weight: 600;
                    transition: 0.3s ease;
                }
                .btn-gradient:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 25px rgba(45,134,89,0.5);
                    background: linear-gradient(135deg, #3fb573 0%, #52d98d 50%, #6effa7 100%);
                }
                .filters-dropdowns {
                    margin-top: 1.5rem;
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                .filters-dropdowns select,
                .filters-dropdowns input {
                    padding: 0.5rem 0.8rem;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.25);
                    border: 1px solid rgba(0,0,0,0.2);
                    backdrop-filter: blur(10px);
                }
                .animals-container {
                    margin-top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 100%;
                }
            `}</style>

            {/* ----------- MAIN SHELTER CARD ----------- */}
            <div className="glass-card">

                {/* ----------- SIDE PANEL ----------- */}
                <div className="side-panel">
                    {isOwner && (
                        <>
                            <button className="btn-gradient" onClick={() => setShowEditShelter(true)}>
                                Редагувати притулок
                            </button>
                            <button className="btn-gradient" onClick={() => setShowAddAnimal(true)}>
                                Додати тварину
                            </button>
                        </>
                    )}

                    <Link to={`/profile/${shelter.ownerId}`} className="btn-gradient btn">
                        Профіль власника
                    </Link>
                </div>

                {/* ----------- HEADER ----------- */}
                <div>
                    <h2>{shelter.name}</h2>
                    <p>{shelter.description}</p>

                    <p><b>Контакти:</b> {shelter.contactPhone}, {shelter.contactEmail}</p>
                    {shelter.contactLink && (
                        <p><a href={shelter.contactLink} target="_blank" rel="noreferrer">{shelter.contactLink}</a></p>
                    )}

                    <p><b>Локація:</b> {shelter.location}</p>
                </div>

                {/* ----------- FILTERS ----------- */}
                <div className="filters-dropdowns">
                    <input
                        placeholder="Пошук..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />

                    <select value={filterSpecies} onChange={e => setFilterSpecies(e.target.value)}>
                        <option value="">Вид</option>
                        {Array.from(new Set(animals.map(a => a.species))).map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>

                    <select value={filterGender} onChange={e => setFilterGender(e.target.value as AnimalGender)}>
                        <option value="">Стать</option>
                        {Object.values(AnimalGender).map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>

                    <select value={filterSize} onChange={e => setFilterSize(Number(e.target.value) as AnimalSize)}>
                        <option value="">Розмір</option>
                        {Object.entries(AnimalSize)
                            .filter(([k, v]) => typeof v === "number")
                            .map(([label, value]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                    </select>

                    <select value={filterAdoptionStatus} onChange={e => setFilterAdoptionStatus(Number(e.target.value) as AdoptionStatus)}>
                        <option value="">Статус</option>
                        {Object.entries(AdoptionStatus)
                            .filter(([k, v]) => typeof v === "number")
                            .map(([label, value]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                    </select>

                    <select value={filterHealthy === "" ? "" : filterHealthy ? "true" : "false"}
                            onChange={e => setFilterHealthy(e.target.value === "" ? "" : e.target.value === "true")}>
                        <option value="">Здоровий</option>
                        <option value="true">Так</option>
                        <option value="false">Ні</option>
                    </select>

                    <select value={filterVaccinated === "" ? "" : filterVaccinated ? "true" : "false"}
                            onChange={e => setFilterVaccinated(e.target.value === "" ? "" : e.target.value === "true")}>
                        <option value="">Вакцинований</option>
                        <option value="true">Так</option>
                        <option value="false">Ні</option>
                    </select>

                    <select value={filterSterilized === "" ? "" : filterSterilized ? "true" : "false"}
                            onChange={e => setFilterSterilized(e.target.value === "" ? "" : e.target.value === "true")}>
                        <option value="">Стерилізований</option>
                        <option value="true">Так</option>
                        <option value="false">Ні</option>
                    </select>

                    <select value={sortNewest ? "newest" : "oldest"} onChange={e => setSortNewest(e.target.value === "newest")}>
                        <option value="newest">Новіші</option>
                        <option value="oldest">Старіші</option>
                    </select>
                </div>

                {/* ----------- ANIMALS ----------- */}
                <div className="animals-container">
                    {filteredAnimals.length === 0 ? (
                        <p className="text-center">Тварин не знайдено</p>
                    ) : (
                        filteredAnimals.map(animal => (
                            <AnimalCard
                                key={animal.id}
                                animal={animal}
                                isOwner={isOwner}
                                onEdit={() => {
                                    setSelectedAnimal(animal);
                                    setShowEditAnimal(true);
                                }}
                            />
                        ))
                    )}
                </div>

            </div>

            {/* ----------- MODALS ----------- */}
            <AddAnimalForm
                show={showAddAnimal}
                onClose={() => setShowAddAnimal(false)}
                onSubmit={fetchShelterData}
            />

            <EditShelterForm
                show={showEditShelter}
                shelter={shelter}
                onClose={() => setShowEditShelter(false)}
                onSaved={fetchShelterData}
            />

            {selectedAnimal && (
                <EditAnimalForm
                    show={showEditAnimal}
                    animal={selectedAnimal}
                    onClose={() => setShowEditAnimal(false)}
                    onSubmit={fetchShelterData}
                />
            )}
        </div>
    );
};

export default ShelterPage;

/*
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import ShelterViewModel from "../ViewModels/ShelterViewModel";
import AnimalViewModel from "../ViewModels/AnimalViewModel";

import AddAnimalForm from "../Components/AddAnimalForm";
import EditShelterForm from "../Components/EditShelterForm";
import AnimalCard from "../Components/AnimalCard";

import { AnimalGender } from "../Enums/AnimalGender";
import { AnimalSize } from "../Enums/AnimalSize";
import { AdoptionStatus } from "../Enums/AdoptionStatus";

const shelterVM = new ShelterViewModel();
const animalVM = new AnimalViewModel();

const ShelterPage: React.FC = () => {
    const { shelterId } = useParams();
    const loggedUserId = localStorage.getItem("userId");

    const [shelter, setShelter] = useState<any>(null);
    const [animals, setAnimals] = useState<any[]>([]);
    const [showAddAnimal, setShowAddAnimal] = useState(false);
    const [showEditShelter, setShowEditShelter] = useState(false);

    // filters
    const [filterSpecies, setFilterSpecies] = useState<string>("");
    const [filterGender, setFilterGender] = useState<AnimalGender | "">("");
    const [filterSize, setFilterSize] = useState<AnimalSize | "">("");
    const [filterHealthy, setFilterHealthy] = useState<boolean | "">("");
    const [filterVaccinated, setFilterVaccinated] = useState<boolean | "">("");
    const [filterSterilized, setFilterSterilized] = useState<boolean | "">("");
    const [filterAdoptionStatus, setFilterAdoptionStatus] = useState<AdoptionStatus | "">("");

    const [searchQuery, setSearchQuery] = useState("");
    const [sortNewest, setSortNewest] = useState(true);


    const fetchShelterData = async () => {
        if (!shelterId) return;

        const data = await shelterVM.getShelterById(Number(shelterId));
        setShelter(data);

        if (data?.id) {
            console.log(data.id);
            const list = await animalVM.getAnimalsByShelter(data.id);
            setAnimals(list);
            console.log(animals);
        }
    };

    useEffect(() => {
        fetchShelterData();
    }, [shelterId]);

    if (!shelter) return <p className="text-center py-5">Завантаження...</p>;

    const isOwner = loggedUserId === String(shelter.ownerId);

    const filteredAnimals = animals
        .filter(a => !filterSpecies || a.species.toLowerCase().includes(filterSpecies.toLowerCase()))
        .filter(a => !filterGender || a.gender === filterGender)
        .filter(a => !filterSize || a.size === filterSize)
        .filter(a => filterHealthy === "" || a.isHealthy === filterHealthy)
        .filter(a => filterVaccinated === "" || a.isVaccinated === filterVaccinated)
        .filter(a => filterSterilized === "" || a.isSterilized === filterSterilized)
        .filter(a => filterAdoptionStatus === "" || a.adoptionStatus === filterAdoptionStatus)
        .filter(a =>
            !searchQuery ||
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const d1 = new Date(a.arrivalDate).getTime();
            const d2 = new Date(b.arrivalDate).getTime();
            return sortNewest ? d2 - d1 : d1 - d2;
        });

    return (
        <div
            className="d-flex justify-content-center py-5"
            style={{ minHeight: "100vh", background: "linear-gradient(135deg, #a8e9d3 0%, #76c9a7 50%)" }}
        >
            {/!* ----------- STYLES ----------- *!/}
            <style>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(25px);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    border-radius: 20px;
                    padding: 2rem;
                    width: 90vw;
                    min-height: 85vh;
                    margin-top: 50px;
                    position: relative;
                }
                .side-panel {
                    position: absolute;
                    right: 2rem;
                    top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .btn-gradient {
                    border-radius: 12px;
                    padding: 0.6rem 1rem;
                    background: rgba(12,95,61,0.7);
                    color: white;
                    border: none;
                    font-weight: 600;
                    transition: 0.3s ease;
                }
                .btn-gradient:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 25px rgba(45,134,89,0.5);
                    background: linear-gradient(135deg, #3fb573 0%, #52d98d 50%, #6effa7 100%);
                }
                .filters-dropdowns {
                    margin-top: 1.5rem;
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                .filters-dropdowns select,
                .filters-dropdowns input {
                    padding: 0.5rem 0.8rem;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.25);
                    border: 1px solid rgba(0,0,0,0.2);
                    backdrop-filter: blur(10px);
                }
                .animals-container {
                    margin-top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 100%;
                }
            `}</style>

            {/!* ----------- MAIN SHELTER CARD ----------- *!/}
            <div className="glass-card">

                {/!* ----------- SIDE PANEL ----------- *!/}
                <div className="side-panel">
                    {isOwner && (
                        <>
                            <button className="btn-gradient" onClick={() => setShowEditShelter(true)}>
                                Редагувати притулок
                            </button>
                            <Link to={`/resource/shelter/${shelter.id}`} className="btn-gradient btn">
                                Ресурси
                            </Link>
                            <button className="btn-gradient" onClick={() => setShowAddAnimal(true)}>
                                Додати тварину
                            </button>
                        </>
                    )}

                    <Link to={`/user/${shelter.ownerId}`} className="btn-gradient btn">
                        Профіль власника
                    </Link>
                </div>

                {/!* ----------- HEADER ----------- *!/}
                <div>
                    <h2>{shelter.name}</h2>
                    <p>{shelter.description}</p>

                    <p><b>Контакти:</b> {shelter.contactPhone}, {shelter.contactEmail}</p>
                    {shelter.contactLink && (
                        <p><a href={shelter.contactLink} target="_blank">{shelter.contactLink}</a></p>
                    )}

                    <p><b>Локація:</b> {shelter.location}</p>
                </div>

                {/!* ----------- FILTERS ----------- *!/}
                <div className="filters-dropdowns">
                    <input
                        placeholder="Пошук..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />

                    <select value={filterSpecies} onChange={e => setFilterSpecies(e.target.value)}>
                        <option value="">Вид</option>
                        {Array.from(new Set(animals.map(a => a.species))).map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>

                    <select value={filterGender} onChange={e => setFilterGender(e.target.value as AnimalGender)}>
                        <option value="">Стать</option>
                        {Object.values(AnimalGender).map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>

                    <select value={filterSize} onChange={e => setFilterSize(Number(e.target.value) as AnimalSize)}>
                        <option value="">Розмір</option>
                        {Object.entries(AnimalSize)
                            .filter(([k, v]) => typeof v === "number")
                            .map(([label, value]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                    </select>

                    <select value={filterAdoptionStatus} onChange={e => setFilterAdoptionStatus(Number(e.target.value) as AdoptionStatus)}>
                        <option value="">Статус</option>
                        {Object.entries(AdoptionStatus)
                            .filter(([k, v]) => typeof v === "number")
                            .map(([label, value]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                    </select>

                    {/!* ---------- Нові фільтри ---------- *!/}
                    <select value={filterHealthy === "" ? "" : filterHealthy ? "true" : "false"}
                            onChange={e => setFilterHealthy(e.target.value === "" ? "" : e.target.value === "true")}>
                        <option value="">Здоровий</option>
                        <option value="true">Так</option>
                        <option value="false">Ні</option>
                    </select>

                    <select value={filterVaccinated === "" ? "" : filterVaccinated ? "true" : "false"}
                            onChange={e => setFilterVaccinated(e.target.value === "" ? "" : e.target.value === "true")}>
                        <option value="">Вакцинований</option>
                        <option value="true">Так</option>
                        <option value="false">Ні</option>
                    </select>

                    <select value={filterSterilized === "" ? "" : filterSterilized ? "true" : "false"}
                            onChange={e => setFilterSterilized(e.target.value === "" ? "" : e.target.value === "true")}>
                        <option value="">Стерилізований</option>
                        <option value="true">Так</option>
                        <option value="false">Ні</option>
                    </select>

                    <select value={sortNewest ? "newest" : "oldest"} onChange={e => setSortNewest(e.target.value === "newest")}>
                        <option value="newest">Новіші</option>
                        <option value="oldest">Старіші</option>
                    </select>
                </div>


                {/!* ----------- ANIMALS ----------- *!/}
                <div className="animals-container">
                    {filteredAnimals.length === 0 ? (
                        <p className="text-center">Тварин не знайдено</p>
                    ) : (
                        filteredAnimals.map(animal => (
                            <AnimalCard
                                key={animal.id}
                                animal={animal}
                                isOwner={isOwner}
                            />
                        ))
                    )}
                </div>

            </div>

            {/!* ----------- MODALS ----------- *!/}
            <AddAnimalForm
                show={showAddAnimal}
                onClose={() => setShowAddAnimal(false)}
                onSubmit={fetchShelterData}
            />

            <EditShelterForm
                show={showEditShelter}
                shelter={shelter}
                onClose={() => setShowEditShelter(false)}
                onSaved={fetchShelterData}
            />

        </div>
    );
};

export default ShelterPage;
*/
