---
setup: |
  import Layout from '@/layouts/BlogPost.astro'
  import Cool from '@/components/Author.astro'
title: Hello world!
publishDate: 26 Apr 2022
name: Faizak
value: 128
description: Just a Hello World Post!
---

<Cool name={frontmatter.name} href="https://twitter.com/karamelxyz" client:load />

これ、めっちゃカッコいい。

変数が働くか {frontmatter.value \* 2}?

```javascript
// Example JavaScript

const x = 7;
function returnSeven() {
  return x;
}
```
