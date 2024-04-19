import React from "react";

const Grid = ({ children }) => {
    return (
        <div className="max-w-5xl mx-auto mt-10">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
                {children}
            </div>
        </div>
    );
};

export default Grid;
