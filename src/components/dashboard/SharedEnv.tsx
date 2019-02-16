import * as React from "react";
import { 
    Grid, 
    List, 
    Header
} from "semantic-ui-react";
import { IDE } from "../../Routes";
import { formatRoute } from "react-router-named-routes";

class SharedEnv extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    redirectIDE = () => this.props.parentProps.history.replace(formatRoute(IDE, {id: this.props.docker.id}));

    render () {
        return (
            <div>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={14}>
                            <Header 
                                as="h3" 
                                onClick={this.redirectIDE} 
                                style={{ cursor: "pointer" }}
                            >
                                {this.props.docker.name}
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <List>
                                <List.Item>
                                    <List.Header>Image</List.Header>
                                    {this.props.docker.image.name} - {this.props.docker.image.version}
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default SharedEnv;