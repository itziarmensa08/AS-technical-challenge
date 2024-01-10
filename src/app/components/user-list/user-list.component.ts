import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { PdfDownloadService } from 'src/app/services/pdf.service';
import { jsPDF } from "jspdf";
import { ExcelDownloadService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];
  totalUsers: User[] = [];
  showAlert: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1; 
  limit: number = 5; 

  @ViewChild('content') content!: ElementRef;

  constructor(
    private userService: UserService, 
    private _router: Router, 
    public dialog: MatDialog,
    private pdfDownloadService: PdfDownloadService,
    private excelDownloadService: ExcelDownloadService,
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.pdfDownloadService.getDownloadTrigger().subscribe(() => {
      this.downloadPDF();
    });
    this.excelDownloadService.getDownloadTrigger().subscribe(() => {
      this.downloadExcel();
    });
  }

  loadUsers() {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.calculateTotalPages(data);
        this.users = data.slice(startIndex, endIndex);
        this.totalUsers = data;
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

  downloadPDF() {
    const doc = new jsPDF({
      format: "a4"
    });
    
    const content = this.content.nativeElement;

    doc.html(content.innerHTML);

    doc.save('users.pdf');
  }

  downloadExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.totalUsers);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'users.xlsx');
  }
}
