import React, {useCallback} from 'react';

function Search({ onSearch }) {
    const handleInput = useCallback((e) => {
        onSearch(e.target.value);
    }, [onSearch]);

    return (
        <div className={"absolute top-0 right-0 p-10 max-w-md w-full"}>
            <input
                type="text"
                className={" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"}
                placeholder="Search..."
                onChange={handleInput}
            />
        </div>
    );
}

export default Search;