interface OrderStatusPropsType {
  status: string;
}

export function OrderStatus({ status }: OrderStatusPropsType) {
  return (
    <div className="flex items-center gap-2">
      {status === "Aguardando envio" && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {status === "Pedido enviado" && (
        <span className="h-2 w-2 rounded-full bg-green-600" />
      )}

      {status === "Bloqueio financeiro" && (
        <span className="h-2 w-2 rounded-full bg-red-600" />
      )}

      {status === "Retido na transportadora" && (
        <span className="h-2 w-2 rounded-full bg-orange-600" />
      )}

      {status === "Retenção fiscal" && (
        <span className="h-2 w-2 rounded-full bg-yellow-600" />
      )}

      {status === "Pedido entregue" && (
        <span className="h-2 w-2 rounded-full bg-blue-600" />
      )}
    </div>
  );
}
