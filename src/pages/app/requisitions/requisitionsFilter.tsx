import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequisitionsContext } from "@/contexts/RequisitionsContex";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const filterSchema = z.object({
  technicianName: z.string().optional(),
  date: z.date().optional(),
});

type FilterSchema = z.infer<typeof filterSchema>;
export function NewFilterRequisitionList() {
  const form = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
  });

  const { handleSetFilteredList, handleRemoveFilters } =
    useContext(RequisitionsContext);

  function handleFilterList(data: FilterSchema) {
    handleSetFilteredList(data);
  }

  function handleReset() {
    form.reset({ technicianName: ""});
    handleRemoveFilters();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFilterList)}
        className="flex items-center gap-2"
      >
        <Controller
          name="technicianName"
          control={form.control}
          render={({ field: { onChange, value } }) => {
            return (
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger
                  className={cn(
                    "w-[220px] pl-3 text-left font-normal",
                    !value && "text-muted-foreground",
                  )}
                >
                  <SelectValue placeholder="Técnicos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="AILSON">Ailson</SelectItem>
                    <SelectItem value="BATISTA">Batista</SelectItem>
                    <SelectItem value="CICERO">Cícero</SelectItem>
                    <SelectItem value="DENILSON">Denilson</SelectItem>
                    <SelectItem value="DIEL">Diel</SelectItem>
                    <SelectItem value="EDSON">Edson</SelectItem>
                    <SelectItem value="EDUARDO">Eduardo</SelectItem>
                    <SelectItem value="EMANUEL">Emanuel</SelectItem>
                    <SelectItem value="JAILSON">Jailson</SelectItem>
                    <SelectItem value="LEONARDO">Leonardo</SelectItem>
                    <SelectItem value="RENATO">Renato</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[220px] pl-3 text-left font-normal",
                        !value && "text-muted-foreground",
                      )}
                    >
                      {value ? (
                        format(value, " d 'de' LLLL 'de' yyyy", {
                          locale: ptBR,
                        })
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
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
    </Form>
  );
}
