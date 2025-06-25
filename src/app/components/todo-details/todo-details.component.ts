import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../service/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-details',
  standalone: false,
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css',
})
export class TodoDetailsComponent implements OnInit {
  todo!: Todo;
  formGroup!: FormGroup;
  priority = [
    {value:'1', text:'1'},
    {value:'2', text:'2'},
    {value:'3', text:'3'},
    {value:'4', text:'4'},
  ]

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // je recupere le id de nom et je le converti au nombre
    // pour faire appel au fetch by is du service CRUD
    const id = Number(this.route.snapshot.paramMap.get('id'));

    //appel au service pour recuperee le todo
    // thi.todoService.getTodo....
    this.todoService.getTodo(id).subscribe((data) => {
      this.todo = data;
      // initialiser le formulaire avec les valeurs du todo
      // this.formGroup = this.fb....
      this.formGroup = this.fb.group({
        id: [this.todo.id],
        title: [this.todo.title, [Validators.required]],
        description: [this.todo.description],
        completed: [this.todo.completed],
        priority: [this.todo.priority],
        dueDate: [this.todo.dueDate],
      });
    });
  }

  onSubmit() {
    console.log('les valeurs de formulaire: ');
    console.log(this.formGroup.value)
    // tester si formulaire valide
    if (this.formGroup.valid) {
      this.todoService.updateTodo(this.formGroup.value).subscribe((data) => {
        this.todo = data;
        console.log("data: ",data)
        this.snackbar.open("Updated!",'',{duration:1000})
        this.router.navigate(['/to-do'])
      });
    }

    // faire appel au update du service CRUD
  }

  onCancel(){
    this.router.navigate(['/to-do'])
  }
}


