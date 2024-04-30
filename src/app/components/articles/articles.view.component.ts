import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ArticleViewComponent } from '../article/article.view.component';
import { NO_ARTICLES_PLACEHOLDER_TEXT } from '../../shared/constants';
import Article from '../../shared/interfaces/article.interface';

@Component({
  selector: 'app-articles',
  standalone: true,
  templateUrl: './articles.view.component.html',
  styleUrl: './articles.view.component.scss',
  imports: [CommonModule, ArticleViewComponent],
})
export class ArticlesViewComponent {
  @Input() articles!: Article[];

  readonly noArticlesPlaceholderText: string = NO_ARTICLES_PLACEHOLDER_TEXT;
}
