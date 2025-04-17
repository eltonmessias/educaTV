import { Component, OnInit, ViewChild, ElementRef, viewChild } from '@angular/core';
import { Classe } from '../../models/Classe';
import { Subject } from '../../models/Subject';
import { CommonModule } from '@angular/common';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from '../../models/Video';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubePlayerComponent } from "../youtube-player/youtube-player.component";

@Component({
  selector: 'app-video-aulas',
  standalone: true,
  imports: [
    CommonModule,
    YoutubePlayerComponent
],
  templateUrl: './video-aulas.component.html',
  styleUrl: './video-aulas.component.scss'
})
export class VideoAulasComponent implements OnInit{

  @ViewChild('playerContainer') playerContainerRef!: ElementRef;


  // Dados das classes e disciplinas (você pode ajustá-los conforme o currículo)
  classes: Classe[] = [];
  selectedClass: Classe | null = null;
  selectedSubject: Subject | null = null;

  // Lista de vídeos carregados (de uma playlist do YouTube)
  videos: Video[] = [];

  // Variáveis para o vídeo atualmente reproduzido
  selectedVideoUrl: SafeResourceUrl | null = null;
  selectedVideoId: string | null = null;
  selectedVideoTitle: string = '';


  constructor (private youtubeService: YoutubeService, private sanitizer: DomSanitizer, private http: HttpClient) {}



  ngOnInit(): void {

    this.http.get<Classe[]>('assets/data/classes-playlists.json').subscribe(data => {
      this.classes = data;
      this.selectedClass = this.classes[0];
      this.selectedSubject = this.selectedClass.subjects[0];
      this.loadVideosForSubject(this.selectedSubject);
    });

    // Seleciona a primeira classe e a primeira disciplina por padrão
    this.selectedClass = this.classes[0];
    this.selectedSubject = this.selectedClass.subjects[0];
    this.loadVideosForSubject(this.selectedSubject);
  }

  setSelectedClass(classe: Classe): void {
    this.selectedClass = classe;
    if (classe.subjects.length) {
      this.selectedSubject = classe.subjects[0];
      this.loadVideosForSubject(this.selectedSubject);
    } else {
      this.selectedSubject = null;
      this.videos = [];
    }
  }

  setSelectedSubject(subject: Subject): void {
    this.videos = [];
  this.selectedVideoUrl = null;
  this.selectedVideoId = null;
  this.selectedVideoTitle = '';
  this.selectedSubject = subject
  this.loadVideosForSubject(subject)

  if (!subject || !subject.playlistId) {
    console.warn('Disciplina sem playlist associada.');
    return;
  }

  this.youtubeService.getvideosFromPlaylist(subject.playlistId)
    .subscribe(response => {
      this.videos = response;
    }, error => {
      console.error('Erro ao carregar vídeos:', error);
    });
  }

  loadVideosForSubject(subject: Subject | null): void {
    if (!subject) {
      this.videos = [];
      return;
    }
    // const playlistId = this.playlistMapping[subject.id];
    const playlistId = this.selectedSubject?.playlistId
    if (!playlistId) {
      console.error('Playlist ID não mapeado para o subject id:', subject.id);
      this.videos = [];
      return;
    }
  
    this.youtubeService.getvideosFromPlaylist(subject.playlistId)
      .subscribe(response => {
        this.videos = response;
      }, error => {
        console.error('Erro ao carregar vídeos:', error);
      });
  }
  

  playVideo(videoId: string, videoTitle: string): void {
    const url = `https://www.youtube.com/embed/${videoId}`;
    if (!videoId) {
      console.error('ID do vídeo é inválido ou undefined');
      return;
    }
    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.selectedVideoTitle = videoTitle;
    this.selectedVideoId = videoId

    setTimeout(() => {
      this.playerContainerRef?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 10);
  }
}
