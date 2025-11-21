import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationStateService {
  private collapsedSubject = new BehaviorSubject<boolean>(false);
  collapsed$ = this.collapsedSubject.asObservable();

  setCollapsed(value: boolean) {
    this.collapsedSubject.next(value);
  }

  getCollapsed(): boolean {
    return this.collapsedSubject.value;
  }
}