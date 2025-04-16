import { Component, Input, OnChanges, OnDestroy, OnInit, AfterViewInit, SimpleChanges, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

declare var YT: any;

@Component({
  selector: 'app-youtube-player',
  standalone: true,
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class YoutubePlayerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() videoId!: string;
  @ViewChild('playerContainer', { static: false }) playerContainer!: ElementRef;
  player: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if ((window as any).YT && (window as any).YT.Player) {
      this.createPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = () => this.createPlayer();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoId'] && !changes['videoId'].firstChange) {
      if (this.player && typeof this.player.loadVideoById === 'function') {
        this.player.loadVideoById(this.videoId);
      } else {
        this.createPlayer();
      }
    }
  }

  createPlayer(): void {
    if (!this.videoId || !this.playerContainer) return;

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
          // event.target.playVideo(); // se quiser forçar autoplay
          
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
