"use strict"
const { Client } = require("@elastic/elasticsearch")
export const client = new Client({ node: "http://elasticsearch:9200/", log: "trace" })
export const test = async () => {
  // Explicit Mapping
  /**
   * { "mappings": {
   * "post": {
   *  "title": { "type": "string", fields: { "en": {"type": "string", "analyzer": "english"}, "raw": { "type": "string", "index": "not_analyzed"}}},
   *  "startDate": { "type": "date", "format": "E, dd MMM YYYY HH:mm:ss Z"}
   * 
   * }
   * }}
   * 
   * 
   * 
   */
  // Let"s start by indexing some data
  await client.index({
    index: "game-of-thrones",
    body: {
      character: "Ned Stark",
      quote: "Winter is coming."
    }
  })
  await client.index({
    index: "game-of-thrones",
    body: {
      character: "Daenerys Targaryen",
      quote: "I am the mother of dragons."
    }
  })
  await client.index({
    index: "game-of-thrones",
    // here we are forcing an index refresh,
    // otherwise we will not get any result
    // in the consequent search
    refresh: true,
    body: {
      character: "Tyrion Lannister",
      quote: "A mind needs books like a sword needs a whetstone."
    }
  })
  // Let"s search!
  const { body } = await client.search({
    index: "game-of-thrones",
    body: {
      query: {
        match: {
          quote: "winter"
        }
      }
    }
  })
  // console.log(body.hits.hits)
  return body;
};
