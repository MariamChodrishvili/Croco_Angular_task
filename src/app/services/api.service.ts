import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts?userId=${userId}`);
  }

  getTodosByUser(userId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos?userId=${userId}`);
  }
}