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
import { toast } from "sonner";
import { useContext, useState } from "react";
import { OrdersContext } from "@/contexts/ordersContext";
import { Upload } from "../upload/_index";

const newOrderForm = z.object({
  orderNumber: z.string(),
  status: z.string(),
});

type newOrderForm = z.infer<typeof newOrderForm>;

interface Order {
  id: string;
  orderDate: string;
  orderNumber: string;
  status: string;
  supplier: string;
  url: string;
}

interface UpdateOrderPropsTypes {
  order: Order;
  DialogClose: any;
}

interface UpdateFormTypes {
  orderNumber: string;
  status: string;
}

export function UpdateOrder({ DialogClose, order }: UpdateOrderPropsTypes) {
  const form = useForm<newOrderForm>({ mode: "onChange" });
  const [url, setUrl] = useState<string>("");

  const { updateOrder } = useContext(OrdersContext);

  async function handleUpdateOrder({ orderNumber, status }: UpdateFormTypes) {
    try {
      updateOrder({
        supplier: order.supplier,
        orderNumber: orderNumber,
        orderDate: order.orderDate,
        status: status,
        id: order.id,
        url: url === "" ? order.url : url,
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
            Atualizar Pedido
          </h1>
        </div>

        <div className="space-y-2">
          <Label htmlFor="uploadInput">Anexar pedido</Label>
          <Upload id="uploadInput" setUrl={setUrl} />
        </div>

        <form
          onSubmit={form.handleSubmit(handleUpdateOrder)}
          className="space-y-4"
        >
          <Label htmlFor="status">Status do pedido</Label>
          <Controller
            name="status"
            control={form.control}
            defaultValue={order.status}
            render={({ field: { onChange, value } }) => {
              return (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger
                    className={cn(
                      "w-full pl-3 text-left text-lg font-normal",
                      !value && "text-muted-foreground",
                    )}
                  >
                    <SelectValue placeholder={order.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Aguardando envio">
                        Aguardando envio
                      </SelectItem>
                      <SelectItem value="Pedido enviado">
                        Pedido enviado
                      </SelectItem>
                      <SelectItem value="Bloqueio financeiro">
                        Bloqueio financeiro
                      </SelectItem>
                      <SelectItem value="Retenção fiscal">
                        Retenção fiscal
                      </SelectItem>
                      <SelectItem value="Retido na transportadora">
                        Retido na transportadora
                      </SelectItem>
                      <SelectItem value="Entrega parcial">
                        Entrega parcial
                      </SelectItem>
                      <SelectItem value="Pedido entregue">
                        Pedido entregue
                      </SelectItem>
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
              defaultValue={order.orderNumber}
              {...form.register("orderNumber", { required: true })}
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
