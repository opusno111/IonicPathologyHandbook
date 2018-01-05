import { IDepartment } from './department';
import { IContactDetail } from './contact-detail';

export interface IContact {
    id: number;
    active: boolean;
    name: string;
    role: string;
    departmentId: number;
    contactDetails: IContactDetail[];
    department: IDepartment;
}

export class Contact implements IContact {
    id: number;
    active: boolean;
    name: string;
    role: string;
    departmentId: number;
    contactDetails: IContactDetail[];
    department: IDepartment;
}
