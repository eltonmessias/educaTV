import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.scss'
})
export class SobreComponent {
  @ViewChild('slider') sliderRef!: ElementRef<HTMLDivElement>;

  studioImages = [
    'assets/imagens/sobre/estudio/studio1.jpg',
    'assets/imagens/sobre/estudio/studio2.jpg',
    'assets/imagens/sobre/estudio/studio3.jpg',
    'assets/imagens/sobre/estudio/studio4.jpg'
  ];

  currentIndex: number = 0;

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.studioImages.length) % this.studioImages.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.studioImages.length;
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }
}
