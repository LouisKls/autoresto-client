export type Item = {
  id: string;
  name: string;
  price?: number;
  image?: string;
  type?: string; // TODO: delete ? from every field
  allergene?: string;
  description?: string;
};
