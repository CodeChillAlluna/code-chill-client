import * as React from "react";
import AuthService from "../../AuthService";
import { Grid, Header, Tab, Divider } from "semantic-ui-react";
import withAuth from "../withAuth";
import SharedEnv from "./SharedEnv";

class SharedEnvMenu extends React.Component<any, any> {
    Auth: AuthService;

    constructor(props: any) {
        super(props);

        this.state = {
            "dockers": []
        };
        
        this.Auth = new AuthService();
        this.Auth.getAllSharedDockerForUser().then((res) => {
            this.setState({ dockers: res.content.dockers });
        });
    }

    render() {
        let panes = [];
        for (let docker of this.state.dockers) {
            panes.push({ 
                menuItem: `${docker.id}`, 
                render: () => {
                    return (
                        <Tab.Pane>
                            <SharedEnv
                                key={docker.id}
                                Auth={this.Auth}
                                parentProps={this.props}
                                docker={docker}
                            />
                        </Tab.Pane>
                    );
                }
            });
        }

        return (
            <div>
                <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header as="h1">Shared environment</Header>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
                <Divider />
                <Tab 
                    menu={{ pointing: true }} 
                    panes={panes}
                />
            </div>
        );
    }

}
export default withAuth(SharedEnvMenu);
