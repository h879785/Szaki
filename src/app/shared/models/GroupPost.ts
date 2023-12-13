import { Comment } from 'src/app/shared/models/Comment';

export interface GroupPost{
    id: string;
    groupid: string;
    creator? :string;
    post: string;
    date?: number;
    like?: string[];
    comments?: Comment[];
    image?: string;
}