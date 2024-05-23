import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { ProductsContext } from "@/contexts/productsContext";
import { UploadImage } from "./uploadImage";

interface productProps {
  name: string;
  code: string;
  brand: string;
  subject: string;
  model?: string;
  title?: string;
  url?: string;
}

interface UpdateOrderPropsTypes {
  product: productProps;
  DialogClose: any;
}

interface UpdateFormTypes {
  model: string;
  title: string;
  name: string;
}

const newOrderForm = z.object({
  model: z.string(),
  title: z.string(),
  name: z.string(),
});

type newOrderForm = z.infer<typeof newOrderForm>;

export function UpdateProduct({ DialogClose, product }: UpdateOrderPropsTypes) {
  const form = useForm<newOrderForm>({ mode: "onChange" });
  const [url, setUrl] = useState<string>("");

  const { updateProduct } = useContext(ProductsContext);

  async function handleUpdateProduct({ model, name, title }: UpdateFormTypes) {
    try {
      updateProduct({
        name: name,
        code: product.code,
        brand: product.brand,
        subject: product.subject,
        model: model || "",
        title: title || "",
        url,
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
          <UploadImage
            id="uploadInput"
            setUrl={setUrl}
            productCode={product.code}
          />
        </div>

        <form
          onSubmit={form.handleSubmit(handleUpdateProduct)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="ordernumber">Descrição da peça</Label>
            <Input
              id="name"
              type="text"
              defaultValue={product.name}
              {...form.register("name")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ordernumber">Modelo do produto</Label>
            <Input
              id="model"
              type="text"
              defaultValue={product.model}
              {...form.register("model")}
            />
          </div>
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
