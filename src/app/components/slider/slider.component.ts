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

  ngOnInit(): void {
    // A cada 2 segundos, atualiza o índice do slide
    this.slideInterval$ = interval(3000).subscribe(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    });
  }

  ngOnDestroy(): void {
    if (this.slideInterval$) {
      this.slideInterval$.unsubscribe();
    }
  }
}
