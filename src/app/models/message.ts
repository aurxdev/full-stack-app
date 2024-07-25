export interface Message{
    _id?: string;
    idticket: string | undefined;
    contenu: string | null | undefined;
    date?: Date | string;
    iduser: string | null;
}