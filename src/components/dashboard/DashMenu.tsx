import * as React from "react";
import AuthService from "../../AuthService";
import { Grid, Header, Container, Icon, Tab, Divider } from "semantic-ui-react";
import withAuth from "../withAuth";
import DashDocker from "./DashDocker";

class DashMenu extends React.Component<any, any> {
    Auth: AuthService;
    userUpdate: Object;
    constructor(props: any) {
        super(props);
        this.state = {
            "firstname": this.props.user.firstname,
            "lastname": this.props.user.lastname,
            "email": this.props.user.email,
            "message": "",
            "dockers": this.props.user.dockers,
            "activeIndex": 0
        };
        this.Auth = new AuthService();
        this.addDocker = this.addDocker.bind(this);
        this.dockerDeleted = this.dockerDeleted.bind(this);
    }

    addDocker() {
        this.Auth.createDocker().then((res) => {
            console.log("docker created !");
            let updatedDockers = this.state.dockers;
            updatedDockers.push(res);
            this.setState({ dockers: updatedDockers });
        });
    }

    dockerDeleted() {
        this.Auth.getUserInfos().then((infos) => {
            this.setState({ dockers: infos.dockers });
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
                            <DashDocker
                                key={docker.id}
                                docker={docker} 
                                Auth={this.Auth} 
                                onDockerDelete={this.dockerDeleted} 
                            />
                        </Tab.Pane>
                    );
                }
            });
        }

        return (
            <div>
                <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Header as="h1">Dashboard</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Container textAlign="right">
                            <h2>
                                <small>Add new docker </small>
                                <Icon 
                                    color="green" 
                                    name="plus square outline" 
                                    onClick={this.addDocker} 
                                    style={{ cursor: "pointer" }}
                                />
                            </h2>
                        </Container>
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
export default withAuth(DashMenu);
