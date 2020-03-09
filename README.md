## Docker-ization

- https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

### Build

```
docker build -t strata-v2/logging-service .
```

### RUN (Docker Compose)

```
docker-compose up
```

#### Docker notes

You can stop all this projects containers with the following:

```
docker stop ts-server ts-mongodb ts-cache
```

```
docker ps
docker images
docker logs <container id>
docker stop <container id>
docker exec -it <container id> /bin/bash/

docker exec -it 253aecc65664  redis-cli // Access the redis-cli
```

## Databases

This app comes with Redis and MongoDB containers

### MongoDB

The connection string is

```
mongodb://mongodb/<database name>
```

Because port 27017 is exposed you can connect to the MongoDB instance with a GUI like RoboMongo

- Address: localhost
- Port: 27017

This set up does not use any authentication. A live instance the connection string will also include a username and
password

## ElasticSearch

https://blog.logrocket.com/full-text-search-with-node-js-and-elasticsearch-on-docker/
