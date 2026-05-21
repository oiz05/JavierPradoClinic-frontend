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