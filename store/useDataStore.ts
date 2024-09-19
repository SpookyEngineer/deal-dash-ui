import { defineStore } from "pinia";
import axios from "axios";

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
    totalPages: 1,
    currentPage: 1,
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

    async removeCard(cardId: string) {
      const baseURL = useRuntimeConfig().public.mongoBaseUrl;

      try {
        const response = await axios.delete(`${baseURL}/deals/${cardId}`);

        return response.status;
      } catch (error) {
        console.error("Error deleting card:", error);
        return null;
      }
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

    async fetchDeals(page: number, searchInput: string) {
      const baseURL = useRuntimeConfig().public.mongoBaseUrl;

      try {
        const response = await axios.get(
          `${baseURL}/deals?page=${page}&searchInput=${encodeURIComponent(
            searchInput
          )}`
        );
        const data = response.data;
        this.cardData = data.deals;
        this.totalPages = data.totalPages;
        this.currentPage = data.page;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
  },
});
