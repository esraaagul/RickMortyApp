export interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

export interface CharactersResponse {
  results: Character[];
}
