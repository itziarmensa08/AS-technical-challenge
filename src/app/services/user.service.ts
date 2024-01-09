import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    private usersUrl = 'assets/users.json';

    private usersSubject = new BehaviorSubject<User[]>([]);

    constructor(private http: HttpClient) {
        this.loadUsers();
    }

    private loadUsers() {
        this.http.get<User[]>(this.usersUrl)
        .pipe(
            catchError(this.handleError)
        )
        .subscribe(users => this.usersSubject.next(users));
    }

    getUsers(): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    addUser(newUser: User): void {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = [...currentUsers, newUser];
        this.usersSubject.next(updatedUsers);
    }

    deleteUser(userToDelete: User): void {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.filter(user => user !== userToDelete);
        this.usersSubject.next(updatedUsers);
    }

    private handleError(error: any): Observable<any> {
        console.error('An error occurred', error);
        return of ([]);
    }
}