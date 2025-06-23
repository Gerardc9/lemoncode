import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-public',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './header-public.component.html',
  styleUrl: './header-public.component.scss',
})
export class HeaderPublicComponent {}
