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
import { OrdersContext } from "@/contexts/partsOrdersContext";

const newOrderForm = z.object({
  supplier: z.string(),
  orderNumber: z.string(),
});

type NewOrderForm = z.infer<typeof newOrderForm>;

export function NewOrder({ DialogClose }: any) {
  const form = useForm<NewOrderForm>({ mode: "onChange" });

  const { addOrder } = useContext(OrdersContext);

  const handleAddNewOrder = (data: NewOrderForm) => {
    addOrder({ ...data });
  };

  return (
    <>
      <Helmet title="Novo Pedido" />
      <div className="ml-4 flex w-[350px] flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Novo Pedido</h1>
        </div>

        <form
          onSubmit={form.handleSubmit(handleAddNewOrder)}
          className="space-y-4"
        >
          <Controller
            name="supplier"
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
                      <SelectItem value="Whirlpool">Whirlpool</SelectItem>
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

          <div className="space-y-2">
            <Label htmlFor="ordernumber">Nº do pedido</Label>
            <Input
              id="orderNumber"
              type="text"
              {...form.register("orderNumber", { required: true })}
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
