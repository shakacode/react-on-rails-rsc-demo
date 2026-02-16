# React on Rails Pro — React Server Components Demo

This is a sample Rails application demonstrating **React Server Components (RSC)** with [React on Rails Pro](https://www.shakacode.com/react-on-rails-pro/).

## What's Inside

This app showcases the key capabilities of RSC in a Rails context:

### 1. HelloServer — Basic RSC Example
An async server component that fetches data on the server with `await` — no `useEffect`, no loading spinners, no client-side fetch waterfalls. Paired with a `LikeButton` client component to demonstrate the server/client boundary.

### 2. ProductCatalog — Advanced RSC Example
A more realistic demo showing:
- **Async data fetching** with nested components and streaming
- **`<Suspense>` boundaries** for progressive loading (products load first, reviews stream in later)
- **Server-only libraries** — date formatting, markdown parsing, and price formatting all stay on the server (zero client JS)
- **Interactive client islands** — AddToCart button uses `useState` but only its JS ships to the browser
- **Streaming SSR** — HTML starts arriving immediately, components fill in as they resolve

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser                           │
│  ┌──────────────┐                                   │
│  │ LikeButton   │ ← Only client component JS ships  │
│  │ AddToCart     │   to the browser                  │
│  └──────────────┘                                   │
└─────────────────────────────────────────────────────┘
         ▲ HTML + embedded RSC payload (streaming)
         │
┌─────────────────────────────────────────────────────┐
│              Node Renderer (port 3800)               │
│  ┌───────────────────────────────────────────────┐  │
│  │ Server Bundle (SSR)                           │  │
│  │  - Renders HTML from RSC payload              │  │
│  │  - Embeds RSC payload for hydration           │  │
│  └───────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────┐  │
│  │ RSC Bundle                                    │  │
│  │  - Executes server components (async)         │  │
│  │  - Generates Flight-format RSC payload        │  │
│  │  - Server components never leave here         │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
         ▲
         │ Props + render request
┌─────────────────────────────────────────────────────┐
│                Rails Application                     │
│  - Routes, controllers, views                       │
│  - stream_react_component helper                    │
│  - rsc_payload_route for client navigation           │
└─────────────────────────────────────────────────────┘
```

### Three Webpack Bundles

RSC requires three separate webpack builds running simultaneously:

| Bundle | Purpose | Contains |
|--------|---------|----------|
| **Client** | Browser JavaScript | Client components (`'use client'`), React hydration |
| **Server** | SSR HTML generation | All components (renders HTML from RSC payload) |
| **RSC** | RSC payload generation | Server components only (strips client components) |

## Getting Started

### Prerequisites

- Ruby 3.3+
- Node.js 22+
- React on Rails Pro license ([get a free trial](mailto:justin@shakacode.com))

### Setup

```bash
# Install dependencies
bundle install
pnpm install

# Set your Pro license
export REACT_ON_RAILS_PRO_LICENSE=your_token

# Start all processes (Rails + webpack bundles + node renderer)
bin/dev
```

### Visit

- [http://localhost:3000/hello_server](http://localhost:3000/hello_server) — Basic RSC demo
- [http://localhost:3000/products](http://localhost:3000/products) — Product catalog with streaming

### What to Look For

1. **Open DevTools → Network tab** — Notice that `HelloServer` and `ProductCatalog` server component JS is NOT in the client bundle
2. **View Page Source** — See the streamed HTML with embedded RSC payload
3. **Click "Add to Cart"** — The button is interactive immediately, even if other components are still streaming
4. **Watch the waterfall** — Products appear first, then reviews stream in progressively

## How It Was Generated

This app was created with:

```bash
rails new rsc_demo
cd rsc_demo

# Add to Gemfile:
# gem 'react_on_rails', '~> 16.4'
# gem 'react_on_rails_pro', '~> 16.4'

bundle install

# This single command sets up everything:
rails g react_on_rails:install --rsc --typescript
```

The `--rsc` flag automatically:
- Installs React on Rails Pro with Node Renderer
- Creates three webpack configs (client, server, RSC)
- Sets up `Procfile.dev` with all required processes
- Creates the HelloServer example component
- Configures RSC routes and streaming

## Key Files

| File | Purpose |
|------|---------|
| `config/initializers/react_on_rails_pro.rb` | Pro + RSC configuration |
| `client/node-renderer.js` | Node Renderer bootstrap |
| `config/webpack/rscWebpackConfig.js` | RSC bundle webpack config |
| `config/webpack/serverWebpackConfig.js` | Server bundle config (with RSC plugin) |
| `config/webpack/clientWebpackConfig.js` | Client bundle config (with RSC plugin) |
| `config/webpack/ServerClientOrBoth.js` | Orchestrates all three bundles |
| `Procfile.dev` | Runs Rails + 3 webpack watchers + Node Renderer |

## Learn More

- [React on Rails Pro — RSC Documentation](https://www.shakacode.com/react-on-rails-pro/docs/react-server-components/)
- [React on Rails — GitHub](https://github.com/shakacode/react_on_rails)
- [Get a free Pro trial](mailto:justin@shakacode.com)
