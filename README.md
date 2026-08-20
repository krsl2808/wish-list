# 🎀 Lalli's 20th Birthday Wishlist

A personal, mobile-friendly birthday wishlist website built as a small full-stack web project.

The website lets the wishlist owner add, edit, and delete products through a private-style admin page, while friends and family can view the wishlist through a public Vercel URL.

---

## ✨ Project Overview

This project started as a simple static wishlist and was gradually upgraded into an online wishlist application.

The final project contains:

- 🎀 A cute birthday-themed public wishlist
- 🛍️ Product cards
- 👗 Product categories
- 🔍 Product search
- ↕️ Product sorting
- ⭐ Wishlist priority
- 📏 Size information
- 🎨 Colour information
- 📝 Personal notes for individual products
- 🏪 Multiple stores for each product
- 💰 Store-specific prices
- 🔗 Direct product links
- 📸 Product screenshots/images
- 📱 Responsive mobile layout
- ☁️ Supabase database integration
- ✏️ Admin edit functionality
- ➕ Admin add functionality
- 🗑️ Admin delete functionality
- 🌎 Vercel deployment
- 💻 GitHub version control

---

# 🎯 Purpose

The purpose of the website is to give friends and family a clear idea of the kinds of things the birthday wishlist owner likes without requiring an exact list of gifts.

The page also contains a personal note explaining that the listed products are examples/inspiration rather than a strict shopping list.

The wishlist can also be used as inspiration for:

- 🎁 Gift hampers
- 💍 Jewellery
- 🌸 Flowers
- 🛍️ Combinations of multiple small gifts
- 🎀 Personalized gifts

---

# 🏗️ Project Architecture

The project has two main interfaces:

```text
                    ┌──────────────────────┐
                    │      Supabase        │
                    │      Database        │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │   Admin Page    │        │   Public Page   │
        │   admin.html    │        │    index.html   │
        └────────┬────────┘        └────────┬────────┘
                 │                          │
                 ▼                          ▼
            admin.js                    script.js
                 │                          │
                 └──────────────┬───────────┘
                                │
                                ▼
                         Wishlist Data
                                │
                                ▼
                             Vercel
                                │
                                ▼
                         🌎 Public URL
```

---

# 📁 Project Structure

A typical project structure is:

```text
wishlist-project/
│
├── index.html
├── script.js
├── style.css
│
├── admin.html
├── admin.js
│
├── supabase-config.js
│
├── .gitignore
│
└── README.md
```

There may also be local product screenshots/images depending on the version of the project.

If screenshots are not required by the deployed application, they should not be committed to GitHub.

---

# 🌸 Public Website

## `index.html`

This is the main page that friends and family visit.

It contains:

- Birthday title
- Birthday introduction/note
- Search
- Category filters
- Sorting controls
- Product count
- Product grid
- Product cards
- Store links

The public page is intended to be view-only.

The public URL should be shared instead of the admin page.

---

# 🎀 Birthday Header

The main heading was customized from a generic wishlist title to a birthday-specific heading.

The current concept is:

```text
🎀 Lalli's 20th Birthday 🎀
```

The exact emoji/text can be changed directly in the HTML.

---

# 📝 Birthday Note

The website contains a personal explanation for the wishlist.

The idea behind the note is:

> These are some of the things I'd like. This is mainly to give you a hint about what I'd like because I myself don't know exactly what I want. I also like hampers that can include things from this wishlist along with jewellery, flowers, and similar items.

The note is intentionally casual and personal rather than sounding like a strict shopping list.

---

# 🛍️ Product Categories

The wishlist currently uses four main categories:

1. 👗 Clothing
2. 👟 Footwear
3. ⌚ Accessories
4. 🎨 Craft / Others

The category values used internally are:

```text
clothing
footwear
accessories
craft
```

The displayed labels include emojis for a more personal/cute interface.

---

# 🔍 Search

The public page includes a search field.

The search system can be used to quickly find products in the wishlist.

Depending on the current `script.js` implementation, the search can be extended to search fields such as:

- Product name
- Brand
- Category
- Notes

---

# ↕️ Sorting

A sorting control is included on the public page.

