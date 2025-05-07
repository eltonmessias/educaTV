import { CommonModule } from '@angular/common';
import { Component, HostListener, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }


  isHeaderHidden = false;
  lastScrollTop = 0;

  mobileLinks = [
    { path: '/home', label: 'Home' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/video-aulas', label: 'Vídeo Aulas' },
    { path: '/livros', label: 'Manuais' },
    { path: '/mulheres-na-ciencia', label: 'Mulheres na Ciência' },
    { path: '/noticias', label: 'Notícias' },
  ];



  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop && currentScroll > 100) {
      // Scrolling down
      this.isHeaderHidden = true;
    } else {
      // Scrolling up
      this.isHeaderHidden = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}
