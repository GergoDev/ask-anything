export interface QuestionInterface {
    id: number;
    key: number;
    user_id: number;
    user_name: string;
    by: string;
    title: string;
    message: string;
    submission_time: string;
    view: number;
    vote: number;
}