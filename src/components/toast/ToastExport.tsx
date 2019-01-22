import * as React from "react";
import { Loader } from "semantic-ui-react";

class ToastExport extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.loading ? <div><Loader active={true} inline={true} /> {this.props.message}</div> : null}
                {this.props.icon ? <div>{this.props.icon} {this.props.message}</div> : null}
            </div>
        );
    }
}

export default ToastExport;