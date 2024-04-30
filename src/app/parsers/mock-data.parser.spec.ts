import { MockDataParser } from './mock-data.parser';
import MockDataRest from '../shared/interfaces-rest/mockDataRest.interface';
import ArticleRest from '../shared/interfaces-rest/articleRest.interface';
import Article from '../shared/interfaces/article.interface';
import AuthorRest from '../shared/interfaces-rest/authorRest.interface';
import Author from '../shared/interfaces/author.interface';

describe('MockDataParser', () => {
  let mockDataParser: MockDataParser;

  beforeEach(() => {
    mockDataParser = new MockDataParser();
  });

  it('parseMockData(): should accept MockDataRest and return Article[]', () => {
    const mockData: MockDataRest = {
      data: [
        {
          id: '1',
          type: 'articles',
          attributes: {
            title: 'Test Article',
            body: 'This is a test article.',
            created: '2022-01-01',
            updated: '2022-01-02',
          },
          relationships: {
            author: {
              data: { id: '1', type: 'authors' },
            },
          },
        },
      ],
      included: [
        {
          id: '1',
          type: 'authors',
          attributes: { name: 'John Doe' },
        },
      ],
    };

    const parsedArticle: Article = {
      id: '1',
      title: 'Test Article',
      body: 'This is a test article.',
      type: 'articles',
      createdDate: '2022-01-01',
      updatedDate: '2022-01-02',
      authors: [{ id: '1', type: 'authors', name: 'John Doe' }],
    };

    spyOn(mockDataParser, 'parseData').and.callThrough();

    const result: Article[] = mockDataParser.parseMockData(mockData);

    expect(mockDataParser.parseData).toHaveBeenCalledWith(
      mockData.data,
      mockData.included
    );
    expect(result).toEqual([parsedArticle]);
  });

  it('parseData(): should accept ArticleRest[], AuthorRest[] and return Article[]', () => {
    const articles: ArticleRest[] = [
      {
        id: '1',
        type: 'articles',
        attributes: {
          title: 'Test Article',
          body: 'This is a test article.',
          created: '2022-01-01',
          updated: '2022-01-02',
        },
        relationships: {
          author: {
            data: { id: '1', type: 'authors' },
          },
        },
      },
    ];

    const authors: AuthorRest[] = [
      {
        id: '1',
        type: 'authors',
        attributes: { name: 'John Doe' },
      },
    ];
    const parsedArticle: Article = {
      id: '1',
      title: 'Test Article',
      body: 'This is a test article.',
      type: 'articles',
      createdDate: '2022-01-01',
      updatedDate: '2022-01-02',
      authors: [{ id: '1', type: 'authors', name: 'John Doe' }],
    };

    spyOn(mockDataParser, 'parseArticle').and.callThrough();

    const result: Article[] = mockDataParser.parseData(articles, authors);

    expect(mockDataParser.parseArticle).toHaveBeenCalledTimes(articles.length);
    expect(mockDataParser.parseArticle).toHaveBeenCalledWith(
      articles[0],
      authors
    );

    expect(result).toEqual([parsedArticle]);
  });

  it('parseArticle(): should accept ArticleRest, AuthorRest[] and return Article', () => {
    const article: ArticleRest = {
      id: '1',
      type: 'articles',
      attributes: {
        title: 'Test Article',
        body: 'This is a test article.',
        created: '2022-01-01',
        updated: '2022-01-02',
      },
      relationships: {
        author: {
          data: { id: '1', type: 'authors' },
        },
      },
    };

    const authorsRaw: AuthorRest[] = [
      {
        id: '1',
        type: 'authors',
        attributes: { name: 'John Doe' },
      },
    ];

    const parsedAuthor: Author = {
      id: '1',
      type: 'authors',
      name: 'John Doe',
    };

    spyOn(mockDataParser, 'parseAuthor').and.callThrough();

    const result: Article = mockDataParser.parseArticle(article, authorsRaw);

    expect(mockDataParser.parseAuthor).toHaveBeenCalledTimes(1);
    expect((mockDataParser.parseAuthor as jasmine.Spy).calls.allArgs()).toEqual(
      [[authorsRaw[0], 0, authorsRaw]]
    );
    expect(result.authors).toEqual([parsedAuthor]);
  });

  it('parseAuthor(): should accept AuthorRest and return Author', () => {
    const authorRaw: AuthorRest = {
      id: '1',
      type: 'authors',
      attributes: { name: 'John Doe' },
    };

    const parsedAuthor: Author = {
      id: '1',
      type: 'authors',
      name: 'John Doe',
    };

    const result = mockDataParser.parseAuthor(authorRaw);

    expect(result).toEqual(parsedAuthor);
  });
});
