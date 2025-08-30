# Nag_Code
Prototype backend for the Chitti360 app described in the specs.

## Setup

```bash
npm install
```

## Scripts

- `npm start` – start the Express server
- `npm test` – run Jest tests

## API Overview

- `POST /login` – mock login that returns an OTP
- `POST /verify` – validate the OTP and return a token
- `GET /chittis` – list all chitti groups
- `POST /chittis` – create a new chitti group
- `GET /chittis/:id` – retrieve a chitti by id
