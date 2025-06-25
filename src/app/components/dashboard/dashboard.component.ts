import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../service/todo.service';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = [];
  kpis = [
        { id:1, title: 'A faire aujourdh\'ui', color: '!bg-blue-500', value: 0, icon: 'event' },
        { id:2, title: 'Taches en retard', color: '!bg-red-500', value: 0, icon: 'warning' },
        { id:3, title: 'Urgentes', color: '!bg-yellow-500', value: 0, icon: 'priority_high' }
      ];
  // kpi
  // Kpis: key performance indicators
  // indicateur de performance cles
  // comme un tableu de voiture: 

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    
    this.fetchTodo();
  }

  fetchTodo() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;

      let today = new Date();
      console.log('date: ', today);
      let countUrgent = 0, countToday = 0, countLate =0;
      countUrgent = this.todos.filter(c=>c.priority == '1' && new Date(c.dueDate).toDateString() == today.toDateString()).length;

      for (const element of this.todos) {
        if (new Date(element.dueDate).toDateString() == today.toDateString()) {
          countToday++;
        }
      }

      console.log("count today: ",countToday)
      // countToday = this.todos.filter(c=>new Date(c.dueDate).toDateString()==today.toDateString()).length;

      for (let i = 0; i < this.todos.length; i++) {
        const element = this.todos[i];
        if (new Date(element.dueDate).toDateString() < today.toDateString()) {
          countLate++;
        }
      }

      // countLate = this.todos.filter(c=>new Date(c.dueDate).toDateString() < today.toDateString()).length;
      console.log('date of todo: ', new Date(this.todos[3].dueDate));

      this.kpis[0].value = countToday;
      this.kpis[1].value = countLate;
      this.kpis[2].value = countUrgent;
    });
  }
}
