import * as React from "react";
import { Grid, List, Header, Icon, Label, Container, Divider } from "semantic-ui-react";
import AuthService from "../../AuthService";
import withAuth from "../withAuth";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import { DASHDOCKER } from "../../Routes";

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
    }

    render() {
        return (
            <NavBar history={this.props.history} user={this.props.user}>
                <Grid padded={true}>

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
                            <Container textAlign="right">
                                <Link to={formatRoute(DASHDOCKER, {iddocker: "8dfafdbc3a40"})}>
                                    <Label color="teal">
                                        More details <Icon name="angle double right" />
                                    </Label>
                                </Link>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />

                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Header as="h1">Docker 8dfafdbc3a40</Header>
                            <Container textAlign="left">
                                Tomate, Tomato
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
                            <Container textAlign="right">
                                <Link to={formatRoute(DASHDOCKER, {iddocker: "8dfafdbc3a40"})}>
                                    <Label color="teal">
                                        More details <Icon name="angle double right" />
                                    </Label>
                                </Link>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />

                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Header as="h1">Docker 8dfafdbc3a40</Header>
                            <Container textAlign="left">
                                Yolo
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
                            <Container textAlign="right">
                                <Link to={formatRoute(DASHDOCKER, {iddocker: "8dfafdbc3a40"})}>
                                    <Label color="teal">
                                        More details <Icon name="angle double right" />
                                    </Label>
                                </Link>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                </Grid>
            </NavBar>
        );
    }

}
export default withAuth(DashMenu);
