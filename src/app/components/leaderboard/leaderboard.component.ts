import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type WeekType = 'I' | 'II' | 'III' | 'IV';

interface LeaderboardEntry {
  customerId: number;
  loginName: string;
  place: number;
  week: WeekType;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="leaderboard-container">
      <h2>ლიდერბორდი</h2>
      
      <div class="filter-buttons">
        <button 
          *ngFor="let filter of filters"
          [class.active]="activeFilter === filter"
          (click)="setFilter(filter)"
          class="filter-btn">
          {{ filter }}
        </button>
      </div>

      <div class="leaderboard-table">
        <table>
          <thead>
            <tr>
              <th>პოზიცია</th>
              <th>მომხ. ID</th> 
              <th>მომხმარებელი</th> 
              <th>კვირა</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let entry of filteredData">
              <td class="place-cell">
                <span class="place-badge" [class.top-three]="entry.place <= 3">
                  {{ entry.place }}
                </span>
              </td>
              <td>{{ entry.customerId }}</td>
              <td>{{ entry.loginName }}</td>
              <td><span class="week-badge">კვირა {{ entry.week }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit {
  leaderboardData: LeaderboardEntry[] = [];
  filteredData: LeaderboardEntry[] = [];
  filters: ('ALL' | WeekType)[] = ['ALL', 'I', 'II', 'III', 'IV'];
  activeFilter: 'ALL' | WeekType = 'ALL';

  ngOnInit() {
    this.generateLeaderboardData();
    this.filteredData = this.leaderboardData;
  }

  generateLeaderboardData() {
    const weeks: WeekType[] = ['I', 'II', 'III', 'IV'];
    const data: LeaderboardEntry[] = [];

    weeks.forEach(week => {
      for (let i = 1; i <= 12; i++) {
        data.push({
          customerId: Math.floor(Math.random() * 90000) + 10000,
          loginName: this.generateRandomName(),
          place: i,
          week: week
        });
      }
    });

    this.leaderboardData = data;
  }

  generateRandomName(): string {
    const prefixes = ['user', 'player', 'gamer', 'pro', 'champ'];
    const suffixes = ['123', '456', '789', 'x', 'pro', '2024'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return prefix + suffix;
  }

  setFilter(filter: 'ALL' | WeekType) {
    this.activeFilter = filter;
    
    if (filter === 'ALL') {
      this.filteredData = this.leaderboardData;
    } else {
      this.filteredData = this.leaderboardData.filter(entry => entry.week === filter);
    }
  }
}