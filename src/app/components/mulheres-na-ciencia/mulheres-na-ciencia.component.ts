import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../safe.pipe';

@Component({
  selector: 'app-mulheres-na-ciencia',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './mulheres-na-ciencia.component.html',
  styleUrl: './mulheres-na-ciencia.component.scss'
})
export class MulheresNaCienciaComponent implements OnInit {

  videos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/mulheres-na-ciencia.json').subscribe(data => {
      this.videos = data;
    });
  }
}
