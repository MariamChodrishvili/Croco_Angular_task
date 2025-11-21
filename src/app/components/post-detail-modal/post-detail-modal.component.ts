import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../services/api.service';

@Component({
  selector: 'app-post-detail-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>{{ post?.title }}</h2>
          <button class="close-btn" (click)="close()">&times;</button>
        </div>
        <div class="modal-body">
          <p>{{ post?.body }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './post-detail-modal.component.css'
})
export class PostDetailModalComponent {
  @Input() isOpen: boolean = false;
  @Input() post: Post | null = null;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}