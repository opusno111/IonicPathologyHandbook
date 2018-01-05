export interface IContactType {
    id: number;
    description: string;
    active: boolean;
}

export class ContactType implements IContactType {
    id: number;
    description: string;
    active: boolean;
}
