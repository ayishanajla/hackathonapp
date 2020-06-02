import { useState } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { CameraResultType } from "@capacitor/core";

export interface Photo {
    filepath: string;
    path: string;
    format: string;
    webviewPath?: string;
    base64?: string;
  }
export function usePhotoGallery() {

    const { getPhoto } = useCamera();
    const [photos, setPhotos] = useState<Photo[]>([]);

    const deletePhoto = async () => {
      setPhotos([]);
      return {
        photos,
        deletePhoto,
        takePhoto
      }
    }
    const takePhoto = async (imgSource: any) => {
      const cameraPhoto = await getPhoto({
        resultType: CameraResultType.Uri,
        source: imgSource,
        quality: 50
      });
      const fileName = new Date().getTime() + '.jpeg';
      const newPhotos: any = [{
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
        format: cameraPhoto.format,
        path: cameraPhoto.path
      }];
      setPhotos(newPhotos)
    };
  
    return {
        photos,
        takePhoto,
        deletePhoto
      };
  }