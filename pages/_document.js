import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
						rel="stylesheet"
					/>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
					<link
						href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800;900&display=swap"
						rel="stylesheet"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/assets/favicon/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/assets/favicon/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/assets/favicon/favicon-16x16.png"
					/>
					<link rel="alternate icon" href="/assets/favicon/favicon.ico" />
					<link
						rel="icon"
						type="image/svg+xml"
						href="/assets/favicon/favicon.svg"
					/>
					<link
						rel="mask-icon"
						href="/assets/favicon/safari-pinned-tab.svg"
						color="#ff8a01"
					/>

					{/* Global Site Tag (gtag.js) - Google Analytics */}
					{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
						<>
							<script
								async
								src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
							/>
							<script
								dangerouslySetInnerHTML={{
									__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
								}}
							/>
						</>
					)}

					{/* New Global Site Tag (gtag.js) - Google Analytics */}
					{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_NEW && (
						<>
							<script
								async
								src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_NEW}`}
							/>
							<script
								dangerouslySetInnerHTML={{
									__html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_NEW}');
          `,
								}}
							/>
						</>
					)}
				</Head>
				<body>
					<Main className="nextApp" />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
