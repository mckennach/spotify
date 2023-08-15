import { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


interface FormProps {
  onSubmit: (data: string) => void;
}


const SearchBar = ({ searchInput, setSearchInput }: { searchInput: string, setSearchInput: any }) => {

    return (
        <form className="w-3/4 md:w-5/12" onSubmit={(e) => e.preventDefault()}>   
            <label htmlFor="search" className="mb-2 text-sm font-medium text-neutral-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="flex-shrink-0 w-5 h-5 text-neutral-500 transition duration-75 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white" />
                </div>
                <input  
                    type="search" 
                    name="search"
                    id="search"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    className="block w-full p-3 pl-10 text-sm text-neutral-900 border outline-0 border-neutral-300 rounded-full bg-neutral-50 focus:ring-white focus:border-white dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-white dark:focus:border-white" placeholder="Search Mockups, Logos..." required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-white sr-only">Search</button>
            </div>
        </form>
    );
}

export default SearchBar;