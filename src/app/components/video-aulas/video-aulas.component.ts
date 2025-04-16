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

  // Mapeamento entre a disciplina (subject.id) e a playlist do YouTube
  playlistMapping: { [subjectId: number]: string } = {
    // Altere os IDs abaixo para os das suas playlists
    101: 'YOUR_PLAYLIST_ID_FOR_MATEMATICA_10',
    102: 'YOUR_PLAYLIST_ID_FOR_FISICA_10',
    103: 'YOUR_PLAYLIST_ID_FOR_BIOLOGIA_10',
    // Outras disciplinas e classes podem ser mapeadas aqui
  };

  constructor (private youtubeService: YoutubeService, private sanitizer: DomSanitizer) {}



  ngOnInit(): void {

     // Dados simulados das classes e disciplinas (você pode adaptar conforme necessário)
    this.classes = [
      {
        id: 1,
        name: '10ª Classe',
        subjects: [
          { id: 101, name: 'Matemática', videos: [] },
          { id: 102, name: 'Física', videos: [] },
          { id: 103, name: 'Biologia', videos: [] }
        ]
      },
      {
        id: 2,
        name: '11ª Classe',
        subjects: [
          { id: 201, name: 'Matemática', videos: [] },
          { id: 202, name: 'Física', videos: [] }
          // Outras disciplinas…
        ]
      },
      {
        id: 3,
        name: '12ª Classe',
        subjects: [
          { id: 301, name: 'Matemática', videos: [] },
          { id: 302, name: 'Física', videos: [] }
          // Outras disciplinas…
        ]
      }
    ];

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
    this.selectedSubject = subject;
    this.loadVideosForSubject(subject);
  }

  loadVideosForSubject(subject: Subject | null): void {
    if (!subject) {
      this.videos = [];
      return;
    }
    // const playlistId = this.playlistMapping[subject.id];
    const playlistId = 'PL8ekXvCKwal8F8HYrxn9SwOm-lfbykTTw';
    if (!playlistId) {
      console.error('Playlist ID não mapeado para o subject id:', subject.id);
      this.videos = [];
      return;
    }
    // Chama o serviço para carregar vídeos da playlist
    this.youtubeService.getvideosFromPlaylist(playlistId)
      .subscribe(response => {
        console.log('Vídeos da playlist:', response);
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
