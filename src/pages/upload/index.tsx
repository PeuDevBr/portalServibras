import { useState, ChangeEvent } from "react";

const ImageUploader = () => {
  const [images, setImages] = useState<(File | undefined)[]>([]);

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = [...images];
      newImages[index] = e.target.files[0];
      setImages(newImages);
    }
  };

  const renderImageInputs = () => {
    return images.map((image, index) => (
      <div key={index}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, index)}
        />
        {image && (
          <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
        )}
      </div>
    ));
  };

  return <div>{renderImageInputs()}</div>;
};

export default ImageUploader;
