import Header from 'components/header';
import Seo from 'components/seo';

export default function Custom404() {
  const seo = {
    metaTitle: 'Page not found',
  };
  return (
    <>
      <Seo seo={seo} />

      <Header desc={<h2>You lost your way</h2>} color="#29314F" />
      <div className="page-404">
        <h2>404 - Page Not Found</h2>
      </div>
    </>
  );
}
