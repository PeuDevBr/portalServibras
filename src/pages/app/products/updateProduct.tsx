import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { ProductsContext } from "@/contexts/productsContext";
import { Upload } from "./upload/_index";

interface ProductProps {
  name: string;
  code: string;
  brand: string;
  subject: string;
  model: string;
  pnc: string;
  version: string;
  amount: string;
  title: string;
  url: string;
}

interface UpdateOrderPropsTypes {
  product: ProductProps;
  DialogClose: any;
}

interface UpdateFormTypes {
  model: string;
  pnc: string;
  version: string;
  title: string;
}

const newOrderForm = z.object({
  model: z.string(),
  pnc: z.string(),
  version: z.string(),
  title: z.string(),
});

type newOrderForm = z.infer<typeof newOrderForm>;

export function UpdateProduct({ DialogClose, product }: UpdateOrderPropsTypes) {
  const form = useForm<newOrderForm>({ mode: "onChange" });
  const [url, setUrl] = useState<string>("");

  console.log(url);

  const { updateProduct } = useContext(ProductsContext);

  async function handleUpdateOrder({
    model,
    pnc,
    version,
    title,
  }: UpdateFormTypes) {
    try {
      updateProduct({
        name: product.name,
        code: product.code,
        brand: product.brand,
        subject: product.subject,
        model: model || "",
        pnc: pnc || "",
        version: version || "",
        amount: 0,
        title: title || "",
      });
    } catch (error) {
      toast.error(`Error aqui: ${error}`);
    }
  }

  return (
    <>
      <Helmet title="Novo Pedido" />
      <div className="ml-4 flex w-[350px] flex-col justify-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Atualizar peça
          </h1>
        </div>

        <div className="space-y-2">
          <Label htmlFor="uploadInput">Anexar foto</Label>
          <Upload id="uploadInput" setUrl={setUrl} productCode={product.code} />
        </div>

        <form
          onSubmit={form.handleSubmit(handleUpdateOrder)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="ordernumber">Modelo do produto</Label>
            <Input
              id="model"
              type="text"
              defaultValue={product.model}
              {...form.register("model")}
            />
          </div>
          {product.brand === "Electrolux" && (
            <div className="space-y-2">
              <Label htmlFor="ordernumber">PNC do produto</Label>
              <Input
                id="pnc"
                type="text"
                defaultValue={product.pnc}
                {...form.register("pnc")}
              />
            </div>
          )}
          {product.brand === "Brastemp/Consul" && (
            <div className="space-y-2">
              <Label htmlFor="ordernumber">Versão do produto</Label>
              <Input
                id="version"
                type="text"
                defaultValue={product.version}
                {...form.register("version")}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="ordernumber">Palavras-chave</Label>
            <Input
              id="title"
              type="text"
              defaultValue={product.title}
              {...form.register("title")}
            />
          </div>
          <DialogClose asChild>
            <Button className="w-full text-lg" type="submit">
              Atualizar
            </Button>
          </DialogClose>
        </form>
      </div>
    </>
  );
}
