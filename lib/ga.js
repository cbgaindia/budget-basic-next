// log the pageview with their URL
export const pageview = (url) => {
  if (typeof window !== 'undefined')
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
};

export const pageviewNew = (url) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_NEW, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  if (typeof window !== 'undefined') window.gtag('event', action, params);
};
