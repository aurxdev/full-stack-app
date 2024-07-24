export enum TicketEtat{
    OUVERT = 0,
    EN_COURS = 1,
    FERME = 2
}

export interface Ticket{
    id?: string;
    nom: string | null | undefined;
    categorie: string | null | undefined;
    description: string | null | undefined;
    date?: Date | string;
    etat: TicketEtat;
    iduser: string | null;
    idsupport?: string | null;
}