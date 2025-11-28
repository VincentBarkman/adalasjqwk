# Docker Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Environment variables configured

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://ctf:your_password@db:5432/ctf
DB_PASSWORD=your_secure_password
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=https://your-domain.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Build and Run

### Using Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Using Docker only

```bash
# Build the image
docker build -t ctf-app .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL="your_database_url" \
  -e BETTER_AUTH_SECRET="your_secret" \
  -e BETTER_AUTH_URL="https://your-domain.com" \
  -e GOOGLE_CLIENT_ID="your_client_id" \
  -e GOOGLE_CLIENT_SECRET="your_client_secret" \
  ctf-app
```

## Database Migration

After starting the containers, run migrations:

```bash
docker-compose exec app npm run db:push
```

## Timezone

The application is configured to use `Europe/Stockholm` timezone for:

- Level unlock times (12:00 Stockholm time)
- Leaderboard timestamps
- All date/time operations

## Production Deployment

1. Set up a reverse proxy (nginx/Caddy) for HTTPS
2. Configure domain and SSL certificates
3. Update `BETTER_AUTH_URL` to your production domain
4. Set strong passwords and secrets
5. Enable firewall rules
6. Set up automatic backups for PostgreSQL data

## Monitoring

```bash
# Check container status
docker-compose ps

# View resource usage
docker stats

# Check logs
docker-compose logs app
docker-compose logs db
```

## Backup Database

```bash
docker-compose exec db pg_dump -U ctf ctf > backup.sql
```

## Restore Database

```bash
docker-compose exec -T db psql -U ctf ctf < backup.sql
```
