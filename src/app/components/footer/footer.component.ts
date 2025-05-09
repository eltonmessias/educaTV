import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  socialMediaLinks = [
    'assets/logos/facebook.png',
    'assets/logos/instagram.png',
    'assets/logos/youtube.png',
  ]

  currentYear: number = new Date().getFullYear();
}
