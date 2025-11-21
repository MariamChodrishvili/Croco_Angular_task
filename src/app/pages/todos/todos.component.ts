import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Todo } from '../../services/api.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-todos',
  imports: [CommonModule, SpinnerComponent],
  template: `
    <div class="todos-page">
      <button class="back-btn" (click)="goBack()">← დაბრუნდი უკან</button>
      
      <h1>Todo List - {{ userName }}</h1>
      
      <app-spinner *ngIf="loading"></app-spinner>
      
      <div class="todos-list" *ngIf="!loading">
        <div 
          *ngFor="let todo of todos" 
          class="todo-item"
          [class.completed]="todo.completed">
          <div class="todo-checkbox">
            <span *ngIf="todo.completed">✓</span>
          </div>
          <div class="todo-content">
            <span class="todo-title">{{ todo.title }}</span>
            <span class="todo-status">{{ todo.completed ? 'შესულებულია' : 'შესასრულებელი' }}</span>
          </div>
        </div>
      </div>

      <div *ngIf="!loading && todos.length === 0" class="no-data">
        ამ მომხმარებლისთვის შესასრულებელი დავალებები ვერ მოიძებნა
      </div>
    </div>
  `,
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  userId: number = 0;
  userName: string = '';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.loadTodos();
      this.loadUserName();
    });
  }

  loadTodos() {
    this.loading = true;
    this.apiService.getTodosByUser(this.userId).subscribe({
      next: (data) => {
        this.todos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading todos:', error);
        this.loading = false;
      }
    });
  }

  loadUserName() {
    this.apiService.getUsers().subscribe({
      next: (users) => {
        const user = users.find(u => u.id === this.userId);
        this.userName = user ? user.name : 'Unknown User';
      }
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}