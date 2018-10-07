import * as React from "react";
import { Grid, List, Header, Container, Icon } from "semantic-ui-react";
import AuthService from "../../AuthService";
import withAuth from "../withAuth";
import NavBar from "../NavBar";
import Docker from "../Docker";

class DashDocker extends React.Component<any, any> {
    Auth: AuthService;
    userUpdate: Object;
    docker: Docker;

    constructor(props: any) {
        super(props);
        this.state = {
            "firstname": this.props.user.firstname,
            "lastname": this.props.user.lastname,
            "email": this.props.user.email,
            "message": ""
        };
        this.Auth = new AuthService();
        this.docker = new Docker();
    }

    render() {
        return (
            <NavBar history={this.props.history} user={this.props.user}>
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Header as="h1">{this.docker.id}</Header>
                            <Container textAlign="left">
                                {this.docker.name}
                            </Container>
                        </Grid.Column>
                        <Grid.Column>
                            <Container textAlign="center">
                                {this.docker.os}
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
                                    {this.docker.id}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Creation date</List.Header>
                                    {this.docker.creationDate}
                                </List.Item>
                                <List.Item>
                                    <List.Header>State</List.Header>
                                    {this.docker.state}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Status</List.Header>
                                    {this.docker.status}
                                </List.Item>
                                <List.Item>
                                    <List.Header>CpuPercent</List.Header>
                                    {this.docker.cpuPercent}
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
