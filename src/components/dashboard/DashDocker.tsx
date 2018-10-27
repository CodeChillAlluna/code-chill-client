import * as React from "react";
import { Grid, List, Header, Container, Icon } from "semantic-ui-react";
import Docker from "../Docker";
import DashGraph from "./DashGraph";

class DashDocker extends React.Component<any, any> {
    userUpdate: Object;
    docker: Docker;

    constructor(props: any) {
        super(props);
        this.docker = new Docker();
        this.state = {         
            "dockerOs": this.docker.os,
            "dockerCreationDate": this.docker.creationDate,
            "dockerState": this.docker.state,
            "dockerStatus": this.docker.status,
            "dockerCpuPercent": this.docker.cpuPercent,
            "dockerRamUsed": this.docker.ramUsed,
            "dockerCpuArray": [{ "CPU": 0 }],
            "dockerRamArray": [{ "RAM": 0 }]
        };
        this.changeResourcesUsed = this.changeResourcesUsed.bind(this);
        console.log(this.props.docker);
    }

    componentDidMount() {
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
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Header as="h3">{this.props.docker.id}</Header>
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
                                <List.Header>Name</List.Header>
                                {this.props.docker.name}
                            </List.Item>
                            <List.Item>
                                <List.Header>Os</List.Header>
                                {this.docker.os}
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
                            <List.Item>
                                <Grid>
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
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

}
export default DashDocker;
