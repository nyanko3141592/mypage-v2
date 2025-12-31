---
description: Deploy the web application to Cloudflare Pages using Wrangler and manual custom domain steps.
---

1. Build the project for production.
   ```bash
   npm run build
   ```

2. Login to Cloudflare (if not already logged in).
   ```bash
   npx wrangler login
   ```

3. Deploy the `dist` directory to Cloudflare Pages.
   - We use project name `nya3neko2-dev`.
   ```bash
   npx wrangler pages deploy dist --project-name=nya3neko2-dev --commit-dirty=true
   ```

4. Add the custom domain manually.
   - Go to Cloudflare Dashboard > Pages > nya3neko2-dev > Custom domains.
   - Add `nya3neko2.dev` and follow the DNS instructions.

5. Verify the deployment.
   - Visit https://nya3neko2.dev
