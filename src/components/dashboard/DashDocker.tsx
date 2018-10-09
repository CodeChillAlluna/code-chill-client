import * as React from "react";
import { Grid, List, Header, Container, Icon } from "semantic-ui-react";
import AuthService from "../../AuthService";
import withAuth from "../withAuth";
import NavBar from "../NavBar";
import Docker from "../Docker";
import DashGraph from "./DashGraph";

class DashDocker extends React.Component<any, any> {
    Auth: AuthService;
    userUpdate: Object;
    docker: Docker;

    constructor(props: any) {
        super(props);
        this.docker = new Docker();
        this.state = {
            "firstname": this.props.user.firstname,
            "lastname": this.props.user.lastname,
            "email": this.props.user.email,
            "message": "",
            "dockerId": this.docker.id,
            "dockerName": this.docker.name,
            "dockerOs": this.docker.os,
            "dockerCreationDate": this.docker.creationDate,
            "dockerState": this.docker.state,
            "dockerStatus": this.docker.status,
            "dockerCpuPercent": this.docker.cpuPercent,
            "dockerRamUsed": this.docker.ramUsed,
            "dockerCpuArray": [{ "CPU": 0 }],
            "dockerRamArray": [{ "RAM": 0 }]
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        this.changeResourcesUsed = this.changeResourcesUsed.bind(this);
        setInterval(this.changeResourcesUsed, 5000);
    }

    changeResourcesUsed() {
        this.setState({ dockerCpuPercent: this.docker.getCpuPercent() });
        this.setState({ dockerRamUsed: this.docker.getRamUsed() });

        this.state.dockerCpuArray.push({ "CPU": this.docker.getCpuPercent()});
        this.state.dockerRamArray.push({ "RAM": this.docker.getRamUsed()});

        if (this.state.dockerCpuArray.length > 10) {
            this.state.dockerCpuArray.shift();
        }
        if (this.state.dockerRamArray.length > 10) {
            this.state.dockerRamArray.shift();
        }
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
                                    {this.state.dockerCpuPercent}
                                </List.Item>
                                <List.Item>
                                    <List.Header>RamUsed</List.Header>
                                    {this.state.dockerRamUsed}
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <DashGraph
                                datavalues={this.state.dockerCpuArray}
                                dataname={[ "CPU" ]}
                                graphcolor="accent"
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <DashGraph
                                datavalues={this.state.dockerRamArray}
                                dataname={[ "RAM" ]}
                                graphcolor="paired"
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </NavBar>
        );
    }

}
export default withAuth(DashDocker);
