import Head from 'next/head';
import { useContext } from 'react';
import { GlobalContext } from 'pages/_app';
import { getStrapiMedia } from 'lib/media';
import { useRouter } from 'next/router';

const Seo = ({ seo }) => {
  const router = useRouter();
  const { defaultSeo, siteName } = useContext(GlobalContext);

  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  };
  const fullSeo = {
    ...seoWithDefaults,
    metaTitle: `${seoWithDefaults.metaTitle} - Budget Basics | ${siteName}`,
    shareImage: getStrapiMedia(seoWithDefaults.shareImage),
  };

  if (router.route == '/') {
    fullSeo.metaTitle = `${seoWithDefaults.metaTitle} | ${siteName}`;
  }

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;
