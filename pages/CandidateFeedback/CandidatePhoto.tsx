import React, { Fragment, useState, useContext } from 'react';
import {
    IonFab, IonFabButton, IonIcon, IonActionSheet
} from '@ionic/react';
import { camera } from 'ionicons/icons';
import Avator from '../../common/images/avator';
import { usePhotoGallery } from '../../components/hooks/usePhotoGallery';
import './CandidateFeedback.scss';

const CandidatePhoto: React.FC = () => {
    const { photos, takePhoto, deletePhoto } = usePhotoGallery();
    const [showActionSheet, setShowActionSheet] = useState(false);
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
    return (
        <Fragment>
            <div className='imagePlaceHolder'>
                {photos.length === 0 && <Avator />}
                {photos.length > 0 && 
                    <img src={`${photos[0].webviewPath}`} style={{ borderRadius: '50%' }} height='200' width='200' alt={photos[0].path}/>
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
        </Fragment>
    );
}

export default CandidatePhoto;
