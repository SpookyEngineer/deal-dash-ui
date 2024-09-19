interface Card {
  house: string;
  grade: number;
  description: string;
  soldOut: boolean;
  createdDate: string;
  _id?: string;
}

interface SidebarMenuItem {
  label: string;
  route: string;
  icon: string;
}
