export interface IAuthenticatedUser {
    username: string;
    userId: string;
    role: string;
    isAccepted: boolean;
    exp: number;
}

export interface UserSearchParams{
    firstName:string;
    lastName:string;
}

export class UserSortParams{
    constructor(){
        this.firstName=null;
        this.lastName=null;
    }
    firstName: string;
    lastName: string;
}
