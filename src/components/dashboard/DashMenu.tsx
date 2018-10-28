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
            "message": ""
        };
        this.Auth = new AuthService();
        this.addDocker = this.addDocker.bind(this);
    }

    addDocker() {
        this.Auth.createDocker().then((res) => {
            console.log(res);
        });
    }

    render() {
        const panes = [
            { 
                menuItem: `${this.props.user.dockers[0].id}`, 
                render: () => {
                    return (
                        <Tab.Pane attached={false}>
                            <DashDocker docker={this.props.user.dockers[0]} Auth={this.Auth}/>
                        </Tab.Pane>
                    );
                }
            }
        ];

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
                <Tab menu={{ pointing: true }} panes={panes} />
            </div>
        );
    }

}
export default withAuth(DashMenu);
