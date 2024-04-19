import "./App.css";
import Banner from "./components/Banner";
import FormCard from "./components/FormCard.jsx";
import ListCard from "./components/ListCard.jsx";
import { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import { getInitialData } from "./utils/data";

function App() {
    const [data, setData] = useState(getInitialData());
    const [search, setSearch] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("data"));
        if (storedData) {
            setData(storedData);
        }
    }, []);

    const handleAdd = (newData) => {
        // localStorage.setItem("data", JSON.stringify([...data, newData]));
        // setData([...data, newData]);
        setData((prev) => [...prev, newData]);
    };

    const handleEdit = (id, updatedData) => {
        const newData = data.map((item) => {
            if (item.id === id) {
                return { ...item, ...updatedData };
            }
            return item;
        });
        setData(newData);
        // localStorage.setItem("data", JSON.stringify(newData));
        // window.location.reload();
    };

    const handleDelete = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        // localStorage.setItem("data", JSON.stringify(newData));
        // window.location.reload();
    };

    const handleSearch = (query) => {
        const filteredData = data.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        //
        setSearch(filteredData);
    };

    return (
        <>
            <div className="min-h-screen bg-[#13191F] pb-20">
                <Banner />
                <FormCard onSubmit={handleAdd} />

                <Search onSearch={handleSearch} />

                <ListCard
                    data={search.length !== 0 ? search : data}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </>
    );
}

export default App;
