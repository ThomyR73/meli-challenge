export type AuthorType = {
  name: string;
  lastname: string;
};

export type PriceType = {
  amount: number;
  currency_id: string;
  decimals: number;
};

export type ItemsType = Array<{
  id: string;
  title: string;
  price: PriceType;
  picture: string;
  condition: string;
  free_shipping: boolean;
}>;

export type CategoriesType = Array<string>;

export type ItemsResponseType = {
  author: AuthorType;
  items: ItemsType;
  categories: CategoriesType;
};

export type ItemsDataType = {
  results: {
    id: string;
    title: string;
    condition: string;
    thumbnail: string;
    price: number;
    original_price: number;
    sale_price: {
      amount: number;
      currency_id: string;
    };
    shipping: {
      free_shipping: boolean;
    };
  }[];
  filters: {
    id: string;
    name: string;
    type: string;
    values: {
      id: string;
      name: string;
      path_from_root: {
        id: string;
        name: string;
      }[];
    }[];
  }[];
};

export type ItemDataType = {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  initial_quantity: number;
  condition: string;
  pictures: {
    id: string;
    url: string;
    secure_url: string;
    size: string;
    max_size: string;
    quality: string;
  }[];
  shipping: {
    free_shipping: boolean;
  };
  error?: string;
};

export type DescriptionDataType = {
  plain_text: string;
  error?: string;
};

export type ItemType =
  | {
      id: string;
      title: string;
      price: {
        amount: number;
        currency_id: string;
        decimals: number;
      };
      picture: string;
      condition: string;
      free_shipping: boolean;
      sold_quantity: number;
      description: string;
    }
  | {};

export type ItemResponseType = {
  author: AuthorType;
  item: ItemType;
};
