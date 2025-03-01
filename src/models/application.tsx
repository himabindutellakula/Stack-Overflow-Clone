import Question from "./question";
import Tag from "./tag";
import Answer from "./answer";
import { ApplicationInterface, ApplicationProps } from "../types/types";
import { SortingContext } from "../strategies/sortingContext";

/**
 * The class encapsulate the application data
 * and operations to manipulate the data.
 * The class is a singleton class.
 * All the data is stored in memory.
 * While this is an obvious limitation for large datasets
 * it is sufficient for a prototype such as this one.
 * @implements ApplicationInterface
 */

export default class Application implements ApplicationInterface {
    private static instance: Application;
    private _questions: Question[];
    private _tags: Tag[];
    private _answers: Answer[];

    /**
     * private constructor to create a singleton instance of the Application
     * @param data - the questions, tags, and answers to be stored in the application 
     * @returns the singleton instance of the Application class
     */
    private constructor({ questions, tags, answers }: ApplicationProps) {
        this._questions = [];
        this._tags = [];
        this._answers = [];

        answers.forEach((a) => {
            this._answers.push(new Answer(a));
        });

        questions.forEach((q) => {
            const question = new Question(q);
            // Compute `newAnsDate` for preexisting questions
            const latestAnswerDate = this.getLastAnsweredAt(q.ansIds);
            if (latestAnswerDate) {
                question.setNewestAnswerDate(latestAnswerDate);
            }

            this._questions.push(question);
        });

        tags.forEach((t) => {
            this._tags.push(new Tag(t));
        });
    }

    // Getters
    /**
     * Gets a copy of the list of questions.
     * Prevents direct modification of the internal `_questions` array.
     * 
     * @returns A copy of the questions array.
     */
    public get questions(): Question[] {
        return [...this._questions];
    }

    /**
     * Gets a copy of the list of tags.
     * Prevents direct modification of the internal `_tags` array.
     * 
     * @returns A copy of the tags array.
     */
    public get tags(): Tag[] {
        return [...this._tags];
    }

    /**
     * Gets a copy of the list of answers.
     * Prevents direct modification of the internal `_answers` array.
     * 
     * @returns A copy of the answers array.
     */
    public get answers(): Answer[] {
        return [...this._answers];
    }

    // Setters

    /**
     * Sets the list of questions.
     * Creates a new array to ensure immutability.
     * 
     * @param questions - The new list of questions.
     */
    public set questions(questions: Question[]) {
        this._questions = [...questions];
    }

    /**
     * Sets the list of tags.
     * Creates a new array to ensure immutability.
     * 
     * @param tags - The new list of tags.
     */
    public set tags(tags: Tag[]) {
        this._tags = [...tags];
    }

    /**
     * Sets the list of answers.
     * Creates a new array to ensure immutability.
     * 
     * @param answers - The new list of answers.
     */
    public set answers(answers: Answer[]) {
        this._answers = [...answers];
    }

    /**
     * getInstance method to get the singleton instance of the Application
     * @param data - the questions, tags, and answers 
     * to be stored in the application
     * @returns a singleton instance of the Application
     */
    public static getInstance(data: ApplicationProps): Application {
        if (!Application.instance) {
            Application.instance = new Application(data);
        }
        return Application.instance;
    }

    /**
     * saves a new answer for a selected question
     * @param qid an existing question id to add the answer to
     * @param answer answer to be added
     * @returns a unique id for the answer added
     */
    addAnswer = (qid: string, answer: { text: string; ansBy: string }) => {
        const question = this.questions.find(q => q.qid === qid);
        if (!question) return "";

        const aid = `ans-${this.answers.length + 1}`;
        const newAnswer = new Answer({ aid, ...answer, ansDate: new Date() });
        this.answers = [...this.answers, newAnswer];
        question.addAnswer(aid);
        question.setNewestAnswerDate(newAnswer.ansDate);
        return aid;
    };

    /**
     * saves a new question to the application
     * @param question - the question to be added
     * @returns a unique id for the question added
     */
    addQuestion = (question: {
        title: string;
        text: string;
        askedBy: string;
        tags: string[];
    }) => {
        const qid = `q-${this.questions.length + 1}`;

        // Convert tag names to tag IDs
        const tagIds = question.tags.map(tagName => this.addTag(tagName));

        const newQuestion = new Question({
            qid,
            ...question,
            tagIds, // Add tagIds here
            askDate: new Date(),
            ansIds: [],
            views: 0
        });

        this.questions = [...this.questions, newQuestion];
        return qid;
    };


    /**
     * adds a tag to a question if it does not exist
     * otherwise returns the tag id of an existing tagname
     * @param tagname - the name of the tag to be added
     * @returns existing tag or a new tag id
     */
    addTag = (tagname: string) => {
        let tag = this.tags.find(t => t.name === tagname);
        if (!tag) {
            const tid = `tag-${this.tags.length + 1}`;
            tag = new Tag({ tid, name: tagname });
            this.tags = [...this.tags, tag];
        }
        return tag.tid;
    };

