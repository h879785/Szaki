export interface Post{
    id: string;
    creator? :string;
    post: string;
    date?: number;
    like?: string[];
    comments?: string[];
}