The sorting system can be extended or modified in `script.js`.

Typical sorting options can include:

- Default order
- Price: low to high
- Price: high to low
- Priority

---

# 🃏 Product Cards

Each product is displayed as a card.

The card design includes:

- Product image
- Priority badge
- Brand
- Product name
- Size
- Colour
- Notes
- Starting/lowest price
- Available stores
- Store-specific prices
- Product links

The cards use:

- Rounded corners
- Subtle borders
- Soft shadows
- Hover animation
- Responsive sizing

---

# ⭐ Wishlist Priority

Products can have one of three priority levels:

```text
high
medium
low
```

The display labels are:

```text
⭐ High — I really want this
💗 Medium — Would love this
🌸 Low — Nice to have
```

The public cards display a priority badge.

CSS classes include:

```text
.priority-badge
.priority-high
.priority-medium
.priority-low
```

---

# 🏪 Multiple Stores

A product can be available from multiple stores.

Each store entry contains:

```text
Store name
Price
Product link
```

Example:

```javascript
{
    name: "Myntra",
    price: 999,
    link: "https://www.myntra.com/..."
}
```

A second store can be added for the same product.

This allows the public card to show several purchase options.

---

# 💰 Best Price

The public product card can identify the lowest available store price.

The corresponding store button can receive:

```text
best-price
```

The CSS then adds a small:

```text
Best price
```

indicator.

---

# 📸 Product Images

The admin page allows the wishlist owner to select a product image.

The current implementation uses an image file selected from the computer.

The image is read using JavaScript's `FileReader`.

Conceptually:

```text
Select image
     ↓
FileReader
     ↓
Convert to data URL
     ↓
Preview image
     ↓
Save image with product
```

The current implementation stores the resulting image data with the product.

### Important limitation

Base64/data-URL images can be large.

For a small personal project this can work, but it is not the best long-term architecture.

A better production approach would be:

```text
Local image
     ↓
Supabase Storage
     ↓
Public/secured image URL
     ↓
Database stores only URL
```

This can be implemented later if the wishlist becomes large.

---

# 🧑‍💻 Admin Page

## `admin.html`

The admin page is used by the wishlist owner to manage products.

It contains:

### Product Information

- Product name
- Brand
- Category
- Size
- Colour
- Product image
- Priority
- Notes

### Store Information

- Store name
- Price
- Product link
- Add another store
- Remove store

### Management

- Add product
- Edit product
- Delete product

---

# ➕ Adding a Product

The workflow is:

```text
Open admin.html
      ↓
Fill product information
      ↓
Choose product image
      ↓
Add store information
      ↓
Add additional stores if needed
      ↓
Click "Add to Wishlist"
      ↓
JavaScript creates product object
      ↓
Product is saved
      ↓
Supabase receives product
      ↓
Public wishlist can display it
```

---

# ✏️ Editing a Product

Clicking:

```text
✏️ Edit
```

loads the selected product into the form.

The following information is restored:

- Name
- Brand
- Category
- Size
- Colour
- Image
- Priority
- Notes
- Stores
- Store prices
- Store links

The submit button changes from:

```text
🎀 Add to Wishlist
```

to:

```text
💾 Save Changes
```

After saving, the updated product is written back to the database.

---

# 🗑️ Deleting a Product

Clicking:

```text
🗑️ Delete
```

asks for confirmation.

If confirmed:

```text
Product
   ↓
Removed from data
   ↓
Supabase updated
   ↓
Admin list refreshed
   ↓
Public page no longer displays it
```

---

# ☁️ Supabase

Supabase is used as the online database/backend for the wishlist.

The project uses the Supabase JavaScript client.

The connection is initialized with:

```javascript
const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );
```

The actual project URL and publishable key should remain in the project's configuration file/environment strategy rather than being documented publicly in this README.

---

# 🔐 Supabase Security

The browser uses a Supabase publishable/anon-style client key.

Never place a Supabase:

```text
service_role key
```

or any other secret administrative key in:

- `index.html`
- `admin.html`
- `script.js`
- `admin.js`
- `supabase-config.js`
- GitHub
- public frontend code

The publishable client key is designed for frontend use, while database access must be protected with appropriate Supabase Row Level Security (RLS) policies.

