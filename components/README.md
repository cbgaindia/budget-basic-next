# Components

Budget Basics uses modular approach to make it more re-usuable in future. This might repeat some styles in `css` but it's about finding that middle ground between DRY and re-usability principle.

## Directory

### Header

The header component which accepts 
 - `desc` - acts a title or a description.
 - `color` - background color.
 - `searchPage` - If the prop is passed, it will remove the search link from top.

### Highlights

This component can be used to show important news or updates on the site. It accepts `data` props which if empty, will prevent the component from rendering.

### Card

Individual card component for the homepage. It accepts `chapter` prop which includes all details required of the said chapter.. 

### Carousel

A Youtube carousel, currently build using iFrames and flexbox. It is optmized using [react-lite-youtube-embed](https://github.com/ibrahimcesar/react-lite-youtube-embed).

### Footer

Footer component used throughout the site. A different file is availble in folder which includes all required in object format. It is imported and used in main component. This makes it easier to use a CMS to build the footer in future.

### Sidebar

Sidebar component as seen in chapter page for Desktop users. It is made sticky usign `position: sticky` and uses GSAP to select current section reached based on scroll position.

### Menu

Similar to Sidebar but for mobile devices.

### Navigation

Navigation on bottom of Chapter page to navigate to next or previous chapter. Accepts `back` and `forward` props requiring chapter number of previous and next chapter respectively.

### SEO

SEO component to handle all of the meta data throughout the platform. If it is used, it will use default values for that page.

### Layout

Basic Layout component. Read more [here](https://nextjs.org/docs/basic-features/layouts)