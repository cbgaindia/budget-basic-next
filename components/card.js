export default function Card({ chapter }) {
  return (
    <div className="card-content">
      {chapter.totalArticles == 0 && (
        <img
          src="/assets/icons/coming_soon.png"
          alt="coming soon"
          aria-label="hidden"
          className="comingSoon"
        />
      )}

      <picture>
        <img
          srcSet={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${chapter.icon.url}`}
          alt={chapter.title}
          media="(min-width: 640px)"
          width="150"
          height="120"
        />

        <img
          src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          alt={chapter.title}
          width="1"
          height="1"
          media="(max-width: 640px)"
        />
      </picture>

      <div className="cardDetail">
        <h2 className="title">{chapter.title}</h2>
      </div>
      {chapter.Desc && <p className="desc">{chapter.Desc}</p>}
    </div>
  );
}
