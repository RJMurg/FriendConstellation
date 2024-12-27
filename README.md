# FriendConstellation

FriendConstellation is a Starboard web app.

The admin (Called a Starmaster) can create a list of players, 'Champions', and a list of tasks.
Each task is worth a certain amount of stars.

The Starmaster reviews the Competitor's attempts at the tasks and awards stars accordingly.

## Features

- Champion Leaderboard
- Task board
- Champion Logs (Got 5 stars for completing XYZ)
- Discord Webhook integration
- Admin Panel

## Development

**Pre-requisites**

- Node.js
- PostgreSQL
- Docker

**Setup**

1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in the required values:

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
ADMIN_PASSWORD="password"
```

4. Migrate the database with `npm run db:migrate`
5. Start the server with `npm run dev`

## Deployment

FriendConstellation has a container build run on every push to the `master` branch.
I personally host this container and automatically deploy it to my server through Watchtower.

If you wish to deploy it yourself, you can follow the steps below:

### Docker

**Pre-requisites**

- Docker
- Docker Compose

1. Start Starboard and the database with `docker-compose up -d` or `docker compose up -d` depending on how Compose was installed

### Manual

**Pre-requisites**

- Node.js
- PostgreSQL

1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in the required values:

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
ADMIN_PASSWORD="password"
```

4. Migrate the database with `npm run db:migrate`
5. Build the app with `npm run build`
6. Start the server with `node build`

## License
FriendConstellation is licensed under the GNU General Public License v3.0
