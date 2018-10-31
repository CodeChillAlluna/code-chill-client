import * as React from "react";
import { Grid, List, Header, Container, Icon } from "semantic-ui-react";
import DashGraph from "./DashGraph";

class DashDocker extends React.Component<any, any> {
    userUpdate: Object;

    constructor(props: any) {
        super(props);
        this.state = {
            "dockerExists": true,
            "dockerIdContainer": "",
            "dockerName": "",
            "dockerImage": "",
            "dockerCreationDate": "",
            "dockerStatus": "",
            "dockerCpuPercent": "",
            "dockerMemoryLimit": 0,
            "dockerMemoryUsage": 0,
            "dockerMemoryPercentage": 0,
            "dockerCpuArray": [{ "CPU": 0, "max": 100 }],
            "dockerMemoryArray": [{ "RAM": 0, "max": 100 }]
        };
        this.startDocker = this.startDocker.bind(this);
        this.stopDocker = this.stopDocker.bind(this);
        this.pauseDocker = this.pauseDocker.bind(this);
        this.resumeDocker = this.resumeDocker.bind(this);
        this.statsDocker = this.statsDocker.bind(this);
        this.deleteDocker = this.deleteDocker.bind(this);

        this.statsDocker();
    }

    componentDidMount() {
        setInterval(this.statsDocker, 5000);
    }

    startDocker() {
        this.props.Auth.startDocker(this.props.docker.id).then((res) => {
            console.log("docker started !");
        });
    }

    stopDocker() {
        this.props.Auth.stopDocker(this.props.docker.id).then((res) => {
            console.log("docker stopped !");
        });
    }

    pauseDocker() {
        this.props.Auth.pauseDocker(this.props.docker.id).then((res) => {
            console.log("docker paused !");
        });
    }

    resumeDocker() {
        this.props.Auth.resumeDocker(this.props.docker.id).then((res) => {
            console.log("docker resumed !");
        });
    }

    deleteDocker() {
        this.props.Auth.deleteDocker(this.props.docker.id).then((res) => {
            console.log("docker deleted !");
            this.setState({ dockerExists: false });
        });
    }

    statsDocker() {
        console.log(this.state.dockerExists);
        if (this.state.dockerExists) {
            this.props.Auth.statsDocker(this.props.docker.id).then((docker) => {
                let memoryPercentage = (docker.memoryUsage as number) / (docker.memoryLimit as number) * 100;
    
                this.setState({ dockerIdContainer: docker.dockerId });
                this.setState({ dockerName: docker.name });
                this.setState({ dockerMemoryLimit: docker.memoryLimit });
                this.setState({ dockerMemoryUsage: docker.memoryUsage });
                this.setState({ dockerMemoryPercentage: memoryPercentage });
                this.setState({ dockerImage: docker.image });
                this.setState({ dockerStatus: docker.status });
                this.setState({ dockerCreationDate: docker.created.split("T")[0] });
    
                this.state.dockerMemoryArray.push({ "RAM": this.state.dockerMemoryUsage,
                                                    "max": this.state.dockerMemoryLimit });
                if (this.state.dockerMemoryArray.length > 10) {
                    this.state.dockerMemoryArray.shift();
                }
                //  TODO: dockerCpuPercent

                this.setState({ dockerExists: true });
            });
        } 
    }

    render() {
        return (
            <div>
                {this.state.dockerExists ? 
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Header as="h3">{this.state.dockerName}</Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign="right">
                                    <Icon 
                                        color="green" 
                                        name="play" 
                                        style={{ cursor: "pointer" }} 
                                        onClick={this.startDocker} 
                                    />
                                    <Icon 
                                        color="teal" 
                                        name="pause" 
                                        style={{ cursor: "pointer" }} 
                                        onClick={this.pauseDocker}
                                    />
                                    <Icon 
                                        color="teal" 
                                        name="forward" 
                                        style={{ cursor: "pointer" }} 
                                        onClick={this.resumeDocker}
                                    />
                                    <Icon 
                                        color="red" 
                                        name="power off" 
                                        style={{ cursor: "pointer" }} 
                                        onClick={this.stopDocker}
                                    />
                                    <Icon 
                                        color="red" 
                                        name="trash" 
                                        style={{ cursor: "pointer" }} 
                                        onClick={this.deleteDocker}
                                    />
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <List>
                                    <List.Item>
                                        <List.Header>ID</List.Header>
                                        {this.state.dockerIdContainer}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Image</List.Header>
                                        {this.state.dockerImage}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Creation date</List.Header>
                                        {this.state.dockerCreationDate}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Status</List.Header>
                                        {this.state.dockerStatus}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>CpuPercent</List.Header>
                                        {this.state.dockerCpuPercent}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>RamUsed</List.Header>
                                        {/* thanks to HTML white spaces... */}
                                        {(this.state.dockerMemoryUsage).toFixed(2)}&nbsp;Mo 
                                        &nbsp;/&nbsp;
                                        {(this.state.dockerMemoryLimit).toFixed(2)}&nbsp;Mo
                                        &nbsp;({(this.state.dockerMemoryPercentage).toFixed(2)} %)
                                    </List.Item>
                                    <List.Item>
                                        <Grid>
                                            <Grid.Row columns={2}>
                                                <Grid.Column>
                                                    <DashGraph
                                                        datavalues={this.state.dockerCpuArray}
                                                        datamax={100}
                                                        dataname={[ "CPU", "max" ]}
                                                        graphcolor="accent"
                                                    />
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <DashGraph
                                                        datavalues={this.state.dockerMemoryArray}
                                                        datamax={this.state.dockerMemoryLimit}
                                                        dataname={[ "RAM", "max" ]}
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
                : null}
            </div>
        );
    }

}
export default DashDocker;
