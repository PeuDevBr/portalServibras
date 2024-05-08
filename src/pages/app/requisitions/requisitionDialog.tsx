import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import { NewRequisition } from "./newRequisition";

export function NewRequisitionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          <Plus className="h-4 w-4 text-green-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-h-[625px] sm:max-w-[425px]">
        <NewRequisition DialogClose={DialogClose}/>
      </DialogContent>
    </Dialog>
  );
}
