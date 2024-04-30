import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import MockDataRest from '../shared/interfaces-rest/mockDataRest.interface';
import ArticleRest from '../shared/interfaces-rest/articleRest.interface';
import AuthorRest from '../shared/interfaces-rest/authorRest.interface';
import { MockDataParser } from '../parsers/mock-data.parser';
import { AUTHORS, BODIES, TITLES } from '../../assets/mock-data';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor(private mockDataParser: MockDataParser) {}

  getMockData(): Observable<any> {
    return of(this.generateMockData()).pipe(
      map((mockDataRest: MockDataRest) =>
        this.mockDataParser.parseMockData(mockDataRest)
      )
    );
  }

  generateMockData(): MockDataRest {
    const mockData: MockDataRest = {
      data: [],
      included: [],
    };

    for (let i = 0; i < 20; i++) {
      const article: ArticleRest = {
        type: 'articles',
        id: i.toString(),
        attributes: {
          title: TITLES[i],
          body: BODIES[i],
          created: '2024-04-30T14:56:29.000Z',
          updated: '2024-04-30T14:56:29.000Z',
        },
        relationships: {
          author: {
            data: { id: (100 + i).toString(), type: 'people' },
          },
        },
      };

      const author: AuthorRest = {
        type: 'people',
        id: (100 + i).toString(),
        attributes: {
          name: AUTHORS[i],
        },
      };

      mockData.data.push(article);
      mockData.included.push(author);
    }

    return mockData;
  }
}
