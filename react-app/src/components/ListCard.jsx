import React from "react";
import Grid from "./Grid.jsx";
import moment from "moment";
import Clamp from "react-multiline-clamp";

const ListCard = ({ data, onEdit, onDelete }) => {
    return (
        <div className="mt-40 md:mt-60">
            <div>
                <h3 className="text-white text-center text-2xl font-bold md:text-3xl">
                    Catatan Aktif
                </h3>
                <NoteActive data={data} onEdit={onEdit} onDelete={onDelete} />
            </div>
            <div className="mt-10">
                <h3 className="text-white text-center text-2xl font-bold md:text-3xl">
                    Arsip
                </h3>
                <NoteArchive data={data} onEdit={onEdit} onDelete={onDelete} />
            </div>
        </div>
    );
};

const NoteActive = ({ data, onEdit, onDelete }) => {
    const filterData = data.filter((note) => note.archived === false);
    if (filterData.length === 0) {
        return <span className={"flex justify-center mt-3 text-white text-2xl"}>Tidak ada catatan</span>;
    }
    return (
        <Grid>
            {filterData.map((note) => (
                <div
                    key={note.id}
                    className="flex flex-col justify-between max-w-sm p-6 bg-white border w-full border-gray-200 rounded-lg shadow"
                >
                    <div className="mb-3">
                        <h2 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
                            {note.title}
                        </h2>
                        <span className="font-sm text-gray-700">
                            {moment(note.createdAt).format("DD MMMM YYYY")}
                        </span>
                        <Clamp withTooltip lines={4}>
                            <p className="font-normal text-gray-800 mb-2 mt-3">
                                {note.body}
                            </p>
                        </Clamp>
                    </div>

                    <div className="flex flex-col space-y-2 mt-6">
                        <button
                            onClick={() => onEdit(note.id, { archived: true })}
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
                        >
                            Arsipkan
                        </button>
                        <button
                            onClick={() => onDelete(note.id)}
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </Grid>
    );
};

const NoteArchive = ({ data, onEdit, onDelete }) => {
    const filterData = data.filter((note) => note.archived === true);
    if (filterData.length === 0) {
        return <span className={"flex justify-center mt-3 text-white text-2xl"}>Tidak ada catatan</span>;
    }
    return (
        <Grid>
            {filterData.map((note) => (
                <div
                    key={note.id}
                    className="flex flex-col justify-between max-w-sm p-6 bg-white border w-full border-gray-200 rounded-lg shadow"
                >
                    <div className="mb-3">
                        <h2 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
                            {note.title}
                        </h2>
                        <span className="font-sm text-gray-700">
                            {moment(note.createdAt).format("DD MMMM YYYY")}
                        </span>
                        <Clamp withTooltip lines={4}>
                            <p className="font-normal text-gray-800 mb-2 mt-3">
                                {note.body}
                            </p>
                        </Clamp>
                    </div>

                    <div className="flex flex-col space-y-2 mt-6">
                        <button
                            onClick={() => onEdit(note.id, { archived: false })}
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
                        >
                            Batalkan Arsip
                        </button>
                        <button
                            onClick={() => onDelete(note.id)}
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </Grid>
    );
};

export default ListCard;
