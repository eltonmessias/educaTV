import { Component } from '@angular/core';
import { Classe } from '../../models/Classe';
import { Subject } from '../../models/Subject';
import { Book } from '../../models/Book'; // novo modelo
import { CommonModule } from '@angular/common';
import { BookSubject } from '../../models/BookSubject';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.scss'
})
export class LivrosComponent {
  classes: Classe[] = [];
  selectedClass: Classe | null = null;
  selectedSubject: Subject | null = null;
  books: Book[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Classe[]>('assets/data/manuais.json').subscribe(data => {
      this.classes = data;
      this.selectedClass = this.classes[0]
      this.selectedSubject = this.selectedClass.subjects[0]
      this.loadBooksForSubject(this.selectedSubject)
    })
  }

  setSelectedClass(classe: Classe): void {
    this.selectedClass = classe;
    if (classe.subjects.length) {
      this.selectedSubject = classe.subjects[0];
      this.loadBooksForSubject(this.selectedSubject);
    } else {
      this.selectedSubject = null;
      this.books = [];
    }
  }

  setSelectedSubject(subject: Subject): void {
    this.selectedSubject = subject;
    this.loadBooksForSubject(subject);
  }

  loadBooksForSubject(subject: Subject | null): void {
    if (!subject) {
      this.books = [];
      return;
    }

    this.books = subject.books ?? [];
  }
  
}
