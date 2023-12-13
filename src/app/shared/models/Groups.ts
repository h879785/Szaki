import { User } from "./User";

export interface Groups{
    id: string;
    members?: Array<User>;
    creator?: string;
    name: string;
    moderators?: Array<User>;
    security: string;
    createdate?: number;
}