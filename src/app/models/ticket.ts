export enum TicketEtat{
    OUVERT = 0,
    EN_COURS = 1,
    FERME = 2
}

export interface Ticket{
    _id?: string;
    nom: string;
    categorie: string;
    description: string;
    date: Date | string;
    etat: TicketEtat;
    idUser: string;
    idSupport: string;
}