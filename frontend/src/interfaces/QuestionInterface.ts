import { AnswerInterface } from "./AnswerInterface"

export interface QuestionInterface {
    id: number;
    title: string;
    message: string;
    submissionTime: string;
    view: number;
    voteCount: number;
    user: { name: string };
    answers: AnswerInterface[]
}