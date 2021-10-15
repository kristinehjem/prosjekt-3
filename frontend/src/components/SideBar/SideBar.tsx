import FilterBox from "../FilterBox/FilterBox";
import SearchField from "../SearchField/SearchField";

export default function Sidebar() {
    return (
        <div className="sidebar-wrapper">
            <SearchField></SearchField>
            <FilterBox></FilterBox>
        </div>
    )
}