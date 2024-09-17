import { defineStore } from "pinia";

interface Card {
  house: string;
  grade: number | "";
  soldOut: boolean;
  createdDate: string;
}

export const useCardStore = defineStore("cardStore", {
  state: () => ({
    cardData: [] as Card[],
    houseValues: [] as number[],
    editingDeal: false,
  }),
  actions: {
    loadInitialData() {
      // This will be where the data will be fetched from the database

      // Temporary Data
      this.houseValues = [1, 2, 3, 4, 5];

      // When implementing the fetch, make the data sort by latest date
      this.cardData = [
        {
          house: "Casa A",
          grade: 1,
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa B",
          grade: 2,
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa C",
          grade: 3,
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa D",
          grade: 4,
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa E",
          grade: 5,
          soldOut: true,
          createdDate: "12/08/2024",
        },
      ];
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
