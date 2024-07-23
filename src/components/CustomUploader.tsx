import React, { useState, useRef, useEffect } from "react";

type CustomUploaderType = {
  label: string;
  photo: File | null;
  onChange: (value: React.SetStateAction<File | null>) => void;
};

export default function CustomUploader({
  label,
  photo,
  onChange,
}: CustomUploaderType) {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      setFileName(uploadedFile.name);
      onChange(uploadedFile);
    }
  };

  const handleDelete = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFileName(droppedFile.name);
      onChange(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (photo === null) {
      setFileName(null);
    }
  }, [photo]);

  return (
    <div className="flex flex-col my-1">
      <span className="capitalize pb-1">{label}</span>
      <div
        className="w-full h-24 rounded-lg border-solid border border-think-gray flex items-center justify-center bg-white relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {fileName ? (
          <div className="flex items-center justify-center p-2">
            <span className="mr-2">{fileName}</span>
            <div
              onClick={handleDelete}
              className="relative w-5 h-5 bg-think-dark hover:bg-think-red rounded-full flex items-center justify-center cursor-pointer"
            >
              <div className="absolute w-2.5 h-0.5 bg-white transform rotate-45"></div>
              <div className="absolute w-2.5 h-0.5 bg-white transform -rotate-45"></div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-700">
            <span
              onClick={handleClick}
              className="text-think-purple underline cursor-pointer"
            >
              Upload a file
            </span>{" "}
            <span className="text-think-dark-gray">or drag and drop here</span>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
