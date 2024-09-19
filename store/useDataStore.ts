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
    toastTimeout: 2500,
  }),
  actions: {
    async loadInitialData() {
      // Fetching houseValues
      const houseValues = await fetchHouseValues();
      this.houseValues = houseValues;
    },

    async addCard(newCard: Card) {
      const baseURL = useRuntimeConfig().public.mongoBaseUrl;

      try {
        const response = await axios.post(`${baseURL}/deals`, newCard, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.status;
      } catch (error) {
        console.error("Error creating card:", error);
        return null;
      }
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

    async editCard(updatedData: Card) {
      const baseURL = useRuntimeConfig().public.mongoBaseUrl;
      try {
        const response = await axios.put(
          `${baseURL}/deals/${updatedData._id}`,
          updatedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        return response.status;
      } catch (error) {
        console.error("Error trying to edit deal:", error);
        return null;
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
