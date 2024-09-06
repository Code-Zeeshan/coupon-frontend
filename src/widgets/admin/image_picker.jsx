import React, { useState, useRef, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/solid";

export function ImagePicker({ placeHolder, file, setFile, imageUrl }) {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpg")
    ) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
  };

  return (
    <div className="flex flex-col items-center">
      {!imagePreview && (
        <Button
          variant="gradient"
          onClick={handleButtonClick}
          className="flex flex-row items-center"
        >
          <Typography variant="small" color="white">
            {placeHolder}
          </Typography>
          <PhotoIcon className="h-10 w-20" />
        </Button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
        accept="image/jpeg,image/jpg,image/png"
      />

      {imagePreview && (
        <div className="relative mt-4">
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="h-30 w-30 object-cover"
          />
          <button
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            onClick={handleRemoveImage}
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ImagePicker;
