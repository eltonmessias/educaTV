import { Component } from '@angular/core';
import { Classe } from '../../models/Classe';
import { Subject } from '../../models/Subject';
import { Book } from '../../models/Book'; // novo modelo
import { CommonModule } from '@angular/common';
import { BookSubject } from '../../models/BookSubject';

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

  constructor() {}

  ngOnInit(): void {
    this.classes = [
      {
        id: 1,
        name: '10ª Classe',
        subjects: [
          {
            id: 101,
            name: 'Matemática',
            books: [
              { title: 'Matemática 10ª', description: 'Livro oficial do 10º ano', url: '/assets/livros/matematica10.pdf' },
              { title: 'Exercícios', description: 'Lista de exercícios', url: '/assets/livros/exercicios10.pdf' }
            ],
            playlistId: ''
          },
          {
            id: 102,
            name: 'Física',
            books: [
              { title: 'Física 10ª', description: 'Manual completo de física', url: '/assets/livros/fisica10.pdf' }
            ],
            playlistId: ''
          }
        ]
      },
      {
        id: 2,
        name: '11ª Classe',
        subjects: [
          {
            id: 201,
            name: 'Matemática',
            books: [
              { title: 'Matemática 11ª', description: 'Livro do 11º ano', url: '/assets/livros/matematica11.pdf' }
            ],
            playlistId: ''
          }
        ]
      }
    ];

    this.selectedClass = this.classes[0];
    this.selectedSubject = this.selectedClass.subjects[0];
    this.loadBooksForSubject(this.selectedSubject);
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
