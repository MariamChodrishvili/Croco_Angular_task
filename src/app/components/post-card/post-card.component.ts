import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../services/api.service';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule],
  template: `
    <div class="post-card">
      <h3>{{ post.title }}</h3>
      <p class="post-body">{{ getShortBody() }}</p>
      <button class="btn-details" (click)="onDetailsClick()">დეტალურად</button>
    </div>
  `,
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() onShowDetails!: (post: Post) => void;

  getShortBody(): string {
    return this.post.body.length > 100 
      ? this.post.body.substring(0, 100) + '...' 
      : this.post.body;
  }

  onDetailsClick() {
    this.onShowDetails(this.post);
  }
}