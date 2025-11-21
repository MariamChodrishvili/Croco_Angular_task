import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../services/api.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th>სახელი</th>
            <th>გვარი</th>
            <th>ტელეფონის ნომერი</th>
            <th>მეილი</th>
            <th>კომპანიის დასახელება</th>
            <th>აქტივობა</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ getFirstName(user.name) }}</td>
            <td>{{ getLastName(user.name) }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.company.name }}</td>
            <td>
              <button class="btn-posts" (click)="viewPosts(user.id)">Posts</button>
              <button class="btn-todos" (click)="viewTodos(user.id)">Todos</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="users.length === 0" class="no-data">
        მომხმარებელი ვერ მოიძებნა
      </div>
    </div>
  `,
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  @Input() users: User[] = [];

  constructor(private router: Router) {}

  getFirstName(fullName: string): string {
    return fullName.split(' ')[0];
  }

  getLastName(fullName: string): string {
    const parts = fullName.split(' ');
    return parts.slice(1).join(' ');
  }

  viewPosts(userId: number) {
    this.router.navigate(['/posts', userId]);
  }

  viewTodos(userId: number) {
    this.router.navigate(['/todos', userId]);
  }
}