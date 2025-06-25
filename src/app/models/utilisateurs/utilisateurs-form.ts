import { FormControl } from "@angular/forms";

export interface utilisateursForm{
    id: FormControl<number | null>;
    nom: FormControl<string | null>;
    prenom: FormControl<string | null>;
    username: FormControl<string | null>;
    genre: FormControl<string | null>;
}