import React, { Fragment } from 'react';
import { IonLabel, IonDatetime } from '@ionic/react';
interface ContainerProps {
    onEventChange: any;
    selectedValue: string;
    disabledField: boolean;
}

interface ContainerState {
    dateValue: string;
}

class DateTime extends React.Component<ContainerProps, ContainerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            dateValue: props.selectedValue
        }
    }

    componentWillReceiveProps(nextProps: any){
        if(nextProps.selectedValue !== this.state.dateValue) {
            this.setState({ dateValue: nextProps.selectedValue });
        }
    }

    getDate = (e: any) => {
        this.setState({ dateValue: e.target.value });
        this.props.onEventChange(e);
    }

    render() {
        return (
            <Fragment>
                <IonLabel>Date</IonLabel>
                <IonDatetime name='date' disabled={this.props.disabledField} value={this.state.dateValue} onIonChange={this.getDate} placeholder="Select Date"></IonDatetime>
            </Fragment>
        );
    }
}

export default DateTime;
