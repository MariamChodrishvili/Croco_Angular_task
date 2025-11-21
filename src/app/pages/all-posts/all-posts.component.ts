import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Post, User } from '../../services/api.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { PostDetailModalComponent } from '../../components/post-detail-modal/post-detail-modal.component';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, PostDetailModalComponent],
  template: `
    <div class="all-posts-page">
      <button class="back-btn" (click)="goBack()">← უკან</button>
      <h1>პოსტები</h1>

      <app-spinner *ngIf="loading"></app-spinner>

      <div class="table-container" *ngIf="!loading">
        <table class="posts-table">
          <thead>
            <tr>
              <th>მომხმარებლის სახელი</th>
              <th>პოსტის სათაური</th>
              <th>მოქმედება</th>
            </tr>
          </thead>

          <tbody>
            <tr *ngFor="let post of posts">
              <td>{{ getUserName(post.userId) }}</td>
              <td>{{ post.title }}</td>
              <td>
                <button class="btn-details" (click)="showPostDetails(post)">
                  დეტალურად
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div *ngIf="posts.length === 0" class="no-data">
          პოსტები ვერ მოიძებნა
        </div>
      </div>

      <app-post-detail-modal
        [isOpen]="isModalOpen"
        [post]="selectedPost"
        (closeModal)="closeModal()">
      </app-post-detail-modal>
    </div>
  `,
  styleUrl: './all-posts.component.css'
})
export class AllPostsComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  loading: boolean = true;
  isModalOpen = false;
  selectedPost: Post | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers().subscribe({
      next: users => {
        this.users = users;
        this.loadPosts();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadPosts() {
    this.apiService.getPosts().subscribe({
      next: posts => {
        this.posts = posts;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getUserName(id: number): string {
    const user = this.users.find(u => u.id === id);
    return user ? user.name : "Unknown";
  }

  goBack() {
    this.router.navigate(['/']);
  }

  showPostDetails(post: Post) {
    this.selectedPost = post;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedPost = null;
  }
}
