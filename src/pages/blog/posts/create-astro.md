---
setup: |
  import Layout from '../../../layouts/BlogPost.astro'
title: Create astro project
publishDate: 26 Apr 2022
name: k
value: 128
description: Create Simple sites
---

From the documentation itself

## 1. Run the CLI

Run the following command in your terminal to start our handy install wizard, `create-astro`. This will walk you through creating your very first Astro project in whichever directory you run it in.

```shell
# npm
npm create astro@latest

# yarn
yarn create astro

# pnpm
pnpm create astro@latest
```

Follow the instruction in the cli
`npm install` etc
I like to use with tailwind so I add tailwind as Integration

```
npx astro add tailwind
```

after that add thse in tsconfig.json for easier importing

```
"paths": {
      "@/*": [
        "src/*"
      ],
      "@components/*": [
        "src/components/*"
      ],
      "@layouts/*": [
        "src/layouts/*"
      ]
    }
```

### Now you can start build , dont forget `npm run dev`
