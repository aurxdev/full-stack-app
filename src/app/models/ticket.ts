export enum TicketEtat{
    OUVERT = 0,
    EN_COURS = 1,
    FERME = 2
}

export interface Ticket{
    _id?: string;
    nom: string | null | undefined;
    categorie: string | null | undefined;
    description: string | null | undefined;
    date?: Date | string;
    etat: TicketEtat;
    idUser: string | null;
    idSupport?: string | null;
}