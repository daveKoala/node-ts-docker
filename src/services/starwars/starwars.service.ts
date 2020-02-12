import axios from "axios";
import { cache } from "../../lib/redis";

export const findStarship = async (id: string): Promise<any> => {
  const { data } = await axios.get(
    `https://swapi.co/api/starships/${id}`
  );
  cache.post(`starship:${id}`, 60, data);

  if (data) {
    return data;
  }

  throw new Error("No record found");
}

export const findPerson = async (id: string): Promise<any> => {
  const { data } = await axios.get(
    `https://swapi.co/api/people/${id}`
  );;

  cache.post(`person:${id}`, 60, data);

  if (data) {
    return data;
  }

  throw new Error("No record found");
}