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

      // When implementing the fetch, make the data sort by latest date
      this.cardData = [
        {
          house: "Casa A",
          grade: 1,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa B",
          grade: 2,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa C",
          grade: 3,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa D",
          grade: 4,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa E",
          grade: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa F",
          grade: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa G",
          grade: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa H",
          grade: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa I",
          grade: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa J",
          grade: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa K",
          grade: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa L",
          grade: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa M",
          grade: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          soldOut: true,
          createdDate: "12/08/2024",
        },
        {
          house: "Casa N",
          grade: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