---

# 🗃️ Database Structure

The wishlist database stores product information corresponding to the fields used by the application.

The product model contains:

```text
id
name
brand
category
size
color
image
priority
notes
stores
```

The `stores` data contains store objects such as:

```javascript
{
    name: "Store name",
    price: 999,
    link: "https://example.com/product"
}
```

The exact database column names should remain synchronized with the JavaScript code and the Supabase table.

---

# 🔄 Data Flow

The important data flow is:

```text
Admin form
     ↓
admin.js
     ↓
Supabase client
     ↓
Supabase database
     ↓
Public page
     ↓
Product cards
```

This is what makes the wishlist different from a purely static HTML project.

Changes made through the admin interface can be stored online instead of existing only in one browser's localStorage.

---

# 💾 LocalStorage History

An earlier version of the project used:

```javascript
localStorage
```

with a key such as:

```text
wishlistProducts
```

This allowed products to be stored locally in the browser.

The project was later upgraded to Supabase so the data could be shared online.

### Important difference

`localStorage` is:

```text
Browser-specific
Local
Not shared
```

Supabase is:

```text
Online
Centralized
Shareable
```

This was necessary for the public Vercel version.

---

# 🚀 Deployment

The project is deployed using Vercel.

The general deployment flow is:

```text
Local project
      ↓
Git
      ↓
GitHub repository
      ↓
Vercel
      ↓
Automatic deployment
      ↓
Public .vercel.app URL
```

Once GitHub is connected to Vercel, pushing a new commit can trigger a new deployment automatically.

---

# 🌎 Public URL

The public URL is the Vercel domain generated for the project.

Example format:

```text
https://your-project-name.vercel.app
```

This is the link that should be shared with friends and family.

Do not share:

```text
/admin.html
```

as the main birthday link.

---

# 📱 Responsive Design

The website was specifically adjusted to work on phones.

The CSS contains responsive media queries such as:

```css
@media (max-width: 600px)
```

On desktop:

```text
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Product 1  │ │ Product 2  │ │ Product 3  │
└────────────┘ └────────────┘ └────────────┘
```

On mobile:

```text
┌──────────────────┐
│     Product 1    │
└──────────────────┘

┌──────────────────┐
│     Product 2    │
└──────────────────┘

┌──────────────────┐
│     Product 3    │
└──────────────────┘
```

The mobile CSS adjusts:

- Header size
- Search width
- Category buttons
- Birthday note
- Product controls
- Product grid
- Product cards
- Images
- Product information
- Store buttons
- Priority badges
- Spacing

The viewport meta tag is important:

```html
<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>
```

---

# 🎨 CSS Design

The main visual style uses:

```text
Background: soft pink/white
Cards: white
Text: dark grey
Secondary text: grey
Borders: very light grey
```

The design focuses on:

- Minimalism
- Soft birthday aesthetic
- Rounded cards
- Subtle shadows
- Clean typography
- Simple buttons
- Mobile usability

The stylesheet has evolved through multiple iterations.

Some selectors appear more than once because newer versions of the design were added later in the file.

The later rules generally act as overrides.

---

# 📱 Final Mobile CSS

The final mobile section is intentionally placed near the bottom of `style.css`.

This allows it to override earlier desktop/default rules without having to rewrite the whole stylesheet.

The final mobile layer controls:

- Header
- Search
- Categories
- Birthday note
- Product controls
- Product grid
- Product card
- Product image
- Product information
- Detail pills
- Notes
- Price
- Store buttons
- Priority badge

---

# 🔧 Local Development

To work on the project locally:

1. Open the project folder.
2. Open it in VS Code.
3. Start a local server if required.
4. Open `index.html`.
5. Open `admin.html` for administration.
6. Make changes.
7. Test locally.
8. Commit changes with Git.
9. Push to GitHub.
10. Allow Vercel to redeploy.

---

# 🧪 Testing Checklist

Before sharing the website, test the following.

## Public page

