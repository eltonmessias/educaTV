import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BlogArticle } from '../models/BlogArtivle';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private articlesUrl = 'assets/data/blog-articles.json';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<BlogArticle[]> {
    return this.http.get<BlogArticle[]>(this.articlesUrl);
  }

  getArticleById(id: number): Observable<BlogArticle | undefined> {
    return new Observable(subscriber => {
      this.getArticles().subscribe(articles => {
        const article = articles.find(a => a.id === id);
        subscriber.next(article);
        subscriber.complete();
      });
    });
  }
}

