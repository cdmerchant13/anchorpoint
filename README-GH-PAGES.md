# AnchorPoint - GitHub Pages Deployment

This branch (`frontend-isolated`) has been configured for automated deployment to GitHub Pages using GitHub Actions.

## Project Overview

This is a static export of the AnchorPoint application, designed to work without any backend dependencies. All data is mocked and the application is fully static for deployment to GitHub Pages.

## Key Changes for GitHub Pages

### 1. Static Export Configuration
- `next.config.js` has been updated with `output: 'export'` for static site generation
- All API routes have been removed and replaced with mock data
- Dynamic routes have been removed as they're not compatible with static export

### 2. Mock Data System
- Created `src/lib/mock/api.ts` with mock data and functions
- All components now use mock API calls instead of real backend requests
- Authentication is mocked for demonstration purposes

### 3. Dependencies
- Removed server-side only packages (Prisma, bcryptjs, neo4j-driver, pg, openai)
- Kept only frontend dependencies (React, Next.js, Tailwind CSS, etc.)

## GitHub Pages Deployment

### Automatic Deployment
The application is automatically deployed to GitHub Pages when:
1. Changes are pushed to the `frontend-isolated` branch
2. Pull requests are made to the `frontend-isolated` branch

### GitHub Actions Workflow
The `.github/workflows/deploy.yml` file handles:
- Node.js 18 setup
- Dependency installation
- Static build with `npm run export`
- Upload to GitHub Pages

### Manual Deployment
To deploy manually:
```bash
# Install dependencies
npm ci

# Build static export
npm run export

# The static files will be in the `out/` directory
```

## Monitoring Deployment

### GitHub Actions Logs
1. Go to the Actions tab in your GitHub repository
2. Select the "Deploy to GitHub Pages" workflow
3. View logs for each deployment run

### Common Issues and Troubleshooting

#### Build Failures
- **TypeScript errors**: Check for missing imports or type mismatches
- **Missing dependencies**: Run `npm ci` to install all dependencies
- **Dynamic routes**: Ensure no dynamic routes exist in the app directory
- **bcryptjs dependency error**: The frontend-isolated branch uses mock authentication, so `bcryptjs` has been replaced with mock implementations in `src/lib/auth/password.ts`

#### Deployment Issues
- **Permissions**: The workflow needs write permissions for GitHub Pages
- **Branch name**: Ensure you're pushing to the correct branch (`frontend-isolated`)
- **File size**: GitHub Pages has a 10MB limit per file

#### Runtime Issues
- **404 errors**: Check that all routes are properly defined in `app/`
- **Missing assets**: Ensure all static assets are in the `public/` directory
- **Path issues**: Verify all links use relative paths for static export

## Development Workflow

### Making Changes
1. Create a new branch from `frontend-isolated`
2. Make your changes
3. Test locally with `npm run dev`
4. Build with `npm run export` to verify static export
5. Create a pull request to `frontend-isolated`

### Testing Static Export
Always test the static export before deploying:
```bash
npm run export
# Check the out/ directory for all expected files
```

## Environment Variables

For GitHub Pages deployment, you don't need environment variables since all data is mocked. However, if you need to add any:

1. Add them to the repository secrets in GitHub
2. Reference them in your code with `process.env.VAR_NAME`

## Performance Considerations

- The static export is optimized for performance
- All images should be optimized for web
- Consider adding a `public/_headers` file for custom headers if needed

## Future Enhancements

- Add more comprehensive mock data
- Implement client-side routing for better navigation
- Add PWA capabilities for offline access
- Implement proper error boundaries

## Support

For issues related to the GitHub Pages deployment:
1. Check the GitHub Actions logs
2. Verify the build locally
3. Create an issue with detailed error information
