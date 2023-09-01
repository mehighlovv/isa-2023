export interface IAuthenticatedUser {
    username: string;
    userId: string;
    role: string;
    isAccepted: boolean;
    exp: number;
}
