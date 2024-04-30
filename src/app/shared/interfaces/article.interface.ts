import Author from './author.interface';

interface Article {
  id: string;
  title: string;
  body: string;
  authors: Author[];
  type: string;
  createdDate: string;
  updatedDate: string;
}

export default Article;
