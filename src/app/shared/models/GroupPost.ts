export interface GroupPost{
    id: string;
    groupid: string;
    creator? :string;
    post: string;
    date?: number;
    like?: string[];
    comments?: string[];
}