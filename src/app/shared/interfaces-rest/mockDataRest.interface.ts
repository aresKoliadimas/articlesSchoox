import ArticleRest from './articleRest.interface';
import AuthorRest from './authorRest.interface';

interface MockDataRest {
  data: ArticleRest[];
  included: AuthorRest[];
}

export default MockDataRest;
