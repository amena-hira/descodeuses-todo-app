import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-table',
  standalone: false,
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.css'
})
export class TodoTableComponent implements OnInit{
  todo:Todo[] = [];
  displayColumns: string[] = ['id', 'title', 'description', 'priority', 'completed', 'dueDate'];
  

  constructor(private todoService:TodoService){}

  ngOnInit(): void {
    this.fetch()
  }

  fetch(){
    console.log(this.todo)
    this.todoService.getTodos().subscribe(data=>{
      this.todo = data;
      console.log("todo after get: ",this.todo)
    })
  }

  
}