- [ ] Page loads
- [ ] Header appears
- [ ] Birthday note appears
- [ ] Search works
- [ ] Categories work
- [ ] Sorting works
- [ ] Product count is correct
- [ ] Product images load
- [ ] Product information is correct
- [ ] Store buttons work
- [ ] Prices are correct
- [ ] Best price indicator works
- [ ] No broken product cards

## Admin page

- [ ] Add product works
- [ ] Image selection works
- [ ] Image preview works
- [ ] Multiple stores can be added
- [ ] Store removal works
- [ ] Edit works
- [ ] Delete works
- [ ] Form resets correctly
- [ ] Supabase receives changes

## Mobile

Test on:

- [ ] Small phone
- [ ] Normal phone
- [ ] Large phone
- [ ] Portrait orientation
- [ ] Landscape orientation if needed

## Public access

Test using:

- [ ] Normal browser
- [ ] Incognito/private browser
- [ ] Phone using mobile internet/Wi-Fi
- [ ] Another device if available

---

# 🕵️ Incognito Testing

Incognito testing is useful because it reduces the chance that local browser data makes the site appear to work when the public deployment does not.

A successful public test should show the website using the online data rather than relying on previously stored local browser data.

---

# 🔗 Product Links

Each store can contain a direct product URL.

Example:

```javascript
{
    name: "Myntra",
    price: 999,
    link: "https://www.myntra.com/..."
}
```

The public page converts these into clickable store buttons.

Always verify links before sharing the wishlist.

Retail websites can change or remove product pages, so links may eventually become invalid.

---

# 🖼️ Image Management

### Current approach

Images are selected from the computer and converted into data URLs.

Advantages:

- Very simple
- No separate image hosting setup
- Easy for a small personal project

Disadvantages:

- Images can be large
- Database payloads become larger
- Many high-resolution screenshots can increase storage usage
- Less efficient than object storage

### Recommended future approach

Use Supabase Storage:

```text
Screenshot
   ↓
Supabase Storage bucket
   ↓
Image URL
   ↓
Database image column
```

This is the recommended upgrade if the wishlist becomes large.

---

# 📦 GitHub

GitHub is used for source-code version control.

The repository can contain:

```text
HTML
CSS
JavaScript
README
.gitignore
configuration template
```

It should not contain:

- Private API/service-role keys
- Unnecessary screenshots
- Personal credentials
- Passwords
- Private files
- Build artifacts that do not belong in the repository

---

# 🚫 Ignoring Screenshots with `.gitignore`

If product screenshots are stored in a dedicated folder such as:

```text
product-images/
```

add:

```gitignore
product-images/
```

to `.gitignore`.

If only specific file types are unnecessary, they can also be ignored, but broad rules such as:

```gitignore
*.png
*.jpg
*.jpeg
```

should only be used if the project does not need any other images.

---

# 🧹 Removing Previously Tracked Screenshots

If screenshots were already committed to Git, simply adding them to `.gitignore` is not enough.

Git can stop tracking a directory with:

```bash
git rm -r --cached product-images
```

Then:

```bash
git add .gitignore
git commit -m "Remove product screenshots from repository"
git push
```

`--cached` removes the files from Git tracking while allowing local copies to remain if they are still needed.

---

# 💻 Git Commands

Useful commands used during development:

## Check status

```bash
git status
```

## Add changes

```bash
git add .
```

Or add a specific file:

```bash
git add style.css
```

## Commit

```bash
git commit -m "Describe the change"
```

## Push

```bash
git push
```

## View remote repository

```bash
git remote -v
```

---

# 👤 Git Identity

The Git username is separate from the GitHub login/email.

Example:

```bash
git config --global user.name "K R Sree Lalitha"
```

Check it with:

```bash
git config --global user.name
```

Email can be checked with:

```bash
git config --global user.email
```

---

# 🔄 Vercel + GitHub Workflow

After the project is connected to Vercel:

```text
Edit code
   ↓
Save
   ↓
Test locally
   ↓
git add
   ↓
git commit
   ↓
git push
   ↓
GitHub updated
   ↓
Vercel detects commit
   ↓
New deployment
   ↓
Public website updated
```

This means you normally do not need to manually upload the entire website to Vercel every time.

---

# 🧩 Important Files

## `index.html`

Public wishlist page.

## `script.js`

Controls public wishlist behavior.

