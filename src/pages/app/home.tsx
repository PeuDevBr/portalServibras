import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <Helmet title="Home" />
      <div className="flex min-h-screen items-center justify-center gap-6">
        <Button variant={"outline"} size={"lg"} className="text-xl">
          <Link to={"/"}> Lista de Peças</Link>
        </Button>
        <Button variant={"outline"} size={"lg"} className="text-xl">
          <Link to={"/"}>Catálogo de Peças</Link>
        </Button>
        <Button variant={"outline"} size={"lg"} className="text-xl" asChild>
          <Link to={"/"}>Ordem de Serviço</Link>
        </Button>
        <Button variant={"outline"} size={"lg"} className="text-xl" asChild>
          <Link to={"/orders"}>Requisição de Peça</Link>
        </Button>
      </div>
    </>
  );
}
