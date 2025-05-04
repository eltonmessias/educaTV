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
    'assets/imagens/sobre/estudio/studio1.png',
    'assets/imagens/sobre/estudio/studio2.png',
    'assets/imagens/sobre/estudio/studio3.png',
    'assets/imagens/sobre/estudio/studio4.png',
    'assets/imagens/sobre/estudio/studio5.png',
    'assets/imagens/sobre/estudio/studio6.png',
    'assets/imagens/sobre/estudio/studio7.png',
    'assets/imagens/sobre/estudio/studio8.png',
    'assets/imagens/sobre/estudio/studio9.png'
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
