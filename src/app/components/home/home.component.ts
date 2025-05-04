import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SliderComponent } from "../slider/slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterModule,
    SliderComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  sobre_imagem = 'assets/imagens/sobre-img.png'


  sliderImages = [
    'assets/imagens/sobre/estudio/studio1.png',
    'assets/imagens/sobre/estudio/studio2.png',
    'assets/imagens/sobre/estudio/studio3.png',
    'assets/imagens/sobre/estudio/studio4.png',
    'assets/imagens/sobre/estudio/studio5.png',
    'assets/imagens/sobre/estudio/studio6.png',
    'assets/imagens/sobre/estudio/studio7.png',
    'assets/imagens/sobre/estudio/studio8.png',
    'assets/imagens/sobre/estudio/studio9.png',
  ]

}
