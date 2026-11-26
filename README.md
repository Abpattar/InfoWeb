# InfoWeb

InfoWeb is a curated static web platform featuring articles on information design, writing, and research, alongside an integrated book store and user pages.

## Project Structure

- `index.html` — Home page with featured articles, popular reading list, and newsletter signup
- `category.html`, `writing.html`, `research.html` — Topic hubs and curated reading lists
- `article.html`, `article2.html`, `article3.html`, `iarticle.html`, `iarticle2.html`, `interesting-*.html` — Article pages
- `store.html`, `cart.html` — Book store catalog and shopping cart
- `search.html` — Site-wide article search
- `about.html`, `contact.html`, `faq.html`, `feedback.html`, `privacy.html`, `terms.html` — Informational and support pages
- `login.html`, `signup.html`, `profile.html` — Account pages
- `assets/css/` — Global and page-specific stylesheets
- `assets/images/` — Book covers and SVG graphics

## Local Preview

Serve the project directory with any static HTTP server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.
