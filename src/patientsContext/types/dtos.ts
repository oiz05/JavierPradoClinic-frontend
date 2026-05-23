export interface Doctor {
    id: number;
    cmp: string;
    medical_specialty: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_photo: string;
}

export interface Branch {
    id: number;
    name: string;
    address: string;
}

export interface DoctorsAndBranchesResponseDTO {
    doctors: Doctor[];
    branches: Branch[];
}
