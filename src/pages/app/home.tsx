import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function Home() {
  console.log("Rendering");
  return (
    <>
      <Helmet title="Home" />
      <div className="flex min-h-screen items-center justify-center gap-6">
        <Button variant={"outline"} size={"lg"} className="text-xl">
          <Link to={"/"}>Peças</Link>
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
