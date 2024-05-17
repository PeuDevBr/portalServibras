import { Button } from "@/components/ui/button";
import { LoadDB } from "@/services/dataAcess/loadDBData";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function Home() {
  useEffect(() => {
    LoadDB();
  }, []);
  return (
    <>
      <Helmet title="Home" />
      <div className="flex min-h-screen pt-40 justify-center gap-6">
        <Button variant={"outline"} size={"lg"} className="text-xl">
          <Link to={"/products"}>Peças</Link>
        </Button>
        <Button variant={"outline"} size={"lg"} className="text-xl">
          <Link to={"/orders"}>Pedidos</Link>
        </Button>
        <Button variant={"outline"} size={"lg"} className="text-xl">
          <Link to={"/services"}>Serviços</Link>
        </Button>
        <Button variant={"outline"} size={"lg"} className="text-xl" asChild>
          <Link to={"/requisitions"}>Requisições</Link>
        </Button>
      </div>
    </>
  );
}
