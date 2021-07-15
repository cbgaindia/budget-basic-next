const Article = ({ article }) => (
  <div
    className="articleContent"
    dangerouslySetInnerHTML={{ __html: article }}
  />
);

export default Article;
