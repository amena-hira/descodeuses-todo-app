import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../service/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UtilisateursService } from '../../service/utilisateurs.service';
import { utilisateurs } from '../../models/utilisateurs/utilisateurs';
import { Projet } from '../../models/projets/projets.model';
import { ProjetService } from '../../service/projet.service';

@Component({
  selector: 'app-todo-details',
  standalone: false,
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css',
})
export class TodoDetailsComponent implements OnInit {
  todo!: Todo;
  projet:any[]=[];
  formGroup!: FormGroup;
  priority = [
    { value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '3', text: '3' },
    { value: '4', text: '4' },
  ];

  // -------Chips---------
  currentFruit = new FormControl('');
  selectedFruits: utilisateurs[] = [];
  allFruits: utilisateurs[] = [];
  filteredFruits: utilisateurs[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private snackbar: MatSnackBar,
    private contactService: UtilisateursService,
    private projetService: ProjetService
  ) {}

  ngOnInit(): void {
    // je recupere le id de nom et je le converti au nombre
    // pour faire appel au fetch by is du service CRUD
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // chips for contact
    // this.fetchContact();
    this.fetchProjet();
    this.contactService.getUsers().subscribe((contact) => {
      this.allFruits = contact;
      this.filteredFruits = [...this.allFruits];

      this.todoService.getTodo(id).subscribe((todo) => {
        this.todo = todo;
        // initialiser le formulaire avec les valeurs du todo
        // this.formGroup = this.fb....
        this.formGroup = this.fb.group({
          id: [this.todo.id],
          title: [this.todo.title, [Validators.required]],
          description: [this.todo.description],
          completed: [this.todo.completed],
          priorite: [this.todo.priorite],
          dueDate: [this.todo.dueDate],
          memberIds:[this.todo.memberIds || []],
          projetId:[this.todo.projetId]
        });
        this.selectedFruits = this.allFruits.filter(c=>this.todo.memberIds.includes(c.id));
      });
    });

    //appel au service pour recuperee le todo
    // thi.todoService.getTodo....
  }

  // fetchContact() {
  //   this.contactService.getUsers().subscribe((data) => {
  //     this.allFruits = data;
  //     this.filteredFruits = [...this.allFruits];
  //   });
  // }
  fetchProjet() {
    this.projetService.getUsers().subscribe(data=>{
      this.projet = data;
    });
  }

  onSubmit() {
    console.log('les valeurs de formulaire: ');
    console.log(this.formGroup.value);
    if (this.formGroup.value.dueDate)
      this.formGroup.value.dueDate = this.toLocalIsoString(
        this.formGroup.value.dueDate
      );
    
    this.formGroup.get('memberIds')?.setValue(this.selectedFruits.map(c=>c.id));
    // tester si formulaire valide
    if (this.formGroup.valid) {
      this.todoService.updateTodo(this.formGroup.value).subscribe((data) => {
        this.todo = data;
        console.log('data: ', data);
        this.snackbar.open('Updated!', '', { duration: 1000 });
        this.router.navigate(['/to-do']);
      });
    }

    // faire appel au update du service CRUD
  }

  onCancel() {
    this.router.navigate(['/to-do']);
  }

  toLocalIsoString(dateString: string): string {
    const dateObject = new Date(dateString);
    return new Date(
      dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
    ).toISOString();
  }

  // ---------chips------------
  remove(id: number | null): void {
    this.selectedFruits = this.selectedFruits.filter((f) => f.id !== id);
  }

  onCurrentFruitChange(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredFruits = this.allFruits.filter((fruit) =>
      fruit.nom?.toLowerCase().includes(filterValue)
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedId = event.option.value;
    const selectedFruit = this.allFruits.find((f) => f.id === selectedId);

    if (
      selectedFruit &&
      !this.selectedFruits.some((f) => f.id === selectedId)
    ) {
      this.selectedFruits = [...this.selectedFruits, selectedFruit];
    }

    this.currentFruit.setValue('');
    event.option.deselect();
  }
}
