# parashux.in

Code rebuild of the Framer site at [parashux.in](https://parashux.in): same layout, text, colours, fonts, images, videos and animations, now as a regular Next.js project you own.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out (host it on any static host: Vercel, Netlify, S3, …)
npm start          # serve ./out locally
```

## Pages

| Route         | What it is                                                              |
| ------------- | ----------------------------------------------------------------------- |
| `/`           | Main portfolio (intro video, hero, projects, about, side projects, testimonials, footer) |
| `/about-me`   | About page                                                              |
| `/playground` | Draggable infinite image canvas                                         |
| `/home`       | "Image unroll scroll" WebGL experiment                                  |
| `/testing`    | 3D card stack experiment                                                |

## Structure

```
src/
  app/                  routes (one folder per page) + root layout + 404
  components/
    framer/             building blocks that reproduce Framer behaviour
      BgImage             responsive "fill" image (same srcset as Framer)
      Video               muted looping video that plays only when on screen
      ScrollTransform     Framer "Scroll Transform" effect (section-triggered, spring smoothed)
      Parallax            Framer "Scroll Speed" effect
      Appear / InViewAppear  load and in-view appear animations
      ImageParallax       image drifting inside its frame
    home/               sections of the home page (Hero, WorkDesktop, WorkPhone, …)
    navigation/         floating nav bar (desktop / phone / phone menu)
    cursor/             custom cursor ("View", "Under NDA", … labels)
    testimonials/       testimonial carousel
    IntroVideo, SoundButton, SmoothScroll, SocialIcon
    about/ playground/ unroll/ testing/   the other pages
  styles/
    fonts.css           @font-face rules (all fonts are self-hosted in public/fonts)
    framer-base.css     base + rich-text rules shared by every page
    components/         shared component styles (navigation)
    pages/              per-page layout styles
public/
  images/ videos/ audio/ fonts/   every asset, downloaded from the live site
```

### How the markup works

Each section keeps the class names from the original Framer build (`framer-xxxxxx`), and the CSS in `src/styles` targets those classes. That's what keeps the layout pixel-identical at every breakpoint. `data-framer-name` attributes carry the layer names from the Framer project, so you can match an element to its layer.

Responsive behaviour is plain CSS. Desktop (≥1200px) and phone layouts both live in the markup, and the `hidden-…` classes switch between them with media queries.

Text styling uses Framer's CSS variables (`--framer-font-size`, `--framer-text-color`, …) on the `framer-text` elements. To change copy, edit the text in the section component. To change its style, edit those variables.

### Editing animations

- Scroll animations live in the `targets` prop of each `<ScrollTransform>`. The first entry is the resting state; each later entry is the state reached while its `trigger` element scrolls through the viewport.
- The nav fades in 6s after load (`navAppear` in `src/app/page.tsx`) and hides when scrolling down.
- Smooth scrolling uses Lenis with `intensity={15}` (`SmoothScroll` in `src/app/page.tsx`).

## Notes

- The footer credit now reads "Crafted with ♥ in code" instead of "in framer". The 404 page copies the live one but drops the Framer logo.
- Fonts are copies of what the live site serves, including the custom uploads ("Bickham Script Pro", "Kate Medium", "Geist Pixel"). Make sure your font licences allow self-hosting before publishing.
- Videos are the original uploads (~250 MB in total), like the live site.
