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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "@/contexts/productsContext";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { UploadImage } from "../components/uploadImage";

import { useNavigate } from "react-router-dom";

const newProductProps = z.object({
  brand: z.string(),
  code: z.string(),
  name: z.string(),
  subject: z.string(),
  model: z.string().optional(),
  title: z.string().optional(),
  url: z.string().optional(),
});

type NewProductForm = z.infer<typeof newProductProps>;

export function CreateProduct() {
  const { createProduct, setFilteredList } = useContext(ProductsContext);
  const form = useForm<NewProductForm>({ mode: "onChange" });
  const navigate = useNavigate();

  function handleAddNewProduct(data: NewProductForm) {
    createProduct(data);
    setFilteredList({ textInput: data.code });

    navigate(`/updateProduct/${data.code}`);
  }

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
        <form onSubmit={form.handleSubmit(handleAddNewProduct)}>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Adicionar produto
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm" type="button" asChild>
                    <Link to={"/products"}>Descartar</Link>
                  </Button>
                  <Button
                    size="sm"
                    type="submit"
                    disabled={!form.formState.isValid}
                  >
                    Salvar Produto
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card
                    x-chunk="dashboard-07-chunk-0"
                    className="bg-neutral-950"
                  >
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>Detalhes do produto</CardTitle>
                        <CardDescription>(Obrigatórios)</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="code">Código</Label>
                          <Input
                            id="code"
                            type="text"
                            className="w-full"
                            {...form.register("code", { required: true })}
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="name">Descrição</Label>
                          <Input
                            id="code"
                            type="text"
                            className="w-full"
                            {...form.register("name", { required: true })}
                          />
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="grid gap-3">
                            <Label htmlFor="brand">Fornecedor</Label>
                            <Controller
                              name="brand"
                              control={form.control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => {
                                return (
                                  <Select
                                    onValueChange={onChange}
                                    value={value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Brastemp/Consul">
                                        Brastemp/Consul
                                      </SelectItem>
                                      <SelectItem value="Electrolux">
                                        Electrolux
                                      </SelectItem>
                                      <SelectItem value="Esmaltec">
                                        Esmaltec
                                      </SelectItem>
                                      <SelectItem value="Midea">
                                        Midea
                                      </SelectItem>
                                      <SelectItem value="Fricon">
                                        Fricon
                                      </SelectItem>
                                      <SelectItem value="Embraco">
                                        Embraco
                                      </SelectItem>
                                      <SelectItem value="Friopeças">
                                        Friopeças
                                      </SelectItem>
                                      <SelectItem value="Dufrio">
                                        Dufrio
                                      </SelectItem>
                                      <SelectItem value="Frigelar">
                                        Frigelar
                                      </SelectItem>
                                      <SelectItem value="Riofrio">
                                        Riofrio
                                      </SelectItem>
                                      <SelectItem value="Alado">
                                        Alado
                                      </SelectItem>
                                      <SelectItem value="Joteck">
                                        Joteck
                                      </SelectItem>
                                      <SelectItem value="Wurth">
                                        Wurth
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                );
                              }}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="subject">Tipo</Label>
                            <Controller
                              name="subject"
                              control={form.control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => {
                                return (
                                  <Select
                                    onValueChange={onChange}
                                    value={value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Refrigerador, geladeira,">
                                        Refrigerador
                                      </SelectItem>
                                      <SelectItem value="Máquina de Lavar, Lavadora, Maquina de lavar">
                                        Lavadora
                                      </SelectItem>
                                      <SelectItem value="microondas">
                                        Microondas
                                      </SelectItem>
                                      <SelectItem value="bebedouro, gelagua">
                                        Bebedouro
                                      </SelectItem>
                                      <SelectItem value="Freezer">
                                        Freezer
                                      </SelectItem>
                                      <SelectItem value="ar condicionado, condicionador de ar, split, condicionador ar">
                                        Condicionador de ar
                                      </SelectItem>
                                      <SelectItem value="fogao, fogão, cooktop, forno">
                                        Fogão/Cooktop
                                      </SelectItem>
                                      <SelectItem value="ferramenta">
                                        Ferramenta
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    x-chunk="dashboard-07-chunk-2"
                    className="h-[400px] bg-neutral-950"
                  >
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>Detalhes de pesquisa</CardTitle>
                        <CardDescription>(Opcionais)</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="model">Modelo</Label>
                        <Textarea
                          id="model"
                          className="min-h-28"
                          {...form.register("model")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="title">Palavras-chave</Label>
                        <Textarea
                          id="title"
                          className="min-h-24"
                          {...form.register("title")}
                        />
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
                      <div className="grid gap-2">
                        <img
                          alt="Product image"
                          className="aspect-square w-full rounded-md bg-white object-cover"
                          height="300"
                          src={
                            "https://firebasestorage.googleapis.com/v0/b/portalservibras.appspot.com/o/image-removebg-preview%20(3).png?alt=media&token=e026693f-7385-4ed6-a461-2f56f171767e"
                          }
                          width="300"
                        />
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          {/*<button>
                            <img
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src="/placeholder.svg"
                              width="84"
                            />
                          </button>
                          <button>
                            <img
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src="/placeholder.svg"
                              width="84"
                            />
                          </button>*/}
                          <UploadImage
                            id="uploadInput"
                            setUrl={""}
                            productCode={""}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    x-chunk="dashboard-07-chunk-5"
                    className="bg-neutral-950"
                  >
                    <CardHeader>
                      <CardTitle>Arquivar produto</CardTitle>
                      <CardDescription>
                        Produto será salvo em um banco de dados separado e não
                        aparecerá no campo de pesquisa.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled
                        className="cursor-not-allowed"
                      >
                        Arquivar produto
                      </Button>
                    </CardContent>
                  </Card>
                  <Card
                    x-chunk="dashboard-07-chunk-5"
                    className="bg-neutral-950"
                  >
                    <CardHeader>
                      <CardDescription>
                        Remove produto do banco de dados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" variant="destructive" disabled>
                        <Link to="/products">Excluir produto</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/products">Descartar</Link>
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  disabled={!form.formState.isValid}
                >
                  Salvar Produto
                </Button>
              </div>
            </div>
          </main>
        </form>
      </div>
    </div>
  );
}
