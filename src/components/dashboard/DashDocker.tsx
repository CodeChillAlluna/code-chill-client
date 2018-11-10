import * as React from "react";
import { Grid, List, Header, Container, Icon , Modal, Button } from "semantic-ui-react";
import DashGraph from "./DashGraph";
import { toast } from "react-toastify";

class DashDocker extends React.Component<any, any> {
    userUpdate: Object;
    interval: any;

    constructor(props: any) {
        super(props);
        this.state = {
            "dockerIdContainer": "",
            "dockerName": "",
            "dockerImage": "",
            "dockerCreationDate": "",
            "dockerStatus": "",
            "dockerCpuPercent": 0,
            "dockerMemoryLimit": 0,
            "dockerMemoryUsage": 0,
            "dockerMemoryPercentage": 0,
            "dockerCpuArray": [{ "CPU": 0, "max": 100 }],
            "dockerMemoryArray": [{ "RAM": 0, "max": 100 }],
            "dockerCreated": false,
            "dockerRunning": false,
            "dockerPaused": false,
            "dockerExited": false,
            "modalDeleteValidation": false
        };
        this.startDocker = this.startDocker.bind(this);
        this.stopDocker = this.stopDocker.bind(this);
        this.pauseDocker = this.pauseDocker.bind(this);
        this.resumeDocker = this.resumeDocker.bind(this);
        this.statsDocker = this.statsDocker.bind(this);
        this.deleteDocker = this.deleteDocker.bind(this);

        this.statsDocker();

        if (this.state.dockerRunning || this.state.dockerPaused) {
            this.interval = setInterval(this.statsDocker, 5000);
        }
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    startDocker() {
        // ok : 204
        this.props.Auth.startDocker(this.props.docker.id).then((res) => {
            toast(res.content.message, res.content.toast);
            if (res.status === 204) {
                this.setState({
                    dockerCreated: false,
                    dockerRunning: true,
                    dockerPaused: false,
                    dockerExited: false,
                    dockerStatus: "running"
                });
                this.interval = setInterval(this.statsDocker, 5000);
            } 
        });
    }

    stopDocker() {
        // ok : 204
        this.props.Auth.stopDocker(this.props.docker.id).then((res) => {
            toast(res.content.message, res.content.toast);
            if (res.status === 204) {
                this.setState({
                    dockerCreated: false,
                    dockerRunning: false,
                    dockerPaused: false,
                    dockerExited: true,
                    dockerStatus: "exited"
                });
                clearInterval(this.interval);
            }
        });
    }

    pauseDocker() {
        // ok : 204
        this.props.Auth.pauseDocker(this.props.docker.id).then((res) => {
            toast(res.content.message, res.content.toast);
            if (res.status === 204) {
                this.setState({
                    dockerCreated: false,
                    dockerRunning: false,
                    dockerPaused: true,
                    dockerExited: false,
                    dockerStatus: "paused"
                });
            }
        });
    }

    resumeDocker() {
        // ok : 204
        this.props.Auth.resumeDocker(this.props.docker.id).then((res) => {
            toast(res.content.message, res.content.toast);
            if (res.status === 204) {
                this.setState({
                    dockerCreated: false,
                    dockerRunning: true,
                    dockerPaused: false,
                    dockerExited: false,
                    dockerStatus: "running"
                });
            }
        });
    }

    deleteDocker() {
        // ok : 204
        this.props.Auth.deleteDocker(this.props.docker.id).then((res) => {
            if (res.status === 24) {
                clearInterval(this.interval);
                this.closeDeleteModal();
                this.props.onDockerDelete();
                toast(res.content.message, res.content.toast);
            }
        });
    }

    statsDocker() {
        this.props.Auth.statsDocker(this.props.docker.id).then((response) => {
            let docker = response.content;
            let memoryPercentage = (docker.memoryUsage as number) / (docker.memoryLimit as number) * 100;
            let updatedDockerMemoryArray = this.state.dockerMemoryArray;
            let updatedDockerCpuArray = this.state.dockerCpuArray;

            let dockerCreated = false;
            let dockerRunning = false;
            let dockerPaused = false;
            let dockerExited = false;

            updatedDockerMemoryArray.push({ 
                "RAM": this.state.dockerMemoryUsage,
                "max": this.state.dockerMemoryLimit 
            });

            updatedDockerCpuArray.push({
                "CPU": this.state.dockerCpuPercent,
                "max": 100 
            });

            if (updatedDockerMemoryArray.length > 10) {
                updatedDockerMemoryArray.shift();
            }

            if (updatedDockerCpuArray.length > 10) {
                updatedDockerCpuArray.shift();
            }

            switch (docker.status) {
                case "created":
                    dockerCreated = true;
                    break;
                case "running":
                    dockerRunning = true;
                    break;
                case "paused":
                    dockerPaused = true;
                    break;
                case "exited":
                    dockerExited = true;
                    break;
                default:
                    break;
            }

            this.setState({ 
                dockerIdContainer: docker.dockerId, 
                dockerName: docker.name,
                dockerMemoryLimit: docker.memoryLimit,
                dockerMemoryUsage: docker.memoryUsage ,
                dockerMemoryPercentage: memoryPercentage,
                dockerImage: docker.image,
                dockerStatus: docker.status,
                dockerCreationDate: docker.created.split("T")[0],
                dockerMemoryArray: updatedDockerMemoryArray,
                dockerCpuPercent: docker.cpuPercent,
                dockerCreated: dockerCreated,
                dockerRunning: dockerRunning,
                dockerPaused: dockerPaused,
                dockerExited: dockerExited
            });
        });
        if (this.state.dockerCreated || this.state.dockerExited) {
            clearInterval(this.interval);
        }
    }

    showDeleteModal = () => this.setState({ modalDeleteValidation: true });
    closeDeleteModal = () => this.setState({ modalDeleteValidation: false });

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header as="h3">{this.state.dockerName}</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Container textAlign="right">
                                { 
                                    (this.state.dockerCreated || this.state.dockerExited)
                                    ? <Icon 
                                        color="green" 
                                        name="play" 
                                        style={{ cursor: "pointer" }} 
                                        onClick={this.startDocker} 
                                    />
                                    : null
                                }
                                { 
                                    this.state.dockerRunning
                                    ? <Icon 
                                        color="teal" 
                                        name="pause" 
                                        style={{ cursor: "pointer" }} 
                                        onClick={this.pauseDocker}
                                    />
                                    : null
                                }
                                { 
                                    this.state.dockerPaused
                                    ? <Icon 
                                        color="teal" 
                                        name="forward" 
                                        style={{ cursor: "pointer" }} 
                                        onClick={this.resumeDocker}
                                    />
                                    : null
                                }
                                { 
                                    (this.state.dockerRunning || this.state.dockerPaused)
                                    ?  <Icon 
                                        color="red" 
                                        name="power off" 
                                        style={{ cursor: "pointer" }} 
                                        onClick={this.stopDocker}
                                    />
                                    : null
                                }
                                <Icon 
                                    color="red" 
                                    name="trash" 
                                    style={{ cursor: "pointer" }}
                                    onClick={this.showDeleteModal}
                                />
                                <Modal
                                    basic={true} 
                                    size="small"
                                    open={this.state.modalDeleteValidation}
                                    onClose={this.closeDeleteModal}
                                >
                                <Header icon="trash" content="Delete docker ?" />
                                <Modal.Content>
                                    <p>
                                    Would you like to delete this docker ?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="red" inverted={true} onClick={this.closeDeleteModal}>
                                    <Icon name="remove" /> No
                                    </Button>
                                    <Button color="green" inverted={true} onClick={this.deleteDocker}>
                                    <Icon name="checkmark"/> Yes
                                    </Button>
                                </Modal.Actions>
                                </Modal>
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
                                    {(this.state.dockerCpuPercent).toFixed(2)} %
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
            </div>
        );
    }

}
export default DashDocker;
