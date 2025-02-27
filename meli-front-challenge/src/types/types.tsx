export type ListItemType = {
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
};

export type ItemDataType = {
  author: {
    name: string;
    lastname: string;
  };
  item: {
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
  };
};

export type CategoriesType = Array<string>;

export type AuthorType = {
  name: string;
  lastName: string;
};

export type ResultsType = {
  author: AuthorType;
  categories: CategoriesType;
  items: Array<ListItemType>;
};
