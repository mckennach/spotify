import { useRecoilValue } from "recoil";
import { currentSearchData } from "../../../atoms/searchAtom";
import SearchTopResult from "./SearchTopResult";

const SearchActive = () => {
    const searchData = useRecoilValue(currentSearchData);

    return (
        <div className="">
            <SearchTopResult searchData={searchData} />
        </div>
    )
}

export default SearchActive;