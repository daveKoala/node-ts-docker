import redis, { RedisClient } from "redis";

interface ITheCache { // Only Public methods
  init(url: string): void;
  fetch(query: string, cb: IRedisGetCallBack): object;
}

interface IRedisGetCallBack {
  (err: any, data: any): void;
}

console.log();
export class theCache implements ITheCache {
  client?: redis.RedisClient;

  public init(url: string) {
    // @ts-ignore-start
    this.client = redis.createClient({
      url, retry_strategy: this.retryStrategy
    });
    // @ts-ignore-end
    if (this.client) {
      this.client.on("connect", this.start);
      this.client.on("error", this.error);
    }
  }

  private start() {
    console.log('Redis client connected.');
  }

  private error(error: any) {
    console.log('Something went wrong ' + error);
  }

  public async fetch(query: string, cb: IRedisGetCallBack) {
    this.client?.get(query, cb);
  }

  public async post(index: string, expireSeconds: number, data: object) {
    this.client?.setex(index, expireSeconds, JSON.stringify(data));
  }

  get status() {
    return this.client?.ping();
  }

  retryStrategy(options: redis.RetryStrategyOptions): undefined | Error | number {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      console.log("Error 1");
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      console.log("Error 2");
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 3) {
      console.log("Error 3");
      return undefined;
    }
    console.log("Error 4");
    return Math.min(options.attempt * 100, 3000);
  }

}

export let cache = new theCache();
