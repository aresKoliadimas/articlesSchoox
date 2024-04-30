import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockDataService } from './services/mock-data.service';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { ArticlesViewComponent } from './components/articles/articles.view.component';
import { SearchViewComponent } from './components/search/search.view.component';
import Article from './shared/interfaces/article.interface';
import Author from './shared/interfaces/author.interface';
import { SPACES_SYMBOLS_REGEX, WHITESPACE } from './shared/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    CommonModule,
    ArticlesViewComponent,
    SearchViewComponent,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  articles!: Article[];
  articlesSubscription!: Subscription;
  private searchedTermSubject: Subject<string> = new Subject<string>();
  private cashedArticles!: Article[];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.getMockData();
    this.handleSearch();
  }

  ngOnDestroy(): void {
    this.articlesSubscription?.unsubscribe();
  }

  getMockData(): void {
    this.articlesSubscription = this.mockDataService
      .getMockData()
      .subscribe((mockData: Article[]) => {
        this.articles = mockData;
        this.cashedArticles = mockData;
      });
  }

  onInputChanged(searchedTerm: string): void {
    this.searchedTermSubject.next(searchedTerm);
  }

  handleSearch(): void {
    this.searchedTermSubject
      .pipe(debounceTime(750), distinctUntilChanged())
      .subscribe((searchTerm: string) => {
        this.articles = !searchTerm.length
          ? this.cashedArticles
          : this.getSearchedArticles(searchTerm);
      });
  }

  getSearchedArticles(searchedTerm: string): Article[] {
    const searchTermLower = searchedTerm.toLowerCase();

    return this.cashedArticles.filter(
      (article: Article) =>
        this.isSearchedTermInText(searchTermLower, article.title) ||
        this.isSearchedTermInAuthors(searchTermLower, article.authors) ||
        this.isSearchedTermInText(searchTermLower, article.body)
    );
  }

  isSearchedTermInText(searchedTerm: string, title: string): boolean {
    return title
      .toLocaleLowerCase()
      .split(SPACES_SYMBOLS_REGEX)
      .includes(searchedTerm);
  }

  isSearchedTermInAuthors(searchedTerm: string, authors: Author[]): boolean {
    return authors.some((author: Author) => {
      const [firstName, lastName]: string[] = author.name.split(WHITESPACE);

      return (
        firstName.toLowerCase().includes(searchedTerm) ||
        lastName.toLowerCase().includes(searchedTerm)
      );
    });
  }
}
