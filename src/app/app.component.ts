import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <div *ngFor="let user of users">
      {{ user.name }} {{ user.surname }} - {{ user.email }} - {{ user.id }}
    </div>
  `
})

export class AppComponent {
  title = 'AS-technical-challenge';
}
