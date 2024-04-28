import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setRequisitionsAction } from "@/services/actions/requisitionsAction";

const newOrderForm = z.object({
  technicianName: z.string(),
  itemDescription: z.string(),
  amount: z.number(),
});

type newOrderForm = z.infer<typeof newOrderForm>;

export function NewOrder({ DialogClose }: any) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<newOrderForm>({ mode: "onChange" });

  async function handleAddNewRequisition(data: newOrderForm) {
    try {
      const openingDate = String(
        format(new Date(), " d 'de' LLLL 'de' yyyy", {
          locale: ptBR,
        }),
      );

      const id = String(new Date().getTime());

      setRequisitionsAction(
        {
          technicianName: data.technicianName,
          itemDescription: data.itemDescription,
          amount: data.amount,
          openingDate,
          id,
        },
        id,
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      toast.error(`Error: ${e}`);
    }
  }

  return (
    <>
      <Helmet title="Nova Requisição" />
      <div className="ml-4 flex w-[350px] flex-col justify-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Nova requisição
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(handleAddNewRequisition)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="technicianName">Nome do técnico</Label>
            <Input
              id="technicianName"
              type="text"
              {...register("technicianName", { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="itemDescription">Descrição do item</Label>
            <Input
              id="itemDescription"
              type="text"
              {...register("itemDescription", { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Quantidade</Label>
            <Input
              id="amount"
              type="number"
              {...register("amount", { required: true })}
            />
          </div>
          <DialogClose asChild>
            <Button
              disabled={(!isValid)}
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
