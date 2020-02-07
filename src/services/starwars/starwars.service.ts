import axios from "axios";
import redis from "redis";

const redis_client = redis.createClient("redis://cache");

export const findStarship = async (id: string): Promise<any> => {
  const { data } = await axios.get(
    `https://swapi.co/api/starships/${ id }`
  );;

  redis_client.setex(id, 60, JSON.stringify(data));

  if (data) {
    return data;
  }

  throw new Error("No record found");
}
