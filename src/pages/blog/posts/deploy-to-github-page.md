---
layout: ../../../layouts/BlogPost.astro
title: Auto CI Deploy Astro Website to Github Pages
description: By following description from Official Docs,
---

Steps are more detail in Official Website
https://docs.astro.build/en/guides/deploy/

## GitHub Pages

1. Create 2 repos for Astro and one with named <yourusername>.github.io. Just push Astro project to main branch of your Astro repo.
1. And set in the config `site` in `astro.config.mjs`.

   Example:

```
{
  site:'https://kazuyafaizad.github.io'
}
```

2. Inside your project, create `deploy.sh` with the following content (uncommenting the appropriate lines), and run it to deploy:

   ```bash
   #!/usr/bin/env sh

   # abort on errors
   set -e

   # build
   npm run build

   # navigate into the build output directory
   cd dist

   # add .nojekyll to bypass GitHub Page’s default behavior
   touch .nojekyll

   # if you are deploying to a custom domain
   # echo 'www.example.com' > CNAME

   git init
   git add -A
   git commit -m 'deploy'

   # if you are deploying to https://<USERNAME>.github.io
   # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

   # if you are deploying to https://<USERNAME>.github.io/<REPO>
   # git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

   cd -
   ```

### GitHub Actions

1. In the target project (\<YOUR USERNAME\>.github.io) repo, create `gh-pages` branch then go to Settings > Pages and set to `gh-pages` branch for GitHub Pages and set directory to `/` (root).
2. Create the file `.github/workflows/main.yml` and add in the yaml below. Fill in appropriate detail such env. githubEmail and deployToRepo. This would be enough to standard deployment
3. In GitHub go to Settings > Developer settings > Personal Access tokens. Generate a new token with repo and workflow permissions.
4. In the astro project repo (not \<YOUR USERNAME\>.github.io) go to Settings > Secrets and add your new personal access token with the name `API_TOKEN_GITHUB`.

```yaml
# Workflow to build and deploy to your GitHub Pages repo.

# Edit your project details here.
# Remember to add API_TOKEN_GITHUB in repo Settings > Secrets as well!
env:
  githubEmail: <YOUR GITHUB EMAIL ADDRESS>
  deployToRepo: <NAME OF REPO TO DEPLOY TO (E.G. <YOUR USERNAME>.github.io)>

name: Github Pages Astro CI

on:
  # Triggers the workflow on push and pull request events but only for the main branch
  push:
    branches: [main]
  pull_request:
    branches: [main]

  # Allows you to run this workflow manually from the Actions tab.
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      # Install dependencies with npm
      - name: Install dependencies
        run: npm ci

      # Build the project and add .nojekyll file to supress default behaviour
      - name: Build
        run: |
          npm run build
          touch ./dist/.nojekyll

      # Push to your pages repo
      - name: Push to pages repo
        uses: cpina/github-action-push-to-another-repository@main
        env:
          API_TOKEN_GITHUB: ${{ secrets.API_TOKEN_GITHUB }}
        with:
          source-directory: "dist"
          destination-github-username: ${{ github.actor }}
          destination-repository-name: ${{ env.deployToRepo }}
          user-email: ${{ env.githubEmail }}
          commit-message: Deploy ORIGIN_COMMIT
          target-branch: gh-pages
```

6. When you push changes to the astro project repo CI will deploy them to \<YOUR USERNAME\>.github.io for you.
