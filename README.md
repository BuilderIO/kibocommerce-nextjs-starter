<h2 align="center">KiboCommerce & Next.JS & BuilderIO</h2>

<p align="center">
This is a headless ecommerce starter kit for KiboCommerce platform using Next.JS and BuilderIO<br>
</p>

### Features

- Performant by default
- SEO Ready
- Internationalization
- Responsive
- UI Components built on top of Material UI 5
- Theming
- KiboCommerce data hooks
- PWA Ready
- Omni Channel Capability (Ship to home and Pickup in Store support)
- BuilderIO integration

## Getting Started

1. Clone this repo

```bash
git clone https://github.com/KiboSoftware/nextjs-builderio-starter-storefront.git
```

2. Change into directory and install dependencies

```bash
npm install
```

3. Copy .env template

```bash
cp .env.template .env.local
```

4. Configure env variables for your Kibo Commerce environment
5. Start Dev server

```bash
npm run dev
```

## Configuration

.env example

```bash
KIBO_API_HOST=t1234-s1234.sandbox.mozu.com
KIBO_AUTH_HOST=home.mozu.com
KIBO_CLIENT_ID=KIBO_APP.1.0.0.Release
KIBO_SHARED_SECRET=12345_Secret
BUILDER_IO_API_KEY=12345_Your_API_Key
```

The following data is required to configure the storefront to communicate with your Kibo API Client.

- `apiHost` - Your Kibo Commerce API Host.
- `authHost` - Kibo Commerce Authentication Host Server. It is used to request an access token from Kibo Commerce OAuth 2.0 service. Production and Production sandbox, use `home.mozu.com`
- `clientId` - Unique Application (Client) ID of your Application
- `sharedSecret` - Secret API key used to authenticate application. Viewable from your [Kibo eCommerce Dev Center](https://mozu.com/login)
- `builderIOApiKey` - Unique API key used to authenticate your Builder IO

Visit [Kibo documentation](https://apidocs.kibong-perf.com/?spec=graphql#auth) for more details on API authentication

## Useful Commands

```bash
npm run dev # Start dev server
npm run build # Run production build
npm run start # Run production start
npm run generate-types # generate typescript Kibo API types from GraphQL Schema
npm run storybook # start storybook for
npm run test # run unit / integration tests
```

## Built with

- Framework - [Next.JS](https://nextjs.org/docs)
- Component Library - [Material UI 5](https://mui.com/material-ui/getting-started/overview/)
- Testing - [Jest](https://jestjs.io/docs/getting-started)
- Data Fetching / State Management - [React Query](https://react-query-v3.tanstack.com/overview)
- Localization - [Next i18Next](https://github.com/i18next/next-i18next)

## BuilderIO Content Creation

- Login to BuilderIO
- 1. Create account
- 2. Login to BuilderIO

- Create Space
- 1. After Login create Space (https://builder.io/spaces)

- Integrate with Kibo-commerce plugin
- 1. Open Space
- 2. Click on Integrations option
- 3. Click on Kibo-commerce plugin and provide your secrets and connect the plugin

- Run the application (if not running already)
  npm run dev

- Create Page Model
- 1. Click on Models
- 2. Click on +Create Model button

  - 2.1. Select Page option
  - 2.2. Provide Page as name
  - 2.3. Open Page model just created and set http://localhost:3000 as Preview URL

- Create Section Model
- 1. Click on Models
- 2. Click on +Create Model button

  - 2.1. Select Section option
  - 2.2. Provide Kibosection as name
  - 2.3. Open Kibosection
  - 2.4. +New Custom Field button
  - 2.5. Create Slug as text fild

- Create Content for HomePage

  1. Click on Content option
  2. Click on +New button and select Page option
  3. Provide Homepage as name and / as url
  4. Open Homepage, you will see following Custom Components inside Page

     - 4.1. Small banner
     - 4.2. Kibo hero carousel
     - 4.3. Product recommendations
     - 4.4. CMS home page products
     - 4.5. Content tile

     Configure above components as per your need.

- Creating Content for Product Details Page
  1. Click on Account Settings
  2. Edit Custom targeting attributes and add slug as string
  3. Click on Content option
  4. Select Page from Page Models
  5. Create Page ex. BackP_004
  6. Click on Edit Targeting and add Slug is BackP_004

## Contributions

All contributions welcome!
