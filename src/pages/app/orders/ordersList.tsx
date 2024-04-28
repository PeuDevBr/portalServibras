import { getRequisitionsObservers } from "@/services/observers/requisitionsObservers";
import { useEffect, useState } from "react";
export function OrdersList() {
  const [requisitions, setRequisitions] = useState<any[]>([]);

  useEffect(() => {
    getRequisitionsObservers(setRequisitions);
  }, []);

  return (
    <div className="p-8">
      <h3>Lista de requisições</h3>
      <ul>
        {requisitions.map((requisition) => (
          <div key={requisition.id} className="mt-4 flex gap-4">
            <li className="w-28">{requisition.technicianName}</li>
            <li className="w-28">{requisition.itemDescription}</li>
            <li className="w-60">{requisition.openingDate}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
