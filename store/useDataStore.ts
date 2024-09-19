import { defineStore } from "pinia";
import axios from "axios";

interface Card {
  house: string;
  grade: number;
  description: string;
  soldOut: boolean;
  createdDate: string;
  _id?: {
    $oid: string;
  };
}

async function fetchHouseValues() {
  const baseURL = useRuntimeConfig().public.mongoBaseUrl;

  try {
    const response = await axios.get(`${baseURL}/houseValues`);

    return response.data.houseValues;
  } catch (error) {
    console.error("Error fetching house values:", error);
  }
}

export const useCardStore = defineStore("cardStore", {
  state: () => ({
    cardData: [] as Card[],
    houseValues: [] as number[],
    cardBeingEdited: {} as Card,
  }),
  actions: {
    async loadInitialData() {
      // Fetching houseValues
      const houseValues = await fetchHouseValues();
      this.houseValues = houseValues;
    },

    addCard(newCard: Card) {
      this.cardData.unshift(newCard);
    },

    removeCard(index: number) {
      this.cardData.splice(index, 1);
    },

    modifyCard(index: number, updatedData: Partial<Card>) {
      if (index >= 0 && index < this.cardData.length) {
        this.cardData[index] = {
          ...this.cardData[index], // Preserve existing data
          ...updatedData, // Overwrite with new data
        };
      } else {
        console.error("Invalid index. Card not found.");
      }
    },
  },
});
