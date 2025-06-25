import { FormControl } from "@angular/forms";

export interface TodoForm {
    id: FormControl<number | null>;
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    completed: FormControl<boolean | null>;
    priority: FormControl<string | null>;
    dueDate: FormControl<string | null>;
}