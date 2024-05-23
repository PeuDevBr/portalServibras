import { Card, CardContent } from "@/components/ui/card";
import { useContext } from "react";
import { ProductsContext } from "@/contexts/productsContext";
import { Header } from "./components/Header";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function ProductCatalog() {
  const { productsList } = useContext(ProductsContext);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Header />
      <div className="grid max-w-[1440px] pt-28 md:grid-cols-2 lg:grid-cols-3">
        {productsList.map((product) => {
          return (
            <Card
              key={product?.code}
              className="mx-4 my-2 flex border-2 md:border"
            >
              <Button asChild>
                <Link
                  to={`/product/${product?.code}`}
                  className="m-2 flex min-h-28 min-w-32 justify-center rounded-md bg-white"
                >
                  {product?.url ? (
                    <img src={product?.url} className="h-28 w-28" alt="" />
                  ) : (
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/portalservibras.appspot.com/o/imageNotFound.png?alt=media&token=96a3d0f2-eca1-44e8-b65e-f39261fba4ea"
                      }
                      className=" h-28 w-28"
                      alt=""
                    />
                  )}
                </Link>
              </Button>
              <CardContent className="mt-4 flex w-full flex-col gap-2">
                <span className="text-xl font-bold">{product.code}</span>
                <p className="text-muted-foreground lg:text-sm ">
                  {product?.name.toUpperCase()}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
