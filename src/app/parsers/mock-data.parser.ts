import MockDataRest from '../shared/interfaces-rest/mockDataRest.interface';
import ArticleRest from '../shared/interfaces-rest/articleRest.interface';
import Article from '../shared/interfaces/article.interface';
import AuthorRest from '../shared/interfaces-rest/authorRest.interface';
import Author from '../shared/interfaces/author.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDataParser {
  parseMockData(mockData: MockDataRest): Article[] {
    return this.parseData(mockData.data, mockData.included);
  }

  parseData(articles: ArticleRest[], authors: AuthorRest[]): Article[] {
    return articles.map((article: ArticleRest) =>
      this.parseArticle(article, authors)
    );
  }

  parseArticle(article: ArticleRest, authorsRaw: AuthorRest[]): Article {
    const authors: Author[] = authorsRaw
      .map(this.parseAuthor)
      .filter(
        (author: Author) => author.id === article.relationships.author.data.id
      );

    return {
      id: article.id,
      title: article.attributes.title,
      body: article.attributes.body,
      type: article.type,
      createdDate: article.attributes.created,
      updatedDate: article.attributes.updated,
      authors,
    };
  }

  parseAuthor(authorRaw: AuthorRest): Author {
    return {
      id: authorRaw.id,
      type: authorRaw.type,
      name: authorRaw.attributes.name,
    };
  }
}
