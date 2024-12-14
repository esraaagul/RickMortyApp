import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Chip } from "react-native-elements";
import useCharacterStore from "./store";
import { CharactersResponse } from "./types/characterTypes";

const fetchCharacters = async (): Promise<CharactersResponse> => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export default function Home() {
  const { selectedCharacters, searchText, setSearchText, toggleCharacter } =
    useCharacterStore();

  const { data, isLoading, error } = useQuery<CharactersResponse>({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  const filteredData = data?.results.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return <Text>{text}</Text>;

    const parts = text.split(new RegExp(`(${highlight})`, "gi")); // Düzeltilmiş RegExp
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <Text key={index} className="font-bold text-black">
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

  return (
    <View className="flex-1 pt-10 pb-5 px-5">
      <View className="flex-row items-center p-2.5 mb-4 rounded-2xl bg-custom-gray">
        <TextInput
          className="flex-1 text-dark-gray text-base"
          placeholder="Search characters..."
          placeholderTextColor="#ddd"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View className="flex-row flex-wrap mb-4">
        {selectedCharacters.map((character) => (
          <View key={character.id} className="mr-2 mb-2 bg-blue-500 rounded-sm">
            <Chip
              title={character.name}
              onPress={() => toggleCharacter(character)}
              icon={{
                name: "close",
                type: "font-awesome",
                color: "white",
                onPress: () => toggleCharacter(character),
              }}
              buttonStyle={{ backgroundColor: "transparent" }}
            />
          </View>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleCharacter(item)}
            style={[
              styles.listItem,
              selectedCharacters.find((c) => c.id === item.id) &&
                styles.selectedItem,
            ]}
          >
            <Image
              source={{ uri: item.image }}
              className="w-14 h-14 rounded-full mr-2.5"
            />
            <View className="flex-1 justify-center">
              <Text className="text-lg ml-2.5">
                {highlightText(item.name, searchText)}
              </Text>
              <Text className="text-sm text-info-gray ml-2.5">
                {item.episode.length} Episodes
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 8,
  },
  selectedItem: {
    backgroundColor: "#cce5ff",
  },
});
