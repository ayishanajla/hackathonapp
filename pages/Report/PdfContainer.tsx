import React from 'react';

interface ContainerProps {
    children: any;
}

class PdfContainer extends React.Component<ContainerProps>{
    bodyRef: React.RefObject<any>;
    constructor(props: any) {
        super(props);
        this.bodyRef = React.createRef();
    }
    render() {
        return (
            <section className="pdf-container">
                <section className='pdf-section' ref={this.bodyRef}>
                    {this.props.children}
                </section>
            </section>
        )
    }
}

export default PdfContainer;
