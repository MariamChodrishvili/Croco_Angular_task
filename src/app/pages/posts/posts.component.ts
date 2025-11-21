import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Post, User } from '../../services/api.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { PostDetailModalComponent } from '../../components/post-detail-modal/post-detail-modal.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostCardComponent, PostDetailModalComponent, SpinnerComponent],
  template: `
    <div class="posts-page">
      <button class="back-btn" (click)="goBack()">← დაბრუნდი უკან</button>
      
      <h1>{{ userName }}-ის პოსტები</h1>
      
      <app-spinner *ngIf="loading"></app-spinner>
      
      <div class="posts-grid" *ngIf="!loading">
        <app-post-card 
          *ngFor="let post of posts" 
          [post]="post"
          [onShowDetails]="showPostDetails.bind(this)">
        </app-post-card>
      </div>

      <div *ngIf="!loading && posts.length === 0" class="no-data">
        მითითებული მომხმარებლის პოსტები ვერ მოიძებნა
      </div>

      <app-post-detail-modal
        [isOpen]="isModalOpen"
        [post]="selectedPost"
        (closeModal)="closeModal()">
      </app-post-detail-modal>
    </div>
  `,
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  userId: number = 0;
  userName: string = '';
  loading: boolean = true;
  isModalOpen: boolean = false;
  selectedPost: Post | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.loadPosts();
      this.loadUserName();
    });
  }

  loadPosts() {
    this.loading = true;
    this.apiService.getPostsByUser(this.userId).subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
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

  showPostDetails(post: Post) {
    this.selectedPost = post;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedPost = null;
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}