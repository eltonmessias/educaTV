import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit, OnDestroy{


  @Input() images: string[] = [];
  currentSlide: number = 0;
  private slideInterval$: Subscription = new Subscription;

  // ngOnInit(): void {
  //   // A cada 2 segundos, atualiza o índice do slide
  //   this.slideInterval$ = interval(3000).subscribe(() => {
  //     this.currentSlide = (this.currentSlide + 1) % this.images.length;
  //   });
  // }

  // ngOnDestroy(): void {
  //   if (this.slideInterval$) {
  //     this.slideInterval$.unsubscribe();
  //   }
  // }

  currentIndex = 1;
  intervalId: any;
  transitioning = true;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentIndex++;
    this.transitioning = true;

    // Reset para o início após última imagem clone
    setTimeout(() => {
      if (this.currentIndex === this.images.length + 1) {
        this.transitioning = false;
        this.currentIndex = 1;
      }
    }, 500); // deve coincidir com o tempo da transição
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  getTransition(): string {
    return this.transitioning ? 'transform 2s ease-in-out' : 'none';
  }
}
