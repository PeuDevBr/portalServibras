import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext } from "react";
import { ProductsContext } from "@/contexts/productsContext";
//import { OrdersContext } from "@/contexts/activeOrdersContext";

const newProductProps = z.object({
  brand: z.string(),
  code: z.string(),
  name: z.string(),
  subject: z.string(),
});

type NewOrderForm = z.infer<typeof newProductProps>;

export function AddProduct({ DialogClose }: any) {
  const form = useForm<NewOrderForm>({ mode: "onChange" });

  const { createProduct } = useContext(ProductsContext);

  const handleAddNewOrder = (data: NewOrderForm) => {
    createProduct(data);
  };

  return (
    <>
      <Helmet title="Novo Produto" />
      <div className="ml-4 flex w-[350px] flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Adicionar peça
          </h1>
        </div>

        <form
          onSubmit={form.handleSubmit(handleAddNewOrder)}
          className="space-y-4"
        >
          <Controller
            name="brand"
            control={form.control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger
                    className={cn(
                      "w-full pl-3 text-left text-lg font-normal",
                      !value && "text-muted-foreground",
                    )}
                  >
                    <SelectValue placeholder="Selecione o fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Brastemp/Consul">
                        Brastemp/Consul
                      </SelectItem>
                      <SelectItem value="Electrolux">Electrolux</SelectItem>
                      <SelectItem value="Esmaltec">Esmaltec</SelectItem>
                      <SelectItem value="Friopeças">Friopeças</SelectItem>
                      <SelectItem value="Dufrio">Dufrio</SelectItem>
                      <SelectItem value="Frigelar">Frigelar</SelectItem>
                      <SelectItem value="Riofrio">Riofrio</SelectItem>
                      <SelectItem value="Alado">Alado</SelectItem>
                      <SelectItem value="Joteck">Joteck</SelectItem>
                      <SelectItem value="Wurth">Wurth</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />
          <Controller
            name="subject"
            control={form.control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger
                    className={cn(
                      "w-full pl-3 text-left text-lg font-normal",
                      !value && "text-muted-foreground",
                    )}
                  >
                    <SelectValue placeholder="Selecione o tipo do produto da peça" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="geladeira, refrigerador">
                        Refrigerador
                      </SelectItem>
                      <SelectItem value="Máquina de Lavar, Lavadora, Maquina de lavar">
                        Lavadora
                      </SelectItem>
                      <SelectItem value="microondas">Microondas</SelectItem>
                      <SelectItem value="bebedouro, gelagua">
                        Bebedouro
                      </SelectItem>
                      <SelectItem value="Freezer">Freezer</SelectItem>
                      <SelectItem value="ar condicionado, condicionador de ar, split, condicionador ar">
                        Condicionador de ar
                      </SelectItem>
                      <SelectItem value="fogao, fogão, cooktop, forno">
                        Fogão/Cooktop
                      </SelectItem>
                      <SelectItem value="ferramenta">Ferramenta</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />

          <div className="space-y-2">
            <Label htmlFor="code">Código do produto</Label>
            <Input
              id="code"
              type="text"
              {...form.register("code", { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Descrição do produto</Label>
            <Input
              id="name"
              type="text"
              {...form.register("name", { required: true })}
            />
          </div>

          <DialogClose asChild>
            <Button
              disabled={!form.formState.isValid}
              className="w-full text-lg"
              type="submit"
            >
              Adicionar
            </Button>
          </DialogClose>
        </form>
      </div>
    </>
  );
}
