import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, User } from '../../services/api.service';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, UserTableComponent, SpinnerComponent],
  template: `
    <div class="users-page">
      <h1>მომხმარებლები</h1>
      
      <div class="search-container">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          (input)="filterUsers()"
          placeholder="მოძებნე სახელი, გვარი ან მეილი..."
          class="search-input"
        />
      </div>

      <app-spinner *ngIf="loading"></app-spinner>
      
      <app-user-table 
        *ngIf="!loading" 
        [users]="filteredUsers">
      </app-user-table>
    </div>
  `,
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter(user => {
      const firstName = user.name.split(' ')[0].toLowerCase();
      const lastName = user.name.split(' ').slice(1).join(' ').toLowerCase();
      const email = user.email.toLowerCase();

      return firstName.includes(term) || 
             lastName.includes(term) || 
             email.includes(term);
    });
  }
}