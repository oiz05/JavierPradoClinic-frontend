export interface RegisterRequestDTO {
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface TokenDTO {
    token: string;
}

export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    dni: number;
    email: string;
    phoneNumber: string;
    profilePhoto: string | null;
    role: string;
    medicalSpecialty?: string | null;
    cmp?: string | null;
}