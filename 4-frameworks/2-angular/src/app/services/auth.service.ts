import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private currentUsername = '';
  private readonly STORAGE_KEY = 'auth_state';

  constructor() {
    this.loadAuthState();
  }

  login(credentials: { username: string; password: string }): boolean {
    // Validación específica requerida
    if (
      credentials.username === 'master@lemoncode.net' &&
      credentials.password === '12345678'
    ) {
      this.isAuthenticated = true;
      this.currentUsername = credentials.username;
      this.saveAuthState();
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUsername = '';
    this.saveAuthState();
  }

  isLogged(): boolean {
    return this.isAuthenticated;
  }

  getUsername(): string {
    return this.currentUsername;
  }

  // Métodos para persistencia en localStorage (punto 11 - RETO)
  private saveAuthState(): void {
    const authState = {
      isAuthenticated: this.isAuthenticated,
      username: this.currentUsername,
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authState));
  }

  private loadAuthState(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const authState = JSON.parse(saved);
        this.isAuthenticated = authState.isAuthenticated || false;
        this.currentUsername = authState.username || '';
      } catch (error) {
        console.error('Error loading auth state:', error);
      }
    }
  }
}
