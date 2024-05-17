import { deleteProductAcess, setProductsAcess, updateProductAcess } from "@/services/dataAcess/productsAcess";
import { getProductsObservers } from "@/services/observers/productsObservers";
import { createContext, useState } from "react";

interface productProps {
  name: string;
  code: string;
  brand: string;
  subject: string;
  model: string;
  version?: string;
  pnc?: string;
  amount: number;
  title: string;
  url: string;
}

/*interface filterType {
  supplier?: string;
  status?: string;
}*/

interface NewListFormData {
  textInput: string;
}

interface ProductsContextType {
  productsList: productProps[];
  getProductsList: () => void;
  setNewProduct: (data: any) => void;
  updateProduct: (data: any) => void;
  deleteProduct: (code: string) => void;
  setFilteredList: (textInput: NewListFormData) => void;
  updateProductsList: (data: any) => void;
}

interface OrdersContextProviderProps {
  children: React.ReactNode;
}

export const ProductsContext = createContext({} as ProductsContextType);

export function ProductsContextProvider({
  children,
}: OrdersContextProviderProps) {
  const [productsList, setProductsList] = useState<productProps[]>([]);
  //const [listToFilter, setListToFilter] = useState<productProps[]>([]);

  /*const get10RandomProducts = () => {
    const shuffled = productsList.sort(() => 0.5 - Math.random());
    setProductsList(shuffled.slice(0, 10));
  };*/

  function setFilteredList({ textInput }: NewListFormData) {
    const searchText = textInput.toLowerCase().trim();

    const jsonData = localStorage.getItem("productsList");

    if (jsonData) {
      // Convertendo os dados de volta para um objeto JavaScript
      const listToFilter = JSON.parse(jsonData);

      if (searchText !== "") {
        const filteredList = listToFilter.filter((product: any) => {
          // Aqui você pode ajustar as condições de acordo com sua necessidade
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

  const updateProductsList = (productList: any) => {
    setProductsList(productList);
  }

  const setNewProduct = (data: any) => {
    setProductsAcess(
      {
        brand: data.brand,
        code: data.code,
        name: data.name,
        subject: data.subject || "",
        model: data.model || "",
        version: data.version || "",
        pnc: data.pnc || "",
        quantaty: data.quantaty || "",
        title: data.title || "",
      },
      data.code,
    );
  };

  const updateProduct = (product: productProps) => {
    updateProductAcess(product, product.code);
    // setFilteredList();
  };

  const deleteProduct = (code: string) => {
    deleteProductAcess(code);
  };

  const getProductsList = () => {
    getProductsObservers(/*setProductsList*/);
  };

  return (
    <ProductsContext.Provider
      value={{
        productsList,
        setNewProduct,
        updateProduct,
        deleteProduct,
        getProductsList,
        setFilteredList,
        updateProductsList,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
