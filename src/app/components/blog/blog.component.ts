import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogArticle } from '../../models/BlogArtivle';
import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  articles: BlogArticle[] = [];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }

  goToArticle(article: BlogArticle) {
    this.router.navigate(['/blog', article.id]);
  }
}
