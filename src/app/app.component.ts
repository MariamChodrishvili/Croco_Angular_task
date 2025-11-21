import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationStateService } from './services/navigation-state.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavigationComponent, FooterComponent, CommonModule],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <div class="main-layout" [class.nav-collapsed]="isNavCollapsed">
        <app-navigation></app-navigation>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'intern-assignment';
  isNavCollapsed = false;
  private subscription?: Subscription;

  constructor(private navigationState: NavigationStateService) {}

  ngOnInit() {
    this.subscription = this.navigationState.collapsed$.subscribe(
      collapsed => {
        this.isNavCollapsed = collapsed;
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}