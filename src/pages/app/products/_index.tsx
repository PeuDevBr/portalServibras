import { /*useContext,*/ useContext, useEffect } from "react";
//import productsList from "@/pages/app/products/productsList.json";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
//import { ProductsContext } from "@/contexts/productsContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { ProductsContext } from "@/contexts/productsContext";
import { Header } from "./components/Header";
import { getProductsObservers } from "@/services/observers/productsObservers";
import { UpdateProductDialog } from "./productDialog";

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

export function Products() {
  const { productsList, setFilteredList, deleteProduct, updateProductsList } =
    useContext(ProductsContext);

  useEffect(() => {
    getProductsObservers();

    const textInput = {
      textInput: "compressor",
    };
    setFilteredList(textInput);
  }, []);

  function handleDeleteProduct(code: string) {
    deleteProduct(code);

    const jsonData = localStorage.getItem("productsList");

    if (jsonData) {
      // Convertendo os dados de volta para um objeto JavaScript
      const listToFilter = JSON.parse(jsonData);

      const newProductList = listToFilter.filter(
        (product: any) => product.code !== code,
      );
      updateProductsList(newProductList);
    }
  }

  return (
    <>
      <Header />
      <div className=" mt-40 flex justify-center">
        <div className="grid w-[1080px]">
          {productsList.length > 0 &&
            productsList.map((product: productProps) => (
              <Card
                key={product.code}
                className="mb-4 grid h-14 grid-cols-8 items-center bg-background px-4 hover:bg-accent hover:text-accent-foreground"
              >
                <div className="col-span-2 flex items-center gap-8">
                  <Button variant="ghost" size={"sm"}>
                    <Link to={"#"}>
                      <Search className="h-4 w-4 hover:scale-150 hover:transition-all" />
                    </Link>
                  </Button>
                  <span className="text-lg font-bold">{product.code}</span>
                </div>
                <Label className=" col-span-4 text-lg">
                  {product.name.toUpperCase()}
                </Label>
                <div className="col-span-2 flex items-center justify-between">
                  <Label className="">{product.brand}</Label>
                  <div className="flex gap-2">
                    <UpdateProductDialog product={product} />
                    <Button
                      variant="ghost"
                      size={"sm"}
                      title="Excluir"
                      onClick={() => handleDeleteProduct(product.code)}
                    >
                      <X className="h-4 w-4 text-red-600 hover:scale-150 hover:transition-all" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
