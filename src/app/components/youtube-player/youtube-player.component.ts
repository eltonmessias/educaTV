import { Component, Input, OnChanges, OnDestroy, OnInit, AfterViewInit, SimpleChanges, ElementRef, ViewChild } from '@angular/core';

declare var YT: any; // Declara a variável global da API do YouTube

@Component({
  standalone: true,
  selector: 'app-youtube-player',
  template: `
    <div #playerContainer class="player-container"></div>
  `,
  styles: [`
    
  `]
})
export class YoutubePlayerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() videoId!: string;
  @ViewChild('playerContainer', { static: false }) playerContainer!: ElementRef;
  player: any;

  ngOnInit(): void {
    // Não crie o player no ngOnInit, use o AfterViewInit.
  }

  ngAfterViewInit(): void {
    if ((window as any).YT && (window as any).YT.Player) {
      this.createPlayer();
    } else {
      // Se a API ainda não estiver carregada, configure o callback global
      (window as any).onYouTubeIframeAPIReady = () => this.createPlayer();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoId'] && !changes['videoId'].firstChange) {
      // Se o vídeo mudou, atualize o player
      if (this.player && typeof this.player.loadVideoById === 'function') {
        this.player.loadVideoById(this.videoId);
      } else {
        this.createPlayer();
      }
    }
  }

  createPlayer(): void {
    if (!this.videoId || !this.playerContainer) {
      return;
    }
    this.player = new YT.Player(this.playerContainer.nativeElement, {
      videoId: this.videoId,
      playerVars: {
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: (event: any) => {
          // Se desejar, inicie o vídeo automaticamente:
          // event.target.playVideo();
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.player && typeof this.player.destroy === 'function') {
      this.player.destroy();
    }
  }
}
