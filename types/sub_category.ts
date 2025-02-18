export interface ISubCategory {
  _id?: string;
  name: string;
  category: "candles" | "ceramic art" | "resin art";
  createdAt?: Date;
}
