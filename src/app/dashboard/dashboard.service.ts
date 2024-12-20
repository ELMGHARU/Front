import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  setCurrentRoute(route: string) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('currentRoute', route);
    } else {
      console.warn('localStorage is not available in this environment.');
    }
  }


  getCurrentRoute(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('currentRoute');
    }
    console.warn('localStorage is not available in this environment.');
    return null;
  }
}
