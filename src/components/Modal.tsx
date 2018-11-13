import * as React from "react";
import { Modal } from "semantic-ui-react";

export default class ModalCC extends React.Component<any, any> {
    
    constructor(props: any) {
        super(props);
    }

    render () {
        return (
            <Modal trigger={this.props.trigger}>
                <Modal.Header>{this.props.title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {this.props.children}
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}