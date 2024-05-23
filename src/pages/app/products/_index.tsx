import { /*useContext,*/ useContext, useEffect } from "react";
//import productsList from "@/pages/app/products/productsList.json";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
//import { ProductsContext } from "@/contexts/productsContext";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { ProductsContext } from "@/contexts/productsContext";
import { Header } from "./components/Header";

interface productProps {
  name: string;
  code: string;
  brand: string;
  subject: string;
  model?: string;
  title?: string;
  url?: string;
}
export function Products() {
  const { productsList, setFilteredList } = useContext(ProductsContext);

  useEffect(() => {
    if (productsList.length === 0) {
      setFilteredList({ textInput: "compressor" });
    }
  }, []);

  return (
    <>
      <Header />
      <div className=" mt-40 flex justify-center">
        <div className="grid w-[1080px]">
          {productsList &&
            productsList.map((product: productProps) => (
              <Card
                key={product.code}
                className="mb-4 grid h-14 grid-cols-8 items-center bg-background px-4 hover:bg-accent hover:text-accent-foreground"
              >
                <div className="col-span-2 flex items-center gap-8">
                  <Button variant="ghost" size={"sm"} asChild>
                    {product.code ? (
                      <NavLink to={`/product/${product.code}`}>
                        <Search className="h-4 w-4 hover:scale-150 hover:transition-all" />
                      </NavLink>
                    ) : (
                      <Search className="h-4 w-4 hover:scale-150 hover:transition-all" />
                    )}
                  </Button>
                  <span className="text-lg font-bold">{product.code}</span>
                </div>
                <Label className=" col-span-5 text-lg">
                  {product.name.toUpperCase()}
                </Label>
                <div className="col-span-1 flex items-center justify-between">
                  <Label className="">{product.brand}</Label>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
