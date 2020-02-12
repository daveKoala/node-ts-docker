import asyncRedis from "redis";

// const redis_client = redis.createClient("redis://cache");
// const CACHE_NAME = "starship";

interface ITheCache { // Only Public methods
  init(url: string): void;
  fetch(query: string): object;
}

export class theCache implements ITheCache {
  client?: asyncRedis.RedisClient;

  public init(url: string) {
    this.client = asyncRedis.createClient(url)
    this.client.on("connect", this.start);
    this.client.on("error", this.error);
  }

  private start() {
    console.log('Redis client connected.');
  }

  private error(error: any) {
    console.log('Something went wrong ' + error);
  }

  public async fetch(query: string) {
    const data = await this.client?.get(query, (err, data) => {
      return { data };
    });

    return data;
  }

}

export let cache = new theCache();
