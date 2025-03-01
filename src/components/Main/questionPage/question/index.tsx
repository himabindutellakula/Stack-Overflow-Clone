import "./index.css";
import { QuestionProps, TagParamType } from "../../../../types/types";
import { useQuestion } from "../../../../hooks/useQuestion";
import TagButton from "./tagButton";

/**
 * Interface defining the props for the `Question` component.
 */
interface qComponentProps {
    q: QuestionProps;
    getTagById: (tid: string) => TagParamType | null;
    clickTag?: (tagName: string) => void;
    handleAnswer?: (qid: string) => void;
}

/**
 * A component to display a question.
 * @param {qComponentProps} param0 - The props for the component.
 * @returns The rendered question component.
 */
const Question = ({ q, getTagById, clickTag, handleAnswer }: qComponentProps) => {
    const { handleQuestionClick, handleTagClick } = useQuestion(q, handleAnswer, clickTag);

    return (
        <div
            className="question right_padding"
            onClick={handleQuestionClick}
            role="button"
            tabIndex={0}
        >
            <div className="postStats">
                <div>{q.getAnswerCount()} answers</div>
                <div>{q.getQuestionViews()} views</div>
            </div>
            <div className="question_mid">
                <div className="postTitle">{q.title}</div>
                <div className="question_tags">
                    {q.getTagsId().map((tid) => (
                        <TagButton
                            key={tid}
                            tid={tid}
                            getTagById={getTagById}
                            handleTagClick={handleTagClick} />
                    ))}
                </div>
            </div>
            <div className="lastActivity">
                <div className="question_author">{q.askedBy}</div>
                <div>&nbsp;</div>
                <div className="question_meta">
                    asked {q.calculateTimeElapsed()}
                </div>
            </div>
        </div>
    );
};

export default Question;
