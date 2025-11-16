import React, { useEffect, useState } from "react";
import UsefulLinkViewModel from "../ViewModels/UsefulLinkViewModel";
import AuthViewModel from "../ViewModels/AuthViewModel";

const linkVM = new UsefulLinkViewModel();
const authVM = new AuthViewModel();

interface UsefulLink {
    id: number;
    type: string;
    title: string;
    content: string;
}

const UsefulLinksPage: React.FC = () => {
    const [links, setLinks] = useState<UsefulLink[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const login = async () => {
            try {
                await authVM.logIn("test@test.com", "Qwerty123!");
            } catch (err: any) {
                setError(err.message || "Помилка при логіні");
            }
        };
        login();
    }, []);

    const [newLink, setNewLink] = useState<{ type: string; title: string; content: string }>({
        type: "",
        title: "",
        content: "",
    });

    const fetchLinks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await linkVM.getAllUsefulLinks();
            setLinks(data);
        } catch (err: any) {
            setError(err.message || "Помилка при завантаженні");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleAddLink = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await linkVM.addUsefulLink(newLink.type, newLink.title, newLink.content);
            setNewLink({ type: "", title: "", content: "" });
            fetchLinks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await linkVM.deleteUsefulLink(id);
            fetchLinks();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Корисні посилання</h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/*<form onSubmit={handleAddLink} className="mb-6 space-y-2">*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        placeholder="Type"*/}
            {/*        value={newLink.type}*/}
            {/*        onChange={(e) => setNewLink({ ...newLink, type: e.target.value })}*/}
            {/*        className="border p-2 w-full"*/}
            {/*        required*/}
            {/*    />*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        placeholder="Title"*/}
            {/*        value={newLink.title}*/}
            {/*        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}*/}
            {/*        className="border p-2 w-full"*/}
            {/*        required*/}
            {/*    />*/}
            {/*    <textarea*/}
            {/*        placeholder="Content"*/}
            {/*        value={newLink.content}*/}
            {/*        onChange={(e) => setNewLink({ ...newLink, content: e.target.value })}*/}
            {/*        className="border p-2 w-full"*/}
            {/*        required*/}
            {/*    />*/}
            {/*    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">*/}
            {/*        Додати посилання*/}
            {/*    </button>*/}
            {/*</form>*/}

            {loading ? (
                <p>Завантаження...</p>
            ) : (
                <ul className="space-y-4">
                    {links.map((link) => (
                        <li key={link.id} className="border p-4 rounded shadow">
                            <h2 className="font-semibold">{link.title}</h2>
                            <p className="text-gray-600">{link.content}</p>
                            <p className="text-sm italic">Type: {link.type}</p>
                            <button
                                onClick={() => handleDelete(link.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                            >
                                Видалити
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsefulLinksPage;
