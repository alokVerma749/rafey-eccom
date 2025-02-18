export interface ITag {
  _id?: string;
  name: string;
  category: "candles" | "ceramic art" | "resin art";
  createdAt?: Date;
}
