import { Component } from '@angular/core';

@Component({
  selector: 'app-calculatrice',
  standalone: false,
  templateUrl: './calculatrice.component.html',
  styleUrl: './calculatrice.component.css'
})
export class CalculatriceComponent {
  nombres = [7,8,9,4,5,6,1,2,3,0]
  operators = ['+','-','x','/']
  
}
