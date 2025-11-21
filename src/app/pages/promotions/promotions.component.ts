import { Component } from '@angular/core';
import { WheelComponent } from '../../components/wheel/wheel.component';
import { LeaderboardComponent } from '../../components/leaderboard/leaderboard.component';

@Component({
  selector: 'app-promotions',
  imports: [WheelComponent, LeaderboardComponent],
  template: `
    <div class="promotions-page">
      <h1>აქციები</h1>
      <app-wheel></app-wheel>
      <app-leaderboard></app-leaderboard>
    </div>
  `,
  styleUrl: './promotions.component.css'
})
export class PromotionsComponent {}