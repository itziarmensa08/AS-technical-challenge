import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  form: FormGroup;

  userId: any;
  userData: User = { name: '', surname: '', email: '', id: '' };
  showMessage = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private _fb: FormBuilder, private _router: Router, public dialog: MatDialog) {
    this.form = this._fb.group({
      "name": ['', Validators.required],
      "surname": ['', Validators.required],
      "email": ['', Validators.required],
      "id": ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.getUserData();
  }

  getUserData(): void {
    if (this.userId) {
      const user = this.userService.getUser(this.userId);
      if (user) {
        this.userData = user;
        this.form.patchValue({
          name: this.userData.name,
          surname: this.userData.surname,
          email: this.userData.email,
          id: this.userData.id
        });
      } else {
        console.error('User not found');  
      }
    } else {
      console.error('User ID not available');  
    }

  }

  editUser():void{
    this.userService.updateUser(this.form.value); 
    
    this.dialog.open(CustomAlertComponent, {
      data: { 
        type: 'success',
        message: 'The changes were made correctly.',
        buttonAcceptText: 'OK',
        buttonCancelText: 'CANCEL',
        onButtonAcceptClick: () => {this._router.navigate(['/listUsers']); this.dialog.closeAll()},
        onButtonCancelClick: () => this.dialog.closeAll(),
      },
    });
  }
}
