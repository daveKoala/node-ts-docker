import redis from "redis";

interface ITheCache { // Only Public methods
  init(url: string): void;
  fetch(query: string, cb: IRedisGetCallBack): object;
  post(index: string, expireSeconds: number, data: object): void;
  isLive: boolean | undefined;
}

interface IRedisGetCallBack {
  (err: any, data: any): void;
}

export class theCache implements ITheCache {
  client?: redis.RedisClient;
  private maxRetries = 3;

  public init(url: string) {
    // @ts-ignore-start
    this.client = redis.createClient({
      url, retry_strategy: this.retryStrategy
    });
    // @ts-ignore-end
    if (this.client) {
      this.client
        .on("connect", this.start)
        .on("error", this.error);
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

  get isLive() {
    return this.client?.ping();
  }

  private retryStrategy(options: redis.RetryStrategyOptions): undefined | Error | number {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Retry time exhausted");
    }
    if (options.attempt > this.maxRetries) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  }

}

export let cache = new theCache();
