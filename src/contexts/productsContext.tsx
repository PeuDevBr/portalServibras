import {
  deleteProductAcess,
  setProductsAcess,
  updateProductAcess,
} from "@/services/dataAcess/productsAcess";
import { createContext, useState } from "react";

interface productProps {
  name: string;
  code: string;
  brand: string;
  subject: string;
  model?: string;
  title?: string;
  url?: string;
}

interface NewListFormData {
  textInput: string;
}

interface ProductsContextType {
  productsList: productProps[];
  createProduct: (data: productProps) => void;
  updateProduct: (data: productProps) => void;
  deleteProduct: (code: string) => void;
  setFilteredList: (textInput: NewListFormData) => void;
}

interface OrdersContextProviderProps {
  children: React.ReactNode;
}

export const ProductsContext = createContext({} as ProductsContextType);

export function ProductsContextProvider({
  children,
}: OrdersContextProviderProps) {
  const [productsList, setProductsList] = useState<productProps[]>([]);

  function setFilteredList({ textInput }: NewListFormData) {
    const searchText = textInput.toLowerCase().trim();

    const jsonData = localStorage.getItem("productsList");

    if (jsonData) {
      const listToFilter = JSON.parse(jsonData);

      if (searchText !== "") {
        const filteredList = listToFilter.filter((product: productProps) => {
          return Object.values(product).some(
            (proprietyValue) =>
              typeof proprietyValue === "string" &&
              proprietyValue.toLowerCase().includes(searchText),
          );
        });

        setProductsList(filteredList.reverse());
        window.scrollTo(0, 0);
      }
    }
  }

  const createProduct = (data: productProps) => {
    const productToAdd = {
      brand: data.brand,
      code: data.code,
      name: data.name,
      subject: data.subject,
      model: data.model || "",
      title: data.title || "",
      url: data.url || "",
    };

    const jsonData = localStorage.getItem("productsList");

    if (jsonData) {
      const dataBaseList = JSON.parse(jsonData);

      const newProductList = [...dataBaseList, productToAdd];

      localStorage.setItem("productsList", JSON.stringify(newProductList));
    }
    setProductsList([productToAdd]);

    setProductsAcess(productToAdd, data.code);
  };

  const updateProduct = (product: productProps) => {
    const jsonData = localStorage.getItem("productsList");

    if (jsonData) {
      const productList = JSON.parse(jsonData);

      const replaceProduct = (
        updatedProductCode: string,
        updatedProduct: productProps,
      ) => {
        const updatedItems = productList.map((product: productProps) =>
          product.code === updatedProductCode ? updatedProduct : product,
        );
        return updatedItems;
      };

      const updatedItems = replaceProduct(product.code, product);

      setProductsList(updatedItems);

      localStorage.setItem("productsList", JSON.stringify(updatedItems));
      const text = localStorage.getItem("textInput");
      if (text !== null) {
        setFilteredList({ textInput: text });
      }
    }

    updateProductAcess(product, product.code);
  };

  const deleteProduct = (code: string) => {
    const jsonData = localStorage.getItem("productsList");

    if (jsonData) {
      const dataBaseList = JSON.parse(jsonData);

      const newDataBaseList = dataBaseList.filter(
        (product: productProps) => product.code !== code,
      );

      const newProductList = productsList.filter(
        (product: productProps) => product.code !== code,
      );

      setProductsList(newProductList);
      localStorage.setItem("productsList", JSON.stringify(newDataBaseList));
    }

    deleteProductAcess(code);
  };

  return (
    <ProductsContext.Provider
      value={{
        productsList,
        createProduct,
        updateProduct,
        deleteProduct,
        setFilteredList,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
