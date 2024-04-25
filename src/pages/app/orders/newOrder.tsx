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
  technician: z.string(),
  part: z.string(),
  quantity: z.number(),
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

      console.log({ ...data, openingDate });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Login efetuado com sucesso!");
    } catch {
      toast.error("Não foi possível efetuar o login!");
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
              <Label htmlFor="technician">Nome do técnico</Label>
              <Input id="technician" type="text" {...register("technician")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="part">Descrição do item</Label>
              <Input id="part" type="text" {...register("part")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input id="quantity" type="number" {...register("quantity")} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Adicionar requisição
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
