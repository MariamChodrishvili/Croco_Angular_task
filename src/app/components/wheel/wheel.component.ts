import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wheel',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="wheel-container">
    <h2>დაატრიალე ბორბალი</h2>
    
    <div class="wheel-wrapper">
      <div class="wheel" [style.transform]="'rotate(' + rotation + 'deg)'">
        <div *ngFor="let sector of sectors; let i = index" 
             class="sector"
             [style.transform]="'rotate(' + (i * 36) + 'deg)'">
        </div>
        <div class="numbers-layer">
          <div *ngFor="let sector of sectors; let i = index" 
               class="sector-number"
               [style.transform]="'rotate(' + (i * 36 + 18) + 'deg)'">
            <span class="number-text"
            >{{ sector }}</span>
          </div>
        </div>
      </div>
      <div class="wheel-pointer"></div>
    </div>

    <div class="wheel-controls">
      <input 
        type="number" 
        [(ngModel)]="targetSector" 
        placeholder="ჩაწერე რიცხვი (1-10)"
        min="1"
        max="10"
        class="sector-input"
      />
      <button 
        class="spin-btn" 
        (click)="spin()"
        [disabled]="isSpinning">
        {{ isSpinning ? 'Spinning...' : 'დაატრიალე' }}
      </button>
    </div>

    <div class="error-message" *ngIf="errorMessage">
      {{ errorMessage }}
    </div>

    <div class="result-message" *ngIf="resultMessage">
      {{ resultMessage }}
    </div>
  </div>
`,
  styleUrl: './wheel.component.css'
})
export class WheelComponent {
  sectors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  targetSector: number | null = null;
  rotation: number = 0;
  isSpinning: boolean = false;
  errorMessage: string = '';
  resultMessage: string = '';

spin() {
  this.errorMessage = '';
  this.resultMessage = '';

  if (!this.targetSector || this.targetSector < 1 || this.targetSector > 10) {
    this.errorMessage = 'აღნიშნული სექტორი ვერ მოიძებნა';
    return;
  }

  this.isSpinning = true;

  const sectorAngle = 36;
  const targetIndex = this.targetSector - 1;
  const targetCenter = targetIndex * sectorAngle + 18; 

  const fullRotations = 5 * 360;
  const rotationToAlignCenter = (360 - targetCenter) % 360;
  const finalRotation = fullRotations + rotationToAlignCenter;

  this.rotation = finalRotation;

  const transitionMs = 3000;
  setTimeout(() => {
    this.isSpinning = false;

    const normalizedRotation = ((this.rotation % 360) + 360) % 360;
    const angleAtTop = (360 - normalizedRotation) % 360;

    const centers = this.sectors.map((_, i) => (i * sectorAngle + 18) % 360);
    let bestIndex = 0;
    let bestDiff = 360;
    for (let i = 0; i < centers.length; i++) {
      let diff = Math.abs(((centers[i] - angleAtTop + 540) % 360) - 180);
      diff = Math.abs(diff - 180);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIndex = i;
      }
    }

    this.resultMessage = `გაჩერდა რიცხვზე ${this.targetSector}! 🎉`;
  }, transitionMs + 50); 
}

}
