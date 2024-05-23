import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductsContext } from "@/contexts/productsContext";
import { Plus, Search } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface NewListFormData {
  textInput: string;
}

export function Header() {
  const { setFilteredList } = useContext(ProductsContext);

  const { register, handleSubmit } = useForm<NewListFormData>({
    defaultValues: {
      textInput: "",
    },
  });

  function handleSearchList(data: NewListFormData) {
    setFilteredList(data);
    localStorage.setItem("textInput", data.textInput);
  }
  return (
    <div className="fixed left-0 top-0 z-10 flex w-full justify-between bg-background px-12 py-4">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/products">Lista</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/productCatalog">Catalogo</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div></div>

      <form
        className="mr-28 flex items-center"
        onSubmit={handleSubmit(handleSearchList)}
      >
        <Input
          type="text"
          className="w-[400px] border-2"
          {...register("textInput")}
        />
        <Button type="submit" variant={"outline"} className="ml-2 border-2">
          <Search className=" h-4 w-4" />
        </Button>
      </form>

      <div>
        <Button
          variant={"outline"}
          size={"sm"}
          className="flex items-center gap-2 border-2"
          asChild
        >
          <Link to={"/addProduct"}>
            <Plus className="h-4 w-4 text-green-500" />
            Nova peça
          </Link>
        </Button>
      </div>
    </div>
  );
}
