import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, NavLink, useParams } from "react-router-dom";
import { useContext } from "react";
import { OrdersContext } from "@/contexts/activeOrdersContext";

export function ActiveOrder() {
  const { ordersList } = useContext(OrdersContext);

  const { id } = useParams();
  const order = ordersList.find((order: any) => order.id === id);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products">Pedidos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Editar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-4 md:ml-auto md:flex">
                <Button variant="outline" size="default" type="button" asChild>
                  <NavLink to={"/orders"}>Voltar</NavLink>
                </Button>
                <Button size="sm" asChild>
                  <NavLink to={`/updateOrder/${id}`}>Editar pedido</NavLink>
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0" className="bg-neutral-950">
                  <CardHeader>
                    <CardTitle>Detalhes do pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="flex justify-between">
                        <div className="grid gap-3">
                          <Label htmlFor="code">Nº do pedido</Label>
                          <Input
                            id="code"
                            type="text"
                            className="w-full"
                            defaultValue={order?.orderNumber}
                            readOnly
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="name">Fornecedor</Label>
                          <Input
                            id="code"
                            type="text"
                            className="w-full"
                            defaultValue={order?.supplier}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="grid gap-3">
                          <Label htmlFor="model">Status</Label>
                          <Input
                            id="model"
                            className="w-full"
                            defaultValue={order?.status}
                            readOnly
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="title">Tempo decorrido</Label>
                          <Input
                            id="title"
                            className="w-full"
                            defaultValue={order?.orderDate}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card
                  className="overflow-hidden bg-neutral-950 lg:min-w-[300px]"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Arquivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {order && (
                      <div className="grid gap-2">
                        {order.url && (
                          <Button asChild>
                            <Link to={order.url} target="_blank">
                              Visualizar pedido
                            </Link>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="ghost" size="sm">
                Descartar
              </Button>
              <Button size="sm">Salvar Produto</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
