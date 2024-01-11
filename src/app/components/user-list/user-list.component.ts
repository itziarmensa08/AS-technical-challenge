import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];
  showAlert: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1; 
  limit: number = 5; 
  searchTerm: string = '';

  @ViewChild('content') content!: ElementRef;

  constructor(
    private userService: UserService, 
    private _router: Router, 
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
  
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        const filteredUsers = data.filter(user =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.surname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.id.toString().includes(this.searchTerm)
        );
  
        this.calculateTotalPages(filteredUsers);
        this.users = filteredUsers.slice(startIndex, endIndex);
      },
      error => {
        console.error('Error loading users', error);
      }
    );
  }

  addUser() {
    this._router.navigate(['/addUser']);
  }

  userProfile(user: User) {
    this._router.navigate([`/userProfile/${user.id}`]);
  }

  alertDeleteUser(event: Event, user: User): void {
    event.stopPropagation();
    this.openAlertDialog(user);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user);
    this.loadUsers(); 
    this.dialog.closeAll();
  }

  closeAlert() {
    this.dialog.closeAll();
  }

  openAlertDialog(user: any): any {
    const dialog = this.dialog.open(CustomAlertComponent, {
      data: { 
        type: 'warning',
        message: 'Are you sure you want to delete this user?',
        buttonAcceptText: 'YES',
        buttonCancelText: 'NO',
        onButtonAcceptClick: () => this.deleteUser(user),
        onButtonCancelClick: () => this.closeAlert(),
      },
    });
    return dialog;
  }

  calculateTotalPages(users: User[]) {
    this.totalPages = Math.ceil(users.length / this.limit);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.loadUsers();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.loadUsers();
  }

  search() {
    this.currentPage = 1; 
    this.loadUsers();
  }
  
}
