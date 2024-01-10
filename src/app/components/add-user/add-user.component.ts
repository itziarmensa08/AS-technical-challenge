import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  form: FormGroup;

  constructor(private _fb: FormBuilder, private _userService: UserService, private _router: Router){
    this.form = this._fb.group({
      "name": ['', Validators.required],
      "surname": ['', Validators.required],
      "email": ['', Validators.required],
      "id": ['', Validators.required],
    })
  }

  addUser():void{
    this._userService.addUser(this.form.value);
    this._router.navigate(['/listUsers']);
  }

}
