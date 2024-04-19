import { useState } from "react";

const FormCard = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [count, setCount] = useState(50);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newData = {
            id: Date.now(),
            title,
            body,
            archived: false,
            createdAt: new Date().toISOString(),
        };
        onSubmit(newData);
        setTitle('');
        setCount(50);
        setBody("");
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setCount(50 - e.target.value.length); // Menghitung jumlah karakter yang tersisa pada input field
    };

    return (
        <div className="max-w-2xl mx-auto w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md w-full h-full rounded-md p-5 md:p-10 flex flex-col"
            >
                <label htmlFor="title" className="mb-4 flex flex-col w-full">
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Judul
                    </label>
                    <div className={"flex"}>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            maxLength={50}
                            onChange={handleTitleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Tulis judul disini..."
                        />
                        <span className={"p-2 h-10 w-10 text-center ml-2 bg-gray-800 text-white rounded-md"}>{count}</span>
                    </div>
                </label>

                <label htmlFor="body">
                    <label
                        htmlFor="body"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Catatan
                    </label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tulisakan catatan disini..."
                    ></textarea>
                </label>

                <button
                    type="submit"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormCard;
