import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss'
})
export class NoticiasComponent implements OnInit{

  noticias: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
      this.http.get<any[]>('assets/data/noticias.json').subscribe(data => {
        this.noticias = data;
      })
  }

}
