export interface User {
    _id?: string;
    nom: string | null | undefined;
    mdp: string | null | undefined;
    support?: boolean;
}
