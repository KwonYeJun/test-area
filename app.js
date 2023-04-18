import http from "https";
import { resolve } from "path";

const getPokemonData = (url, pokemonName) => {
  if (typeof url === "string" && typeof pokemonName === "string") {
    let assembledUrl = url + pokemonName;
    return new Promise((resolve, reject) => {
      http
        .get(assembledUrl, (res) => {
          let body = "";
          res.on("data", (chunk) => {
            body += chunk;
          });
          res.on("end", () => {
            let data = JSON.parse(body);
            resolve(data);
          });
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  } else {
    console.log("두개의 매개변수는 모두 문자열을 요구합니다.");
  }
};

const main = async () => {
  console.time("time-check");
  try {
    const pokemonName = "pikachu";
    const PokemonData = await getPokemonData(
      "https://pokeapi.co/api/v2/pokemon/",
      pokemonName
    );
    const types = await PokemonData.types.map((typeInfo) => typeInfo.type.name);
    console.log(`Name : ${PokemonData.name}`);
    console.log(`Types: ${types}`);
  } catch (error) {
    console.error("Error fetching data from Poke API:", error);
  }
  console.timeEnd("time-check");
};
main();
