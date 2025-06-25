export interface Todo{
    // | en typescript c'est possibilite d'avoir
    // plusieurs types

    // | null cad champ optionel
    //identifiant
    id: number |null;
    title:string |null;
    description: string |null;
    completed: boolean |null;
    priority:string | null;
    dueDate: string;
}