Typical responsibilities include:

- Loading products
- Rendering product cards
- Search
- Category filtering
- Sorting
- Product count
- Store links

## `style.css`

Controls the entire visual design.

Includes:

- Desktop layout
- Product cards
- Product images
- Store buttons
- Priority badges
- Birthday note
- Responsive/mobile styling

## `admin.html`

Wishlist management interface.

## `admin.js`

Admin-side functionality.

Includes:

- Product creation
- Product editing
- Product deletion
- Image upload/preview
- Store management
- Supabase operations

## `supabase-config.js`

Creates the Supabase client.

It contains the project URL and frontend-safe publishable key.

Do not put secret service-role credentials here.

## `.gitignore`

Prevents unnecessary/local files from being committed to GitHub.

## `README.md`

Project documentation and reference.

---

# 🛠️ Common Problems and Fixes

## Products disappear after refresh

Possible causes:

- Public page is still using localStorage
- Supabase query is not running
- Supabase configuration is incorrect
- Database/RLS policy is blocking the request
- JavaScript error

Check the browser console.

---

## Only one product appears

Possible causes:

- Old demo product array is still being used
- Supabase query is returning only one row
- Rendering logic is using a hard-coded array
- Database contains fewer rows than expected

Check:

```text
Supabase → Table Editor → wishlist table
```

and the browser console.

---

## Admin product adds but public page does not update

Check:

1. Was the product inserted into Supabase?
2. Is the public page querying Supabase?
3. Is the deployed Vercel version using the newest JavaScript?
4. Was the latest code pushed to GitHub?
5. Did Vercel finish deployment?
6. Does the public page have permission to read the table?

---

## Image does not appear

Check:

- File is actually an image
- Image selection succeeded
- `currentImage` is populated
- Image preview appears in Admin
- Database contains the image value
- Public card uses the correct image field

---

## Changes work locally but not on Vercel

Usually this means the local code is newer than the deployed code.

Run:

```bash
git status
```

Then:

```bash
git add .
git commit -m "Update wishlist"
git push
```

Wait for Vercel to redeploy and refresh the public URL.

---

# 🔐 Security Notes

This is a personal birthday project, not a production commercial application.

The admin page should not be considered secure simply because its filename is:

```text
admin.html
```

Anyone who knows the URL may be able to open it.

For a truly private admin system, authentication should be added.

Possible future solutions:

- Supabase Auth
- Email/password authentication
- Magic-link authentication
- Role-based access
- RLS policies

Until then, treat the admin page as a convenience interface rather than a secure authentication system.

---

# 🚀 Future Improvements

Possible future upgrades:

### 1. Supabase Storage

Move product images from database data URLs into Supabase Storage.

### 2. Authentication

Protect the admin page using Supabase Auth.

### 3. Admin URL protection

Require authentication before loading the admin interface.

### 4. Better product extraction

Automatically extract:

- Product title
- Product image
- Brand
- Price
- Product URL

from a product link where technically possible.

This is more difficult because many shopping websites prevent browser-side scraping or require server-side/API access.

### 5. Custom domain

Instead of:

```text
something.vercel.app
```

a custom domain could be used.

### 6. Favicon

Add a small birthday/wishlist favicon.

### 7. Better animations

Add subtle animations to:

- Cards
- Category buttons
- Search
- Page loading

### 8. Share button

Add a button that uses the browser Web Share API on supported phones.

### 9. Copy link button

Allow visitors to easily copy the wishlist URL.

### 10. Wishlist categories

Additional categories could be added later.

### 11. Gift hamper inspiration section

A dedicated section could explain:

```text
🎁 Hamper ideas
💍 Jewellery
🌸 Flowers
🍫 Chocolates
🎀 Small accessories
```

---

# 📚 What This Project Demonstrates

This project can be included as a mini project on a GitHub profile.

It demonstrates practical experience with:

- HTML
- CSS
- JavaScript
- DOM manipulation
- Forms
- LocalStorage
- JSON
- FileReader API
- Responsive web design
- CRUD operations
- Supabase
- Database integration
- Supabase Storage concepts
- Git
- GitHub
- Vercel
- Frontend deployment
- API/client integration
- UI/UX design

