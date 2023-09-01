export interface Answer{
    id: string;
    questionId: string;
    response: boolean;
}

export type CreateAnswer = Omit<Answer,'id'>;