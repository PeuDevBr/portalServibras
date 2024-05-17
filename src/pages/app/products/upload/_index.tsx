import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storage } from "@/firebase.Config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useState } from "react";

export function Upload({ setUrl, productCode }: any) {
  const [img, setImg] = useState<any>("");
  const [loaded, setLoaded] = useState<any>(false);
  const [fileIsSelected, setFileIsSelected] = useState<any>(false);

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(storage, `products/${productCode}`);
      uploadBytes(imgRef, img).then((value: any) => {
        getDownloadURL(value.ref).then((url) => {
          setUrl(url);
          setLoaded(true);
        });
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImg(files[0]);
      setFileIsSelected(true);
    }
  };

  return (
    <div className="flex gap-4">
      <Input type="file" onChange={handleFileChange} className="bg-slate-100" />

      {!fileIsSelected ? (
        <Button className="min-w-[200px] bg-red-400" disabled>
          Carregar
        </Button>
      ) : !loaded ? (
        <Button
          className="min-w-[200px] bg-blue-400 hover:bg-blue-500"
          onClick={handleClick}
        >
          Carregar
        </Button>
      ) : (
        <Button className="min-w-[200px] cursor-not-allowed">Carregado</Button>
      )}
    </div>
  );
}
