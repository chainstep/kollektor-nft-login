# NFT login with kollektor.io and OAuth2 protocol

This is a simple demo for authenticating access to your react site using **NFTs via kollektor.io**.

There is two versions: a [minimal](nextjs-minimal/) starter, and a [small community site](nextjs/),
complete with simple sections on News, Events and Members.

Some starting points:

- Play around with the community website hosted on Vercel: https://kollektor-nft-login.vercel.app/ Get your free login
  NFT [here](https://app.kollektor.io/api/payment/create-buy-nft-checkout/?nftId=427988a5-fdd1-49f6-a1fc-a13105775856&ownerId=8aef3bcc-0f25-41e2-ba4e-fb58b06dd6b3)
- Start with the [20-minute guide to your NFT-gated community website](#the-20-minute-guide-to-your-nft-gated-community-website) or
- Jump to the [5-minute guide to your NFT-gated login](#the-5-minute-guide-to-your-nft-gated-login)

# The 20-minute guide to your NFT-gated community website

## Project Setup

You will need [nodejs](https://nodejs.org/en) to run this example application.

First, clone this [repository](https://github.com/chainstep/kollektor-nft-login) with:

```
git clone https://github.com/chainstep/kollektor-nft-login
cd nextjs
```

## Github Setup

Create a github key (for an alternative login), and a kollektor.io account:

1. Go to https://github.com and follow the [instructions](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authenticating-to-the-rest-api-with-an-oauth-app) to register an OAuth client.
1. copy the ID and SECRET to your .env file.

## Kollektor.io Setup

Get a client ID and SECRET by signing up at https://app.kollektor.io and emailing info@kollektor.io from the same email account.

Create an NFT and note down its edition id, or use the default scope `edition-427988a5-fdd1-49f6-a1fc-a13105775856`. You can get a matching NFT for free
from [kollektor.io's klinktree](https://app.kollektor.io/api/payment/create-buy-nft-checkout/?nftId=427988a5-fdd1-49f6-a1fc-a13105775856&ownerId=8aef3bcc-0f25-41e2-ba4e-fb58b06dd6b3)

## \[OPTIONAL\] Airtable Setup

Use the default example, or create an airtable as a backend like this:

1. Go to https://airtable.com, and sign up.
1. Create a new base.
1. Add four tables using the xslx files from `airtable/` to the base.
1. Copy the URL in the browser to your .env file.
1. Adjust table names, if necessary.
1. Create a personal access token, following [this documentation](https://support.airtable.com/docs/creating-and-using-api-keys-and-access-tokens).

---

Your .env should now look like this

```
AIRTABLE_BASE_ID=appwWMhlQ0ma17ehT
AIRTABLE_TABLE_NAME_NEWS=News
AIRTABLE_TABLE_NAME_EVENTS=Events
AIRTABLE_TABLE_NAME_USERS=Users
AIRTABLE_TOKEN=<airtable_personal_access_token>
GITHUB_ID=<githubid>
GITHUB_SECRET=<githubsecret>
KOLLEKTOR_ID=<myid>
KOLLEKTOR_SECRET=<mysecret>
```

Then install dependencies with:

```
npm install
```

Finally, run the development server with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# The 5-minute guide to your NFT-gated login

## Project Setup

You will need [nodejs](https://nodejs.org/en) to run this example application.

First, clone this [repository](https://github.com/chainstep/kollektor-nft-login) with:

```
git clone https://github.com/chainstep/kollektor-nft-login
cd nextjs-minimal
```

## Kollektor.io Setup

Get a client ID and SECRET by signing up at https://app.kollektor.io and emailing info@kollektor.io from the same email account.

Get a matching NFT for free from [kollektor.io's klinktree](https://app.kollektor.io/api/payment/create-buy-nft-checkout/?nftId=427988a5-fdd1-49f6-a1fc-a13105775856&ownerId=8aef3bcc-0f25-41e2-ba4e-fb58b06dd6b3).
You can also create an NFT at https://app.kollektor.io and note down its edition id, if you wish. Then, edit kollektor.ts to change the OAuth2 scope to
`edition-<your-id>`

---

Your .env should now look like this

```
KOLLEKTOR_ID=<myid>
KOLLEKTOR_SECRET=<mysecret>
```

Then install dependencies with:

```
npm install
```

Finally, run the development server with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Publishing on Vercel

You can host your website on your own server. If you feel lazy, you can also push it to https://vercel.app

Just make sure you copy the environment variables from your .env file to the production environment:
https://www.youtube.com/watch?v=dMOd9sl4ajA

# Implementation Details

Based on [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/). Kollektor uses the OAuth 2.0 protocol,
and you can use any compatible client, not just the Next.js implementation used here for demonstration.

## OAuth ID and Secret

Get a client ID and SECRET by signing up at https://app.kollektor.io and emailing info@kollektor.io from the same email account.

## OAuth Scopes

You can log in with any NFT from an edition, e.g. the Kollektor Klub Card `427988a5-fdd1-49f6-a1fc-a13105775856``

```
edition-427988a5-fdd1-49f6-a1fc-a13105775856
```

You can log in with a single NFT

```
nft-f69d2c08-b8ee-4637-91bb-d4075bc23ba1
```

If you combine several scopes, login is possible with any NFT or edition given.
