import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "@/contexts/productsContext";

export function Product() {
  const { productsList } = useContext(ProductsContext);
  const navigate = useNavigate();

  const { code } = useParams();
  const product = productsList.find((product: any) => product.code === code);

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
                  <Link to="/products">Produtos</Link>
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
                <Button
                  variant="outline"
                  size="default"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  voltar
                </Button>
                <Button size="sm" asChild>
                  <NavLink to={`/updateProduct/${code}`}>
                    Editar produto
                  </NavLink>
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0" className="bg-neutral-950">
                  <CardHeader>
                    <CardTitle>Detalhes do produto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="code">Código</Label>
                        <Input
                          id="code"
                          type="text"
                          className="w-full"
                          defaultValue={product?.code}
                          readOnly
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Descrição</Label>
                        <Input
                          id="code"
                          type="text"
                          className="w-full"
                          defaultValue={product?.name}
                          readOnly
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="model">Modelo</Label>
                        <Textarea
                          id="model"
                          className="min-h-28"
                          defaultValue={product?.model}
                          readOnly
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="title">Palavras-chave</Label>
                        <Textarea
                          id="title"
                          className="min-h-24"
                          defaultValue={product?.title}
                          readOnly
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card
                  className="overflow-hidden bg-neutral-950"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Imagem do produto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {product && (
                      <div className="grid gap-2">
                        {product.url ? (
                          <img
                            alt="Product image"
                            className="aspect-square w-full rounded-md bg-white object-cover"
                            height="300"
                            src={product.url}
                            width="300"
                          />
                        ) : (
                          <img
                            alt="Product image"
                            className="aspect-square w-full rounded-md bg-white object-cover"
                            height="300"
                            src={
                              "https://firebasestorage.googleapis.com/v0/b/portalservibras.appspot.com/o/imageNotFound.png?alt=media&token=96a3d0f2-eca1-44e8-b65e-f39261fba4ea"
                            }
                            width="300"
                          />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card
                  x-chunk="dashboard-07-chunk-5"
                  className="bg-neutral-950 lg:min-w-[300px]"
                >
                  <CardHeader>
                    <CardTitle>Fornecedor</CardTitle>
                    <CardDescription>{product?.brand}</CardDescription>
                  </CardHeader>
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
