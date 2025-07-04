import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private authService: AuthService) {}

  getUsername(): string {
    return this.authService.getUsername();
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('es-ES');
  }
}
