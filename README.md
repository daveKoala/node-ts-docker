## Docker-ization

- https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

### Build

```
docker build -t dave/node-backend .
```

### Run

```
docker run -p 8001:8080 -d dave/node-backend
```

#### Docker notes

```
docker ps
docker images
docker logs <container id>
docker stop <container id>
```
