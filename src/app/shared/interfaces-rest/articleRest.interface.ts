interface ArticleRest {
  type: string;
  id: string;
  attributes: {
    title: string;
    body: string;
    created: string;
    updated: string;
  };
  relationships: {
    author: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

export default ArticleRest;
