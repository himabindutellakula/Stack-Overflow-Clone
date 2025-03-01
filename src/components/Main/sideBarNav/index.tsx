import { useCallback } from "react";
import "./index.css";
import { SideBarNavProps } from "../../../types/types";

/**
 * The SideBarNav component renders the side bar navigation
 * @param param0 the input props for the SideBarNav component.
 * The selected prop is used to highlight the selected menu item.
 * The functions in the props are used to set the page instance.
 * @returns SideBarNav component
 */
const SideBarNav = ({ selected = "", handleQuestions, handleTags }: SideBarNavProps) => {
    const handleKeyDown = useCallback((e: { key: string; }, handler: () => void) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handler();
        }
    }, []);
    
    return (
        <div id="sideBarNav" className="sideBarNav">
            <div
                id="menu_question"
                className={`menu_button ${
                    selected === "q" ? "menu_selected" : ""
                }`}
                onClick={handleQuestions}
                onKeyDown={(e) => handleKeyDown(e, handleQuestions)}
                role="button"
                tabIndex={0}
            >
                Questions
            </div>
            <div
                id="menu_tag"
                className={`menu_button ${
                    selected === "t" ? "menu_selected" : ""
                }`}
                onClick={handleTags}
                onKeyDown={(e) => handleKeyDown(e, handleTags)}
                role="button"
                tabIndex={0}
            >
                Tags
            </div>
        </div>
    );
};

export default SideBarNav;
