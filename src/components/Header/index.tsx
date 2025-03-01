import "./index.css";
import { HeaderProps } from "../../types/types";
import { useHeader } from "../../hooks/useHeader";

/**
 * The Header component represents the top section of the application.
 * It includes a title and a search bar that allows users to search for questions.
 * 
 * @param {HeaderProps} param0 indicates the search term and the function to render
 * the page after the search term is entered
 * @returns the header component
 */
const Header = ({ search, setQuestionPage }: HeaderProps) => {
    const { val, handleInputChange, handleKeyDown, handleSearch } = useHeader(search, setQuestionPage);

    return (
        <div id="header" className="header">
            <div></div>
            <div className="title">Fake Stack Overflow</div>
            <input
                id="searchBar"
                placeholder="Search ..."
                type="text"
                value={val}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleKeyDown(e);   
                        handleSearch();
                    }
                }}
            />
        </div>
    );
};

export default Header;
