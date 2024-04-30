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

const techniciansFiltersSchema = z.object({
  technicianName: z.string().optional(),
});

type techniciansFiltersSchema = z.infer<typeof techniciansFiltersSchema>;
export function FilterRequisitionList() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(techniciansFiltersSchema),
  });

  const { handleSetFilteredList, handleRemoveFilters } =
    useContext(RequisitionsContext);

  function handleFilterList(data: techniciansFiltersSchema) {
    if (data.technicianName) {
      handleSetFilteredList(data.technicianName);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterList)}
      className="flex items-center gap-2"
    >
      <Controller
        name="technicianName"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="Técnicos"
              name={name}
              onValueChange={(onChange)}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Técnicos">Técnicos</SelectItem>
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
      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" /> Filtra resultados
      </Button>
      <Button
        onClick={() => handleRemoveFilters()}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="mr-2 h-4 w-4" /> Remover filtros
      </Button>
    </form>
  );
}
