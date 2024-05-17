import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductsContext } from "@/contexts/productsContext";
import {
  AirVent,
  CornerDownLeft,
  Heater,
  Refrigerator,
  Search,
  WashingMachine,
} from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AddProductDialog } from "../productDialog";

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

  function handleSearchList(textInput: NewListFormData) {
    setFilteredList(textInput);
  }
  return (
    <div className="fixed left-0 top-0 z-10 flex w-full justify-between bg-background px-8 py-4">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div className="flex flex-col gap-1">
            <AirVent className="h-5 w-5" />
            <Heater className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-1">
            <Refrigerator className="h-5 w-5" />
            <WashingMachine className="h-5 w-5" />
          </div>
        </div>

        <div className="text-5xl font-semibold antialiased">Servibras</div>
      </div>

      <div></div>

      <form
        className="mr-28 flex items-center"
        onSubmit={handleSubmit(handleSearchList)}
      >
        <Input type="text" className="w-[400px]" {...register("textInput")} />
        <Button type="submit" variant={"outline"} className="ml-2">
          <Search className=" h-4 w-4" />
        </Button>
      </form>

      <AddProductDialog />

      <div className="flex items-center">
        <Button variant={"ghost"} size={"sm"} asChild>
          <Link to={"/"}>
            <CornerDownLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
