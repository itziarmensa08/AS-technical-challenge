import { Component } from '@angular/core';
import { users } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users = [...users];

  delete() {
    window.alert('The user has been deleted');
  }

}
