# Joe's Blog

A static blog built with [Hugo](https://gohugo.io/) and deployed to GitHub Pages.

## Features

- Static site generation with Hugo
- Ananke theme
- Automated deployment to GitHub Pages via GitHub Actions
- Blog posts about technology and development

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended version recommended)
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd joe-blog
   ```

2. Install the theme:
   ```bash
   git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
   ```

3. Run the development server:
   ```bash
   hugo server -D
   ```

4. Open your browser and navigate to `http://localhost:1313`

### Creating New Posts

Create a new post using the Hugo CLI:

```bash
hugo new posts/my-new-post.md
```

Edit the newly created file in `content/posts/` and set `draft: false` when ready to publish.

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by GitHub Actions (see `.github/workflows/hugo-gh-pages.yml`).

### Setup GitHub Pages

1. Go to your repository settings
2. Navigate to Pages
3. Set Source to "GitHub Actions"

## Project Structure

```
joe-blog/
├── config.toml          # Hugo configuration
├── content/             # Blog content
│   └── posts/           # Blog posts
├── themes/              # Hugo themes
│   └── ananke/          # Ananke theme
├── static/              # Static assets
├── layouts/             # Custom layouts
└── .github/             # GitHub Actions workflows
    └── workflows/
        └── hugo-gh-pages.yml
```

## License

This project is open source and available under the [MIT License](LICENSE).
