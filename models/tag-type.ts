
export interface ITagType {
    id: number;
    description: string;
    code: string;
    active: boolean;
}

export class TagType implements ITagType {
    id: number;
    description: string;
    code: string;
    active: boolean;

    public constructor(description: string, code: string) { this.description = description; this.code = code }
}