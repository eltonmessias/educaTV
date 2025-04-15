import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Video } from '../models/Video';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey = 'AIzaSyBbX3urHINfXDOdMUwN5_tSwx6cRs43PLM';
  private baseUrl = 'https://www.googleapis.com/youtube/v3';


  constructor(private http: HttpClient) { }

  getvideosFromPlaylist(playlistId: string, maxResults: number = 10): Observable<Video[]> {
    const url = `${this.baseUrl}/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Resposta da API:', response);
        return response.items.map((item: any) => {
          console.log('Item:', item);
          return {
            title: item.snippet.title,
            videoId: item.snippet.resourceId.videoId, // Verifique se esse campo existe no item
            thumbnailUrl: item.snippet.thumbnails.medium.url
          } as Video;
        });
      })
    );
  }
}
