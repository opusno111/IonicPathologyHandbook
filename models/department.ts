export interface IDepartment {
    id: number;
    name: string;
    openingHours: string;
    active: boolean;
}

export class Department implements IDepartment {
    id: number;
    name: string;
    openingHours: string;
    active: boolean;
}