    /**
     * retrieves the number of questions associated with an existing tag
     * @param tid an existing tag id in the application
     * @returns the number of questions associated with the tag
     */
    getQuestionCountByTag = (tid: string) => {
        return this.questions.filter(q => q.tagIds.includes(tid)).length;
    };

    /**
     * retrieves a slice of questions in the application
     * of length 5, starting from a given index that match a search criteria
     * in an order selected by the user
     * @param startIndex the index to start retrieving questions from
     * @param order the display order of the questions, 
     * allowed values are "newest", "active", "unanswered"
     * @param search the search string entered by the user
     * @returns a object containing the slice of questions 
     * and the total number of questions matching the criteria and the order
     */
    getQuestionsByFilter = (startIndex = 0, order = "newest", search = "") => {
        let filteredQuestions = search ? this.filterQuestions(search) : this.questions;
        filteredQuestions = this.sortQuestions(filteredQuestions, order);
        return {
            qSlice: filteredQuestions.slice(startIndex, startIndex + 5),
            qLength: filteredQuestions.length
        };
    };


    /**
     * Filters questions based on the search string, which can include both text and tags.
     * The search string can have keywords for the question text or tags enclosed in square brackets (e.g., [React]).
     * The method performs the following:
     * - Filters questions where the title or text contains the provided search string.
     * - Filters questions that are tagged with the tags provided in the search string (tags are enclosed in square brackets).
     * - Questions are included if either the text or the tags match.
     * @param {string} search The search string entered by the user. It can include text (e.g., "Android studio") and tags (e.g., "[React]").
     * @returns {Array} A filtered list of questions that match the search criteria. Each question in the list is an object with properties such as `title`, `text`, and `tagIds`.
     */
    private filterQuestions = (search: string) => {
        // Extract tag names enclosed in square brackets (e.g., [react], [javascript])
        const tagPattern = /\[([^\]]+)\]/g;
        const tagMatches = [...search.matchAll(tagPattern)].map(match => match[1].toLowerCase());

        // Remove the tag part from the search string to focus on text search
        const textSearch = search.replace(tagPattern, '').trim();
        return this.questions.filter(q => {
            const matchesText = textSearch ? q.title.toLowerCase().includes(textSearch.toLowerCase()) || q.text.toLowerCase().includes(textSearch.toLowerCase()) : false;
            const hasMatchingTags = tagMatches.length > 0 ? tagMatches.every(tag => q.tagIds.some(tid => this.getTagById(tid)?.name.toLowerCase() === tag)) : false;
            return matchesText || hasMatchingTags;
        });
    };

    /**
     * Returns questions sorted by the specified order type.
     * @param orderType - Sorting method ("Newest", "Active", "Unanswered").
     * @returns The sorted list of questions.
     */
    private sortQuestions(questions: Question[], orderType: string): Question[] {
        return new SortingContext(orderType).sort(questions);
    }

    /**
     * retrieve a question object by its id
     * @param qid 
     * @returns a question object if the question id exists in the application
     * otherwise returns undefined
     */
    getQuestionById = (qid: string | undefined): Question | undefined => {
        return this.questions.find(q => q.qid === qid);
    };

    /**
     * retrieves the answers to a question
     * @param question a question object or null
     * @returns an array of answer objects to the question
     * the answers are sorted by the date they were added,
     * that is, the newest answer is the first in the array
     */
    getQuestionAnswer = (question: Question | null) => {
        if (!question) return [];
        return this.answers.filter(a =>
            question.getAnswersId().includes(a.aid)).sort((a, b) => b.ansDate.getTime() - a.ansDate.getTime());
    };

    /**
     * 
     * @returns the number of tags in the application
     */
    getTagCount = () => {
        return this.tags.length;
    };

    /**
     * 
     * @returns an array of tag objects in the application
     */
    getTags = () => {
        return this.tags;
    };

    /**
     * retrieves a tag object by its id
     * @param id an existing tag id in the application
     * @returns a tag object if the tag id exists in the application
     * otherwise returns null
     */
    getTagById = (id: string): Tag | null => {
        return this.tags.find(tag => tag.tid === id) || null;
    };


    /**
     * Retrieves the latest answer date for a given list of answer IDs.
     * Used to fill the newAnsDate for the existing questions and answers.
     * @param {string[]} ansIds - The list of answer IDs for a question.
     * @returns {Date | null} - The latest answer date, or null if no answers exist.
     */
    private getLastAnsweredAt(ansIds: string[]): Date | null {
        const answerDates = this._answers
            .filter(ans => ansIds.includes(ans.aid)) // Find answers that match the IDs
            .map(ans => ans.ansDate)
            .filter((date): date is Date => date !== undefined); // Remove undefined values

        return answerDates.length > 0 ? new Date(Math.max(...answerDates.map(d => d.getTime()))) : null;
    }

}
