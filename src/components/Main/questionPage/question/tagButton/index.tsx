import { TagParamType } from "../../../../../types/types";

/**
 * Props for the `TagButton` component.
 */
interface TagButtonProps {
    tid: string;
    getTagById: (tid: string) => TagParamType | null;
    handleTagClick: (event: React.MouseEvent<HTMLButtonElement>, tagName: string) => void;
}

/**
 * A button component for displaying tags in a question.
 * @param {TagButtonProps} param0 - The props for the component.
 * @returns The rendered tag button element.
 */
const TagButton = ({ tid, getTagById, handleTagClick }: TagButtonProps): JSX.Element => {
    const tagName = getTagById(tid)?.name || "Unknown";

    return (
        <button className="question_tag_button"
            onClick={(event) => handleTagClick(event, tagName)}>
            {tagName}
        </button>
    );
};

export default TagButton;
