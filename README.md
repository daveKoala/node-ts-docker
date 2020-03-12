## Docker-ization

- https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

### Build

```
docker build -t dave/logger-test .
```

### RUN (Docker Compose)

```
docker-compose up
```

#### Docker notes

```
docker ps
docker images
docker logs <container id>
docker stop <container id>
docker exec -it <container id> /bin/bash/

docker exec -it 253aecc65664  redis-cli // Access the redis-cli
```
