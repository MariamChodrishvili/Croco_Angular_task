import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  template: `
    <header class="header">
      <div class="site-name">
        <a routerLink="/"><span class="green">P</span>lay<span class="green">Z</span>one</a>
      </div>
      <div class="current-time">
        {{ currentTime }}
      </div>
    </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTime: string = '';
  private intervalId: any;

  ngOnInit() {
    this.updateTime();
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleString();
  }
}