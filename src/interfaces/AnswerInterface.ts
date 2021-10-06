export interface AnswerInterface {
    id: number;
    question_id: number;
    user_id: number;
    author: string;
    avatar: string;
    content: JSX.Element;
    datetime: string;
} 
