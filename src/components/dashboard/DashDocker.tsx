import * as React from "react";
import { Grid, List, Header, Container, Icon } from "semantic-ui-react";
import AuthService from "../../AuthService";
import withAuth from "../withAuth";
import NavBar from "../NavBar";

class DashDocker extends React.Component<any, any> {
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
    }

    render() {
        return (
            <NavBar history={this.props.history} user={this.props.user}>
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Header as="h1">Docker 8dfafdbc3a40</Header>
                            <Container textAlign="left">
                                Patate, Potato
                            </Container>
                        </Grid.Column>
                        <Grid.Column>
                            <Container textAlign="center">
                                ubuntu:latest
                            </Container>
                        </Grid.Column>
                        <Grid.Column>
                            <Container textAlign="right">
                                <Icon color="green" name="play" />
                                <Icon color="teal" name="pause"/>
                                <Icon color="red" name="power off"/>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <List>
                                <List.Item>
                                    <List.Header>Id</List.Header>
                                    8dfafdbc3a40
                                </List.Item>
                                <List.Item>
                                    <List.Header>Creation date</List.Header>
                                    1367854155
                                </List.Item>
                                <List.Item>
                                    <List.Header>State</List.Header>
                                    exited
                                </List.Item>
                                <List.Item>
                                    <List.Header>Status</List.Header>
                                    Exit 0
                                </List.Item>
                                <List.Item>
                                    <List.Header>CpuPercent</List.Header>
                                    80
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </NavBar>
        );
    }

}
export default withAuth(DashDocker);
