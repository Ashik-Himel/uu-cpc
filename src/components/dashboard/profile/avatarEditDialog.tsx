"use client";

import fallbackAvatar from "@/assets/images/fallback-avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { compressImage, getCroppedImg } from "@/lib/imageUtils";
import Image from "next/image";
import { useRef, useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface AvatarEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAvatarUrl: string;
  userRefetch: () => void;
}

export function AvatarEditorDialog({
  open,
  onOpenChange,
  currentAvatarUrl,
  userRefetch,
}: AvatarEditorDialogProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCropComplete = async () => {
    if (!imageRef.current || !selectedImage) return;

    try {
      setIsUploading(true);
      const croppedImageUrl = await getCroppedImg(imageRef.current, crop);
      const croppedFile = await fetch(croppedImageUrl)
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            new File([blobFile], "avatar.jpg", { type: "image/jpeg" })
        );

      const compressedFile = await compressImage(croppedFile);
      const formData = new FormData();
      formData.append("avatar", compressedFile);

      // Perform server operation
      const result = { ok: true, url: "" };

      if (result.ok && result.url) {
        userRefetch();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Failed to process image:", error);
    } finally {
      setIsUploading(false);
      setSelectedImage(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Photo</DialogTitle>
          <DialogDescription className="sr-only">
            Upload your profile picture.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {!selectedImage ? (
            <div className="space-y-4">
              <Avatar className="mx-auto rounded-full w-32 h-32 object-cover">
                <AvatarImage src={currentAvatarUrl} alt="User's Avatar" />
                <AvatarFallback>
                  <Image src={fallbackAvatar} alt="Fallback Avatar" />
                </AvatarFallback>
              </Avatar>
              <div className="flex justify-center">
                <Button asChild>
                  <label className="cursor-pointer">
                    Change Avatar
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </label>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={1}
                circularCrop
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imageRef}
                  src={selectedImage}
                  alt="Uploaded Image"
                  className="max-h-[400px] w-auto mx-auto"
                />
              </ReactCrop>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedImage(null)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCropComplete} disabled={isUploading}>
                  {isUploading ? "Saving..." : "Done"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
