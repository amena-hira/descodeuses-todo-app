import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../service/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-to-do',
  standalone: false,
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css',
})
export class ToDoComponent implements OnInit {
  formGroup: FormGroup;
  todos: Todo[] = [];

  constructor(private fb: FormBuilder, private todoService: TodoService, private snackbar:MatSnackBar) {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    //Communication asynchrone donc il faut s'inscrire pour avoir le retour
    // this.todoService.getTodos().subscribe((data) => {
    //   this.todos = data;
    // });
    this.fetchTodo();
  }

  fetchTodo() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  onAddTodo() {
    console.log("click add")
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      console.log(formValue);
      

      const todo: Todo = {
        id: null, //Id est genere sur le serveur pour cela il est envoye null
        title: formValue.title, //Seulement title est remplis depuis le formulaire
        description: null,
        completed: false,
        priority: null,
        dueDate: '',
      };

      this.todoService.addTodo(todo).subscribe((data) => {
        this.fetchTodo();
      });
    }
  }

  onChangeCheck(event: MatCheckboxChange, todo: Todo){ 
    console.log("check:",event.checked)
    todo.completed = event.checked;
    console.log(todo)
    this.todoService.updateTodo(todo).subscribe((data)=>{
      this.fetchTodo()
      console.log(this.todos)
      this.snackbar.open("Updated!","",{duration:1000})
    })

  }

  onDeleteTodo(id:number|null){
    console.log("cick ", id);
    if (id==null) {
      return;
    }

    this.todoService.deleteTodo(id).subscribe(data=>{
      this.fetchTodo();
      this.snackbar.open("Deleted!","",{duration:1000});

    })

  }
}
