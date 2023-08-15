import { useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";

// Components
import SearchBar from "./SearchBar";
import SearchLanding from "./SearchLanding";
import SearchActive from "./SearchActive";

// Atoms
import { currentSearchData, currentSearchTerm } from "../../../atoms/searchAtom";

// Hooks
import { debounce } from "lodash";
import useSpotify from "@/hooks/useSpotify";

const SearchView = () => {
    const [ searchInput, setSearchInput ] = useRecoilState(currentSearchTerm);
    const [ searchData, setSearchData ] = useRecoilState(currentSearchData);
    const spotifyApi = useSpotify();
    useEffect(() => {
        if(searchInput.length > 0) {
            debouncedSearchResults(searchInput);
        } else {
            setSearchData(false);
        }
    }, [searchInput])
    

    const debouncedSearchResults = useCallback(
        debounce((searchInput) => {
            spotifyApi.search(searchInput, ['artist', 'track'], { limit: 4 }).then((data) => {
                setSearchData(data.body);
            });
        }, 1000), []
    );



    return (
        <div className={`bg-neutral-800 px-5 py-10`}>
            <div className="w-full mb-5">
                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
            </div>
            {
                searchInput.length > 0 ? (
                    <SearchActive />
                ) : (
                    <SearchLanding />
                ) 
            }
            
        </div>
    );
}

export default SearchView;