import { create } from "zustand";
import { Character } from "../types/characterTypes";

interface StoreState {
  selectedCharacters: Character[];
  searchText: string;
  setSelectedCharacters: (characters: Character[]) => void;
  setSearchText: (text: string) => void;
  toggleCharacter: (character: Character) => void;
}

const useCharacterStore = create<StoreState>((set) => ({
  selectedCharacters: [],
  searchText: "",
  setSelectedCharacters: (characters) =>
    set({ selectedCharacters: characters }),
  setSearchText: (text) => set({ searchText: text }),
  toggleCharacter: (character) =>
    set((state) => {
      const index = state.selectedCharacters.findIndex(
        (c) => c.id === character.id
      );
      if (index !== -1) {
        return {
          selectedCharacters: state.selectedCharacters.filter(
            (c) => c.id !== character.id
          ),
        };
      } else {
        return { selectedCharacters: [...state.selectedCharacters, character] };
      }
    }),
}));

export default useCharacterStore;
