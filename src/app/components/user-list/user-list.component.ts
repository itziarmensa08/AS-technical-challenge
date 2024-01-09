import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, users } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService, private _router: Router) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      error => {
        console.error('Error loading users', error);
      }
    );
  }

  addUser() {
    this._router.navigate(['/addUser']);
  }

  editUser(user: User) {
    window.alert('Edit user');
  }

  deleteUser(user: User) {
    window.alert('Delete user');
  }

}
