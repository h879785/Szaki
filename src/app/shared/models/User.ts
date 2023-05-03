export interface User {
    id?: string;
    email?: string;
    name?: {
        firstname?: string;
        lastname?: string;
    }
    gender?: string;
    birthdate?: Date;
    birthplace?: string;
    friends?: string[];
    work?: string;
    hobbies?: string;
}