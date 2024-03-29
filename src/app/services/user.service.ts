import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    private usersSubject = new BehaviorSubject<User[]>([]);

    setUsers(users: User[]): void {
        this.usersSubject.next(users);
    }

    getUsers(): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    getUser(userId: string) {
        const currentUsers = this.usersSubject.value;
        const user = currentUsers.find(user => user.id == userId);
        return user;
    }

    addUser(newUser: User): void {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = [...currentUsers, newUser];
        this.usersSubject.next(updatedUsers);
    }

    updateUser(updatedUser: User): void {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.map(user => {
          if (user.id === updatedUser.id) {
            return { ...user, ...updatedUser };
          }
          return user;
        });
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