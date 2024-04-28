import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const newOrderForm = z.object({
  technicianName: z.string(),
  itemDescription: z.string(),
  amount: z.number(),
});

type newOrderForm = z.infer<typeof newOrderForm>;

export function NewOrder() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<newOrderForm>();

  async function handleLogin(data: newOrderForm) {
    try {
      const openingDate = String(
        format(new Date(), " d 'de' LLLL 'de' yyyy", {
          locale: ptBR,
        }),
      );

      const date = new Date().getTime();
      console.log({ ...data, openingDate, date });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Requisição adicionada com sucesso!");
    } catch {
      toast.error("Erro ao adicionar peça!");
    }
  }

  return (
    <>
      <Helmet title="Nova Requisição" />
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Nova requisição
            </h1>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="technicianName">Nome do técnico</Label>
              <Input
                id="technicianName"
                type="text"
                {...register("technicianName")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="itemDescription">Descrição do item</Label>
              <Input
                id="itemDescription"
                type="text"
                {...register("itemDescription")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Quantidade</Label>
              <Input
                id="amount"
                type="number"
                {...register("amount")}
                required
              />
            </div>

            <Button
              disabled={isSubmitting}
              className="w-full text-lg"
              type="submit"
            >
              Adicionar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
