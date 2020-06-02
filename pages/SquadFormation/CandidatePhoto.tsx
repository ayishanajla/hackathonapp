import React, { Fragment, useState,useEffect } from 'react';
import {
    IonFab, IonFabButton, IonIcon, IonActionSheet
} from '@ionic/react';
import { camera, pencilOutline } from 'ionicons/icons';
import Avator from '../../common/images/avator';
import SquadImage from '../../common/images/SquadImage';

import { usePhotoGallery } from '../../components/hooks/usePhotoGallery';
import './SquadFormation.scss';

const CandidatePhoto: React.FC<NewImage> = (photo:any) => {
    var image = photo;
    var { photos, takePhoto, deletePhoto } = usePhotoGallery();
    const [showActionSheet, setShowActionSheet] = useState(false);
    document.addEventListener("removePhoto", (event: any) => {
        if(event.detail.removePhoto) {
            deletePhoto();
        }
    });
    document.addEventListener("removePhoto", (event: any) => {
        if(event.detail.removePhoto) {
            deletePhoto();
        }
    });
    const actionSheetButtons = [
        {
            text: 'Take Picture',
            handler: () => {
                takePhoto('CAMERA');
                // setSourceType('CAMERA');
            }
        },
        {
            text: 'Choose from Album',
            handler: () => {
                takePhoto('PHOTOS');
                // setSourceType('PHOTOS');
            }
        },
        {
            text: 'Cancel',
            role: 'cancel'
        }
    ];
    
    useEffect(
        () => {
            image={fetchedImage:""}
        },
        [photos]
      );

      useEffect(
        () => {
            photos.length=0
        },
        [image.fetchedImage]
      );
    return (
        <Fragment>
          <>
            <div className='imagePlaceHolder'>
                {(photos.length === 0 &&image.fetchedImage=="")&&<Avator />}
                {photos.length > 0 &&
                    <img src={`${photos[0].webviewPath}`} style={{ borderRadius: '50%' }} height='200' width='200' alt={photos[0].path}/>
                } 
                {(image.fetchedImage!=""&& photos.length==0)&& 
                   <img src ={image.fetchedImage} style={{ borderRadius: '50%' }} height='200' width='200'/>            
                }
                <IonFab className='cameraIcon' horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => setShowActionSheet(true)}>
                        <IonIcon icon={camera}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </div>
            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={() => setShowActionSheet(false)}
                buttons={actionSheetButtons}
            >
            </IonActionSheet>
            </> 
          
        </Fragment>
    );
}
interface NewImage {
    fetchedImage: string
}

export default CandidatePhoto;
