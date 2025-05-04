import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-noticia-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticia-detail.component.html',
  styleUrl: './noticia-detail.component.scss'
})
export class NoticiaDetailComponent implements OnInit{
  noticia: any = null;

  

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.http.get<any[]>('assets/data/noticias.json').subscribe(data => {
      this.noticia = data.find(n => n.id === id);
    });
  }

}
