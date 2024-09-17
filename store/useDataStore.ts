import { defineStore } from "pinia";

interface Card {
  house: string;
  grade: number;
  soldOut: boolean;
  createdDate: string;
  selected: boolean;
}

export const useCardStore = defineStore("cardStore", {
  state: () => ({
    cardData: [] as Card[],
  }),
  actions: {
    loadInitialData() {
      // Temporary Data
      this.cardData = [
        {
          house: "Casa A",
          grade: 1,
          soldOut: true,
          createdDate: "12/08/2024",
          selected: false,
        },
        {
          house: "Casa B",
          grade: 2,
          soldOut: true,
          createdDate: "12/08/2024",
          selected: false,
        },
        {
          house: "Casa C",
          grade: 3,
          soldOut: true,
          createdDate: "12/08/2024",
          selected: false,
        },
        {
          house: "Casa D",
          grade: 4,
          soldOut: true,
          createdDate: "12/08/2024",
          selected: false,
        },
        {
          house: "Casa E",
          grade: 5,
          soldOut: true,
          createdDate: "12/08/2024",
          selected: false,
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
