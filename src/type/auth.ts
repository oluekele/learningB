export interface User {
    name: string;
    id: number;
    email: string;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
}