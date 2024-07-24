export interface Message{
    _id?: string;
    idTicket: string | null;
    contenu: string | null | undefined;
    date?: Date | string;
    idUser: string | null;
}