---

# 📝 Mini Project Description

A concise description for a GitHub profile or resume:

> **Lalli's Birthday Wishlist** — A responsive full-stack wishlist web application built with HTML, CSS, JavaScript, Supabase, GitHub, and Vercel. The application provides a public wishlist interface with product search, categories, sorting, store links, prices, priorities, and a separate admin interface for adding, editing, and deleting wishlist items.

---

# 🧠 Main Concepts Used

## CRUD

The admin application implements:

```text
C → Create → Add product
R → Read   → Load products
U → Update → Edit product
D → Delete → Remove product
```

Supabase acts as the central data store.

---

# 🧪 Development History

The project evolved through several stages.

### Stage 1 — Basic Wishlist

Started as a simple wishlist webpage with product cards.

### Stage 2 — Visual Design

Added:

- Product cards
- Rounded corners
- Shadows
- Images
- Categories
- Search
- Sorting
- Priority badges

### Stage 3 — Admin Interface

Created:

```text
admin.html
admin.js
```

to manage wishlist products.

### Stage 4 — Image Upload

Added local image selection and preview using `FileReader`.

### Stage 5 — Birthday Personalization

Added:

```text
Lalli's 20th Birthday
```

and a personalized wishlist explanation.

### Stage 6 — Supabase

Moved from browser-only/localStorage data to online database storage.

### Stage 7 — CRUD

Connected:

```text
Add
Edit
Delete
```

to Supabase.

### Stage 8 — GitHub

Added the project to GitHub for source control and portfolio use.

### Stage 9 — Vercel

Deployed the public website online.

### Stage 10 — Mobile Optimization

Added responsive CSS so the wishlist works comfortably on phones.

---

# 🎂 Final User Experience

The intended final experience is:

```text
Friend receives link
        ↓
Opens wishlist on phone
        ↓
🎀 Lalli's 20th Birthday
        ↓
Reads birthday note
        ↓
Browses categories
        ↓
Searches/sorts if needed
        ↓
Looks through product cards
        ↓
Checks stores and prices
        ↓
Gets an idea of what she likes
        ↓
Chooses a gift 🎁
```

The list is intentionally a source of inspiration rather than a strict list of required gifts.

---

# ⚠️ Maintenance Notes

When changing the project:

1. Test locally first.
2. Check both public and admin pages.
3. Test on mobile.
4. Check the browser console for JavaScript errors.
5. Confirm Supabase data is correct.
6. Commit changes to Git.
7. Push to GitHub.
8. Wait for Vercel deployment.
9. Test the public URL again.

Avoid making large changes directly on the deployed version without testing locally.

---

# 📌 Quick Start

For future reference:

```bash
# Check project status
git status

# Add changes
git add .

# Commit
git commit -m "Update wishlist"

# Push to GitHub
git push
```

Then:

```text
GitHub
   ↓
Vercel
   ↓
Wait for deployment
   ↓
Open public URL
```

---

# 🎀 Project Status

Current major functionality:

- ✅ Public wishlist
- ✅ Birthday personalization
- ✅ Product categories
- ✅ Search
- ✅ Sorting
- ✅ Product cards
- ✅ Priority system
- ✅ Multiple stores
- ✅ Store prices
- ✅ Store links
- ✅ Product images
- ✅ Admin interface
- ✅ Add product
- ✅ Edit product
- ✅ Delete product
- ✅ Supabase integration
- ✅ GitHub repository
- ✅ Vercel deployment
- ✅ Public shareable URL
- ✅ Mobile responsive design

---

# 💗 Final Note

This project started as a simple personal wishlist and evolved into a complete small web application.

It combines a personal use case with practical development concepts:

```text
Idea
 ↓
UI design
 ↓
HTML + CSS
 ↓
JavaScript
 ↓
Admin interface
 ↓
Database
 ↓
CRUD
 ↓
GitHub
 ↓
Vercel
 ↓
Public web application
```

The project can continue to be improved, but the current version already functions as a complete personal wishlist application.

---

## 🎀 Built for Lalli's 20th Birthday

Made with HTML, CSS, JavaScript, Supabase, GitHub & Vercel.

