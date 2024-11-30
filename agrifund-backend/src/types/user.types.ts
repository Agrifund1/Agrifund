export interface User {
    id: string;
    email: string;
    name: string | null;
    role: 'student' | 'farmer' | 'investor' | 'business' | 'admin';
    wallet_address: string | null;
    profile_data: Record<string, any>;
    created_at: string;
}

export interface CreateUserDTO {
    email: string;
    password: string;
    name?: string;
    role: User['role'];
    wallet_address?: string;
    profile_data?: Record<string, any>;
}

export interface LoginDTO {
    email: string;
    password: string;
} 