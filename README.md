<h1 align="center">Budget Basics</h1>
<h3 align="center">Part of the <a href="https://openbudgetsindia.org/">Open Budgets India</a> Project</h3>
<br/>
<p align="center">
<img alt="Budget Basics Logo" src="https://budgetbasics.openbudgetsindia.org/api/uploads/Budget_Basics_fc00737f71.png"/>
<br/>
<br/>
<a href="https://github.com/cbgaindia/budget-basic-next/blob/main/LICENSE">
<img alt="MIT License" src="https://img.shields.io/apm/l/atomic-design-ui.svg?"/>
</a>
</p>

Budget Basics aims to demystify concepts and processes of Government budgets in India. 
Built as a documentation platform, it provides the content in easily digestible form. 
This is the front end of the platform built using nextjs. 
We welcome all contributions and pull requests!

<p align="center">Visit<a href="https://budgetbasics.openbudgetsindia.org/"> Budget Basics</a></p>

- [Features](#features)
- [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
  - [Backend](#backend)
- [Guide](#guide)
  - [Directory Structure](#directory-structure)
  - [Styling](#styling)
  - [Components](#components)
  - [GSAP](#gsap)
- [Data Fetching](#data-fetching)
  - [Global Data](#global-data)
  - [Homepage Data](#homepage-data)
  - [Dynamic Routes Data](#dynamic-routes-data)
- [Run Locally](#run-locally)
- [Contributing](#contributing)

## Features

- 📱 **Responsive:** Use Desktop, Laptop or  Mobile devices. It's optimized for all.
- ♿ **Accessible:** The platform is screen-reader friendly.
- 🚀 **Performant:** It's fast!
- 🌐 **JAMStack:** [Next.js](https://github.com/vercel/next.js) with [Strapi](https://github.com/strapi/strapi) headless CMS to make development process fast and efficient.
- 🔍 **MeiliSearch:** Super fast search by using [Meilisearch](https://github.com/meilisearch/MeiliSearch) as a micro-service.
- 💄 **BEM & SASS:** The platfrom utilizes BEM methodology with SASS to make styling efficient and maintainable.
- 💎 **Modular:** Easy to add or remove components based on usage -
  - Highlights to show multiple important content/news on the header
  - Custom lightweight carousel to show Youtube videos that are lazy-loaded.
  - Sticky sidebar to list all sections and sub-sections available.
  - Footer Buttons to navigate to the next or previous chapter. 
  - and more..

## Getting Started

Make sure to have a recent version of Node. You'll need Node 10.13 or later.

### Environment Variables

To run this project, you will need to create a new .env file on the root directory add the following environment variables.

`NEXT_PUBLIC_STRAPI_API_URL` - required to fetch content. Setup the [strapi instance](https://github.com/cbgaindia/budget-basic-strapi)

`NEXT_PUBLIC_MEILISEARCH_URL` - required to enable search functionality

`NEXT_PUBLIC_MEILISEARCH_API` - required to enable search functionality

eg: `NEXT_PUBLIC_STRAPI_API_URL = "https://strapi-api-server.com/"`

### Backend

Follow the steps at [budget-basic-strapi](https://github.com/cbgaindia/budget-basic-strapi) first to set up the backend instance
before booting up the frontend. This should set up Postgresql database, Strapi CMS and Meilisearch Instance.

## Guide
### Directory Structure

```
budget-basics-next/
┣ components/
┣ lib/
┣ pages/
┣ public/
┃ ┣ assets/
┃ ┃ ┣ fonts/
┃ ┃ ┣ icons/
┣ style/
┃ ┣ pages/
┃ ┣ tools/
┣ utils/
```

### Styling

This project follows BEM Methodology with Sass Preprocessor to make styling more efficient and future maintainable. Have a look around different files to know more about it. You can learn more about styling directory [here](/styles/README.md)
### Components

It is a component-based project which makes it easier to add, edit or remove features in the future.

All the components are available at `/components`. Each component have it's own folder with it's styling file is included. This makes it easier to use that component on some other
project. Larn more [here](components/README.md)

### GSAP

To handle animation for sidebar in desktop and menubar for mobile, [GSAP](https://greensock.com/gsap/) is used. You will find following
function in `/pages/[chapter].js`:
- `handleSidebarAnimation`
- `handleSubheadingAnimation` 

and the following in `/components/menu.js`: 
- `handleMenuAnimation`
- `handleSubheadingAnimation`

These functions use GSAP [ScrollTrigger](https://greensock.com/scrolltrigger/) to handle pinning and other animations.

## Data Fetching

All the data is being fetched from a Strapi CMS. You can use any [headless CMS](https://nextjs.org/docs/basic-features/data-fetching).

### Global Data

Fetching Global Settings and data on `_app.js` which then can be passed to other components using `createContext`

```javascript
import React, { createContext } from 'react'

export const GlobalContext = createContext({})

function MyApp({ Component, pageProps }) {
 const { global } = pageProps
 return (
    <>
      <Layout>
        <GlobalContext.Provider value={global}>
          <Component {...pageProps} />
        </GlobalContext.Provider>
      </Layout>
    </>
  );
}

MyApp.getInitialProps = async (ctx) => {
 const appProps = await App.getInitialProps(ctx)
 const global = await fetchAPI('/global')
 return { ...appProps, pageProps: { global } }
}
```

For example, on `/components/search.js` we can use this global data:

```javascript
import React, { useContext } from 'react'
import { GlobalContext } from 'pages/_app'

const Search = ({ Component, pageProps }) => {
 const { articles } = useContext(GlobalContext)

 // some cool stuff
}
```

### Homepage Data

Homepage data includes a description for header, content for highlights slider, youtube links for carousel, and some metadata.

We can fetch all of that and all of different chapters (categories) easily:

```javascript
export async function getStaticProps() {
 const homepage = await fetchAPI('/homepage')
 const chapters = await fetchAPI('/chapters') 
 return {
  props: { homepage, chapters },
  revalidate: 1,
 }
}
```

`revalidate: 1` - allows us to create or update static pages after building the site. Read
[Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration)

### Dynamic Routes Data

In our project, we have one [dynamic route](https://nextjs.org/docs/routing/dynamic-routes), `[chapter].js`. Dynamic routes
requires `getStaticPaths` to list paths during build time. [Read more](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).

```javascript
export async function getStaticPaths() {
 const chapters = await fetchAPI('/chapters')
 return {
  paths: chapters.map((chapter) => ({
   params: {
    chapter: chapter.slug,
 	 },
  })),
  fallback: false,
 }
}

export async function getStaticProps({ params }) {
 const chapter = await fetchAPI(`/chapters?slug=${params.chapter}`)
 const chapters = await fetchAPI(`/chapters`) 
 return {
  props: { chapter: chapter[0], chapters },
  revalidate: 1,
 }
}
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/cbgaindia/budget-basic-next.git
```

Go to the project directory

```bash
  cd budget-basic-next
```

Install dependencies

```bash
  npm install
```

Create .env in root folder and follows keys

```bash
NEXT_PUBLIC_STRAPI_API_URL
NEXT_PUBLIC_MEILISEARCH_URL 
NEXT_PUBLIC_MEILISEARCH_API
```

Start the server in development

```bash
  npm run dev
```

or build and start production mode

```bash
  npm run build && npm run start
```


## Contributing

For any new feature or bug reports, please request it in [issues](https://github.com/cbgaindia/budget-basic-next/issues).

See [CONTRIBUTING.md](https://github.com/cbgaindia/budget-basic-next/blob/main/CONTRIBUTING.md) for ways to get started.

Please adhere to [Code of Conduct](https://github.com/cbgaindia/budget-basic-next/blob/main/CODE_OF_CONDUCT.md).
