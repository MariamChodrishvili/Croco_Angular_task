import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { NavigationStateService } from '../../services/navigation-state.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NgIf],
  template: `
    <nav class="navigation" [class.collapsed]="collapsed">
      <div class="sidebar-header">
        <span class="toggle-icon" (click)="toggleCollapse()">
          <span *ngIf="collapsed" class="material-icons-outlined">menu</span>
          <span *ngIf="!collapsed" class="material-icons-outlined">close</span>
        </span>
      </div>
      <ul>
        <li routerLink="/users" routerLinkActive="active">
          <a>
            <span class="icon">
              <span class="material-icons-outlined">group</span>
            </span>
            <span class="title">მომხმარებლები</span>
          </a>
        </li>
        <li routerLink="/posts" routerLinkActive="active">
          <a>
            <span class="icon">
              <span class="material-icons-outlined">article</span>
            </span>
            <span class="title">პოსტები</span>
          </a>
        </li>
        <li routerLink="/promotions" routerLinkActive="active">
          <a>
            <span class="icon">
              <span class="material-icons-outlined">local_offer</span>
            </span>
            <span class="title">აქციები</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  collapsed = false;

  constructor(private navigationState: NavigationStateService) {}

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.navigationState.setCollapsed(this.collapsed);
  }
}