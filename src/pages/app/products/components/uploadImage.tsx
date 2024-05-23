import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storage } from "@/firebase.Config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Upload } from "lucide-react";
import { useState } from "react";

export function UploadImage({ setUrl, productCode }: any) {
  const [img, setImg] = useState<any>("");
  const [loaded, setLoaded] = useState<any>(false);
  const [fileIsSelected, setFileIsSelected] = useState<any>(false);

  /*const handleUploadImageToCache = () => {
    if (img !== null) {
      const imgRef = ref(storage, `uploadCache/img.png`);
      uploadBytes(imgRef, img).then((value: any) => {
        getDownloadURL(value.ref).then((url) => {
          setUrl(url);
          setLoaded(true);
        });
      });
    }
  };*/

  const handleUploadImageToDataBase = () => {
    if (img !== null) {
      const imgRef = ref(storage, `parts/${productCode}.png`);
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
      {productCode === "" ? (
        <Input
          type="file"
          onChange={handleFileChange}
          className="min-w-[140px] bg-slate-100"
          disabled
        />
      ) : (
        <Input
          type="file"
          onChange={handleFileChange}
          className="min-w-[140px] bg-slate-100"
        />
      )}

      {!fileIsSelected ? (
        <Button
          variant={"outline"}
          type="button"
          className="min-w-[90px] bg-red-600 hover:bg-red-800"
          disabled
        >
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </Button>
      ) : !loaded ? (
        <Button
          className="min-w-[90px] bg-blue-600 hover:bg-blue-700"
          onClick={handleUploadImageToDataBase}
          type="button"
        >
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </Button>
      ) : (
        <Button
          className="min-w-[90px] cursor-not-allowed  bg-green-600 hover:bg-green-700"
          type="button"
        >
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </Button>
      )}
    </div>
  );
}
