# AbihaTech Marketing Website

A responsive WordPress theme for **AbihaTech**, marketing two products:

- **[MenuSpilot](https://menuspilot.com)** — QR-code digital menu & zero-commission ordering for restaurants.
- **AbihaTech Car Rentals** — Airport transfers, tour packages, outstation trips and hourly rentals in Diu, Gujarat.

Theme location: `wp-content/themes/abihatech`

## Color theme

Colors are sourced directly from the AbihaTech logo (navy-to-blue gradient "AT" mark) with a warm amber accent for contrast on calls-to-action and ratings:

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#0A1F44` | Headings, footer, header text |
| `--blue` | `#155EEF` | Primary brand blue, links |
| `--blue-bright` | `#00B2FF` | Gradient highlight |
| `--accent` | `#FF8A00` | CTA buttons, ratings, badges (contrast color) |
| `--bg` | `#F7F9FC` | Page background |

All variables live at the top of `wp-content/themes/abihatech/style.css` — change them there to re-theme the whole site.

## Pages & sections

- **Homepage** (`front-page.php`): hero, products overview, MenuSpilot teaser, Car Rental teaser, customer reviews, happy customers, closing CTA.
- **`/menuspilot`** (`page-menuspilot.php`): full MenuSpilot feature breakdown, screenshots, MenuSpilot-only reviews.
- **`/car-rental`** (`page-car-rental.php`): full Car Rental service breakdown (airport transfer, tour packages, outstation, hourly), booking screenshot, Car Rental-only reviews.

Both pages, plus sample testimonials, are created automatically on first load — no manual content entry required to see the site working.

## Installing on a WordPress + MySQL server

1. Create a MySQL/MariaDB database and a `wp-config.php` for it, as with any WordPress install.
2. Copy `wp-content/themes/abihatech` into your WordPress site's `wp-content/themes/` directory.
3. In **wp-admin → Appearance → Themes**, activate **AbihaTech Marketing**.
4. Visit the homepage — sample pages (MenuSpilot, Car Rental) and six sample testimonials are seeded automatically into the standard WordPress MySQL tables (`wp_posts` / `wp_postmeta`).
5. (Optional) Assign a menu under **Appearance → Menus** to the **Primary Menu** location; otherwise a sensible default menu is shown.

## Managing reviews

Testimonials are a custom post type (**Testimonials** in the wp-admin sidebar), stored in MySQL like any other post. Each one has:

- Title (used as the short headline / initials source)
- Content (the review quote)
- Rating (1–5, meta field)
- Product tag (`MenuSpilot` or `Car Rental`, meta field)
- Customer role / location (meta field, e.g. "Owner, Cafe Aroma")

Add, edit, or remove testimonials from wp-admin at any time — the homepage and both product pages pull the latest published reviews automatically.

## Screenshots / product images

Product "screenshots" are placeholder SVG mockups in `wp-content/themes/abihatech/assets/images/mockups/` (dashboard, phone menu, booking screen, fleet illustration), styled in the brand colors. Swap these for real product screenshots by replacing the files at the same paths, or by editing the `<img src>` references in:

- `template-parts/section-products.php`
- `template-parts/section-menuspilot.php`
- `template-parts/section-car-rental.php`
- `page-menuspilot.php`, `page-car-rental.php`

## Logo

`assets/images/logo.svg` is a vector recreation of the AbihaTech logo for use in the theme (header + footer). Replace it with the original logo file (keeping the filename `logo.svg`, or update the `<img src>` in `header.php` / `footer.php`) for pixel-perfect branding.

## Responsive design

Mobile-first CSS with breakpoints at 1024px and 768px: the header collapses into a slide-down menu with a hamburger toggle below 768px, the two-column product/feature sections stack to one column, and the stats/review grids reflow from 3–4 columns down to 1–2 on small screens.
