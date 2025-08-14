# AnchorPoint Frontend - GitHub Pages Deployment

This branch (`frontend-isolated`) has been specifically configured for deployment to GitHub Pages using Next.js static export.

## 🚀 Deployment

### Automatic Deployment

This branch is configured for automatic deployment to GitHub Pages via GitHub Actions. Any push to the `frontend-isolated` branch will trigger the deployment workflow.

### Manual Deployment

To manually deploy:

1. Ensure you're on the `frontend-isolated` branch
2. Run the build command to verify everything works:
   ```bash
   npm run export
   ```
3. The static files will be generated in the `/out` directory

## 📁 Project Structure

```
├── src/                    # Source code
│   ├── app/               # Next.js app router
│   ├── components/        # React components
│   ├── lib/               # Utility libraries
│   │   ├── mock/          # Mock API implementations
│   │   └── auth/          # Authentication utilities
│   └── styles/            # CSS styles
├── public/                # Static assets
├── out/                   # Generated static export (not in git)
├── .github/               # GitHub configuration
│   └── workflows/         # CI/CD workflows
├── next.config.js         # Next.js configuration
├── package.json          # Dependencies and scripts
└── README-GH-PAGES.md    # This file
```

## ⚙️ Configuration

### Next.js Static Export

The `next.config.js` has been configured for static export:

```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
```

### Key Features

- **Static Export**: The entire site is pre-rendered as static HTML/CSS/JS
- **Mock APIs**: All backend dependencies have been replaced with mock implementations
- **Relative Paths**: All links use relative paths for GitHub Pages compatibility
- **No Server-Side Rendering**: All pages are statically generated at build time

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Export static files:
   ```bash
   npm run export
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Generate static export
- `npm run lint` - Run ESLint

## 🌐 GitHub Pages Setup

### Repository Settings

1. Go to your GitHub repository settings
2. Navigate to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Select the `frontend-isolated` branch
5. Select the `/ (root)` directory
6. Click "Save"

### Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in the `public/` directory with your custom domain
2. In repository settings, under "Pages", enter your custom domain

## 🐛 Troubleshooting

### Common Issues

#### 1. 404 Errors on GitHub Pages

**Problem**: Links are broken after deployment

**Solution**: 
- Ensure all links use relative paths (starting with `./`)
- Check that the `next.config.js` has `trailingSlash: true`
- Verify the GitHub Pages source is set to the `frontend-isolated` branch and root directory

#### 2. Images Not Loading

**Problem**: Images display as broken or don't load

**Solution**:
- The `next.config.js` has `images: { unoptimized: true }` for static export compatibility
- Ensure all images are in the `public/` directory
- Use relative paths for image sources

#### 3. Build Failures

**Problem**: `npm run export` fails

**Solution**:
- Check for any server-side code that needs to be removed
- Verify all API calls use mock implementations
- Ensure no dynamic routes that can't be statically generated

#### 4. CSS/JS Not Loading

**Problem**: Styles or scripts don't apply after deployment

**Solution**:
- Check that the build process generates files in the `/out` directory
- Verify the GitHub Pages deployment includes all necessary files
- Ensure no absolute paths that break on GitHub Pages

### Debugging Tips

1. **Local Testing**: After running `npm run export`, you can test the static files by:
   ```bash
   npx serve out
   ```
   Then visit `http://localhost:3000`

2. **Check Generated HTML**: Inspect the HTML files in the `/out` directory to verify:
   - All links are relative
   - All assets are properly referenced
   - No server-side code remains

3. **GitHub Actions Logs**: If deployment fails, check the workflow logs in the "Actions" tab of your GitHub repository

## 📝 Contributing

When working on this branch:

1. **Use Mock APIs**: All backend interactions must use the mock implementations in `src/lib/mock/`
2. **Test Static Export**: Always run `npm run export` to verify changes work in static mode
3. **Relative Paths**: Use relative paths for all links (`./` instead of `/`)
4. **No Dynamic Routes**: Avoid routes that require server-side rendering or dynamic data

## 📄 License

This project is part of the AnchorPoint platform. See the main repository for license information.

## 🚀 Deployment Monitoring

After deployment, you can monitor:

1. **GitHub Pages Status**: Check the repository "Pages" section
2. **GitHub Actions**: View deployment logs in the "Actions" tab
3. **Site Analytics**: Once deployed, you can add analytics tools to monitor traffic

## 🔄 Updates

To update the deployed site:

1. Make changes to the `frontend-isolated` branch
2. Commit and push your changes
3. The GitHub Actions workflow will automatically deploy the updated site
4. Monitor the Actions tab for deployment status
