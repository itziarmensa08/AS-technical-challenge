import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  form: FormGroup;

  userId: any;
  userData: User = { name: '', surname: '', email: '', id: '' };

  constructor(private route: ActivatedRoute, private userService: UserService, private _fb: FormBuilder, private _router: Router) {
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

  editUser() {
    this._router.navigate([`/editUser/${this.userId}`]);
  }

}
