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
  }),
  actions: {
    loadInitialData() {
      // Temporary Data
      this.houseValues = [1, 2, 3, 4, 5];
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
      this.cardData.push(newCard);
    },

    removeCard(index: number) {
      this.cardData.splice(index, 1);
    },
  },
});
