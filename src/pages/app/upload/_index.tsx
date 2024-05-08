import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storage } from "@/firebase.Config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useState } from "react";

export function Upload({ setUrl }: any) {
  const [img, setImg] = useState<any>("");
  const [loaded, setLoaded] = useState<any>(false)

  const handleClick = () => {
    if (img !== null) {
       const id = String(new Date().getTime());

      const imgRef = ref(storage, `orders/${id}`);
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
    }
  };

  return (
    <div className="flex gap-4">
      <Input type="file" onChange={handleFileChange} className="bg-slate-100" />

      {loaded ? (
        <Button className="min-w-[150px]" onClick={handleClick}>
          Carregado
        </Button>
      ) : (
        <Button className="min-w-[150px] bg-red-400" onClick={handleClick}>
          Carregar
        </Button>
      )}
    </div>
  );
}
