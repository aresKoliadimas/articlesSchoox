import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  BY_TEXT,
  CREATED_ON_TEXT,
  DOWN_ARROW_TEXT,
  UPDATED_ON_TEXT,
  UP_ARROW_TEXT,
} from '../../shared/constants';
import Article from '../../shared/interfaces/article.interface';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.view.component.html',
  styleUrl: './article.view.component.scss',
})
export class ArticleViewComponent {
  @Input() article: Article | null | undefined;
  isBodyExpanded!: boolean;

  readonly byText: string = BY_TEXT;
  readonly createdOnText: string = CREATED_ON_TEXT;
  readonly updatedOnText: string = UPDATED_ON_TEXT;
  readonly upArrowText: string = UP_ARROW_TEXT;
  readonly downArrowText: string = DOWN_ARROW_TEXT;

  onExpandBody(): void {
    this.isBodyExpanded = !this.isBodyExpanded;
  }
}
