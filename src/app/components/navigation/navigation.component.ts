import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  users: User[] = [];

  constructor(
    private userService: UserService, 
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      error => {
        console.error('Error loading users', error);
      }
    );
  }

  downloadPDF() {

    if (this.users.length == 0) {
      this.openAlertDialog();
    } else {
      const doc = new jsPDF({
        format: 'a4'
      });
    
      const columns = [
        { title: "Name", dataKey: "name" },
        { title: "Surname", dataKey: "surname" },
        { title: "Email", dataKey: "email" },
        { title: "DNI", dataKey: "id" },
      ];
    
      const rows = this.users.map(user => [user.name, user.surname, user.email, user.id]);
    
      autoTable(doc, {
        head: [columns.map(column => column.title)],
        body: rows
      });
    
      doc.save('users.pdf');
    }    
  }

  downloadExcel() {
    if (this.users.length == 0) {
      this.openAlertDialog();
    } else {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Users');
      XLSX.writeFile(wb, 'users.xlsx');
    }
  }

  openAlertDialog(): any {
    const dialog = this.dialog.open(CustomAlertComponent, {
      data: { 
        type: 'warning',
        message: 'There are no users available',
        buttonAcceptText: 'OK',
        buttonCancelText: 'CANCEL',
        onButtonAcceptClick: () => this.dialog.closeAll(),
        onButtonCancelClick: () => this.dialog.closeAll(),
      },
    });
    return dialog;
  }
}
