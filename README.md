# Washington Noir — premium jewellery showcase

A responsive, four-page static website concept for rings, bespoke watches and leather watch straps. Built with plain HTML, CSS and JavaScript so it can be hosted on Cloudflare Pages, GitHub Pages, Netlify or most web hosts.

## Design approach
The UI has been refined using the principles behind [UI/UX Design Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): a coherent design system, clear editorial hierarchy, restrained luxury palette, responsive grid behaviour, keyboard focus visibility, reduced-motion support, accessible interaction states, and practical mobile navigation. The separate [21st.dev Magic MCP](https://github.com/21st-dev/magic-mcp) was reviewed as an optional component-discovery/generation resource; this static version does not require an MCP server to run.

## Included
- `index.html` — Home
- `gallery.html` — three product collections, image lightbox, external checkout actions
- `about.html` — brand story and craft/process imagery
- `contact.html` — enquiry form with mailto fallback
- `assets/css/style.css` — responsive design system
- `assets/js/config.js` — brand email, social profiles and product checkout URLs
- `assets/js/main.js` — mobile navigation, lightbox, checkout routing and form behaviour

## Demo-ready publishing notes

The current brand is **Washington Noir**, a temporary client-review identity. It is safe to publish as a visual concept, but it is not a live store: checkout URLs, email, and social profiles are placeholders. Product purchase actions intentionally show a setup message until real checkout links are added. The contact form uses a mailto handoff and does not store submissions.

## Before publishing — required edits
1. Open `assets/js/config.js`.
2. Replace `contactEmail` with the real business email.
3. Replace all social profile URLs with the brand's real profiles.
4. Replace every `https://your-checkout-provider.example/...` value with the correct external checkout URL. Until replaced, Buy Now buttons deliberately show a configuration message instead of sending customers to a fake checkout.
5. Washington Noir is the temporary concept brand for client review. Replace it with the approved brand identity and supplied copy after acceptance.
6. Replace the sample Pexels photos with the owner's approved high-resolution assets where available. Images are loaded from Pexels remotely and use responsive-sized image URLs; this starter does not download or re-host them locally.
7. If the contact form must submit without opening the visitor's email app, connect a form service (for example Formspree) or a server endpoint and update the form handler. The current version uses a mailto handoff and does not store or directly transmit form submissions.
8. Add the final domain, configure HTTPS with the chosen host, and test on mobile and desktop.

## Hosting
Upload the contents of this folder (not the parent ZIP folder) to a static host. On Cloudflare Pages, choose **Create a project → Upload assets** for a direct upload, or connect a Git repository. No build command is required; the output directory is the root folder.

## Editing products
In `gallery.html`, duplicate a `.product-card` article inside the relevant product section. Update the image URL and descriptive alt text, product title, product code, description, and `data-product` key. Add a matching checkout URL for that key in `assets/js/config.js`.

## Image credits and performance
Sample imagery is loaded from Pexels image CDN URLs and remains hosted by Pexels. See the photo source links below; replace these with the client-approved product images before launch and confirm each image’s usage terms. The site uses `loading="lazy"` for below-the-fold product/story images, asynchronous image decoding, a graceful unavailable-image state, and CSS backgrounds for the hero photography. Focus indicators, reduced-motion support, keyboard-operated lightbox controls, mobile menu close behaviour, and a non-blocking demo notice have been added. For production, use appropriately sized WebP/AVIF files and retain useful alt text.

## Launch QA checklist
- [ ] Replace demo branding and placeholder copy
- [ ] Set real contact email and social URLs
- [ ] Configure all 9 checkout links
- [ ] Test each checkout link and enquiry form
- [ ] Check images load and verify usage permissions
- [ ] Test navigation, lightbox, keyboard controls and anchors
- [ ] Confirm all temporary Pexels images load in the published hosting environment
- [ ] Add analytics and a privacy notice if using tracking/cookies
- [ ] Verify page titles, descriptions, favicon, and domain metadata
- [ ] Test mobile widths and keyboard accessibility


## Temporary image sources

- [Gold jewellery on black background — Pexels](https://www.pexels.com/photo/golden-jewelry-on-black-background-15967464/)
- [Gold and diamond rings — Pexels](https://www.pexels.com/photo/elegant-gold-and-diamond-jewelry-rings-30541188/)
- [Minimalist gold rings — Pexels](https://www.pexels.com/photo/elegant-hand-modeling-minimalist-gold-rings-30721000/)
- [Gold jewellery and watch styling — Pexels](https://www.pexels.com/photo/elegant-gold-jewelry-on-hands-outdoors-33587293/)

Photos are placeholders for presentation only. Product imagery should be replaced with the client’s actual product photographs once approved.
