# Note App – 3-Tier Docker Compose Project

A simple notes web app split into three containers: a **frontend**, a **backend API** and a **database**, all connected with Docker Compose.

## Architecture

```
Browser ──► Frontend (Nginx :80) ──/api──► Backend (Node.js :3000) ──► Database (PostgreSQL :5432)
```

| Service  | Technology              | Role                                      |
|----------|-------------------------|-------------------------------------------|
| frontend | HTML, CSS, JavaScript + Nginx | Serves the UI and proxies `/api/` to the backend |
| backend  | Node.js + Express       | REST API (create, read, delete notes)     |
| db       | PostgreSQL 16 (Alpine)  | Stores notes in a persistent volume       |

## Project Structure

```
app-code/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── index.html
│   ├── style.css
│   └── app.js
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
└── db/
    └── init.sql
```

## Requirements

- Docker
- Docker Compose (v2)

## Run the Project

```bash
git clone https://github.com/Meltawil-1006/Note_App_for_docker_Project.git
cd Note_App_for_docker_Project/app-code
docker compose up --build
```

Open the app at: `http://localhost:8080` (or `http://<server-ip>:8080` on a remote server; make sure port 8080 is open).

## Stop the Project

```bash
docker compose down        # stop containers, keep the data
docker compose down -v     # stop containers and delete the data
```

## API Endpoints

| Method | Endpoint         | Description      |
|--------|------------------|------------------|
| GET    | `/api/notes`     | List all notes   |
| POST   | `/api/notes`     | Add a note (`{"text": "..."}`) |
| DELETE | `/api/notes/:id` | Delete a note    |

## Configuration

The backend reads these environment variables (set in `docker-compose.yml`):

| Variable      | Description                              |
|---------------|------------------------------------------|
| `DB_HOST`     | Database service name (`db`)             |
| `DB_USER`     | Database user                            |
| `DB_PASSWORD` | Database password                        |
| `DB_NAME`     | Database name                            |

The database user, password and name must match in both the `db` and `backend` sections. For anything beyond a learning project, move credentials to a `.env` file.

## Useful Commands

```bash
docker compose ps                  # check container status
docker compose logs backend        # view backend logs
docker compose exec backend sh     # open a shell in the backend
docker exec -it db-note-app psql -U <user> -d appdb -c "SELECT * FROM notes;"
```

## Data Persistence

Database files are stored in the named volume `note-volume`, mounted at `/var/lib/postgresql/data`. Data survives container restarts and rebuilds. `db/init.sql` runs only on the first start with an empty volume.

## What I Learned

- Running frontend, backend and database in separate containers
- Container networking by service name
- Reverse proxying with Nginx
- Healthchecks and `depends_on` for startup order
- Persistent data with Docker volumes

## Author

Mostafa Tarek – IT Specialist
