import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { ArchivedOrdersContext } from "@/contexts/archivedOrdersContext";

const filterSchema = z.object({
  supplier: z.string().optional(),
  status: z.string().optional(),
});

type FilterSchema = z.infer<typeof filterSchema>;
export function ArchivedOrdersFilter() {
  const { control, handleSubmit, reset } = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
  });

  const { setHandleFilteredList, removeFilters } = useContext(
    ArchivedOrdersContext,
  );

  function handleFilterList(data: FilterSchema) {
    setHandleFilteredList(data);
  }

  function handleReset() {
    reset({ supplier: "", status: "" });
    removeFilters();
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterList)}
      className="flex items-center gap-2"
    >
      <Controller
        name="supplier"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger
                className={cn(
                  "w-[220px] pl-3 text-left font-normal",
                  !value && "text-muted-foreground",
                )}
              >
                <SelectValue placeholder="Fornecedor" />
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

      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger
                className={cn(
                  "w-[220px] pl-3 text-left font-normal",
                  !value && "text-muted-foreground",
                )}
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Aguardando envio">
                    Aguardando envio
                  </SelectItem>
                  <SelectItem value="Pedido enviado">Pedido enviado</SelectItem>
                  <SelectItem value="Bloqueio financeiro">
                    Bloqueio financeiro
                  </SelectItem>
                  <SelectItem value="Retenção fiscal">
                    Retenção fiscal
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

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" /> Filtra resultados
      </Button>
      <Button
        onClick={() => handleReset()}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="mr-2 h-4 w-4" /> Remover filtros
      </Button>
    </form>
  );
}
