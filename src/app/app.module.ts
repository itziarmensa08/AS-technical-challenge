import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomAlertComponent } from './components/custom-alert/custom-alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    NavigationComponent,
    AddUserComponent,
    CustomAlertComponent,
    UserProfileComponent,
    EditUserComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/upload', pathMatch: 'full' },
      { path: 'upload', component: FileUploadComponent },
      { path: 'listUsers', component: UserListComponent },
      { path: 'addUser', component: AddUserComponent },
      { path: 'userProfile/:id', component: UserProfileComponent },
      { path: 'editUser/:id', component: EditUserComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
