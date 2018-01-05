import { IContactType } from './contact-type';

export interface IContactDetail {
    id: number;
    active: boolean;
    contactValue: string;
    contactTypeId: number;

    contactType: IContactType;
}

export class ContactDetail implements IContactDetail {
    id: number;
    active: boolean;
    contactValue: string;
    contactTypeId: number;
    contactType: IContactType;
}
