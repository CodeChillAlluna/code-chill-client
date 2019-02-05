import * as React from "react";
import { 
    Grid, 
    List, 
    Header, 
    Container, 
    Icon , 
    Modal, 
    Button, 
    Input, 
    Popup, 
    Loader, 
    Form, 
    Radio,
    Table
} from "semantic-ui-react";
import DashGraph from "./DashGraph";
import { toast } from "react-toastify";
import { IDE } from "../../Routes";
import { formatRoute } from "react-router-named-routes";
import * as ToastConfig from "../../constants/toast.config";

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
            "modalDeleteValidation": false,
            "modalStartIDE": false,
            "modalStartIDEValidated": false,
            "modalAddShare": false,
            "isNameEditing": false,
            "editDockerName": "",
            "modalCommitImage": false,
            "nameCommit": "",
            "versionCommit": "",
            "versionBeforeCommit": "",
            "privacyCommit": "",
            "usersNotShared": [],
            "usersShared": [],
            "dataShared": []
        };
        this.startDocker = this.startDocker.bind(this);
        this.stopDocker = this.stopDocker.bind(this);
        this.pauseDocker = this.pauseDocker.bind(this);
        this.resumeDocker = this.resumeDocker.bind(this);
        this.statsDocker = this.statsDocker.bind(this);
        this.deleteDocker = this.deleteDocker.bind(this);
        this.editDockerName = this.editDockerName.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.statsDocker();
    }

    componentWillMount() {
        this.props.Auth.getImage(this.props.docker.id).then((res) => {
            this.setState({
                nameCommit: res.content.image.name,
                versionBeforeCommit: res.content.image.version,
                privacyCommit: res.content.image.privacy ? "public" : "private"
            });
        });

        this.props.Auth.getAllUserDockerShared(this.props.docker.id).then((res) => {
            this.setState({ 
                usersShared: res.content.users,
                dataShared: res.content.share_infos 
            });
        }).then(() => {
            this.props.Auth.getAllUsers().then((res) => {
                let usersNotShared = res.content.users.filter(this.checkUnshared);
                this.setState({ 
                    usersNotShared: usersNotShared
                });
            });
        });
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    checkUnshared = (user: any) => {
        let bool = true;
        for (let i = 0; i < this.state.usersShared.length; i++) {
            if (user.id === this.state.usersShared[i].id) {
                bool = false;
            }
        }
        return bool;
    }

    checkInfosUnshared = (info: any) => {
        let bool = true;
        for (let i = 0; i < this.state.dataShared.length; i++) {
            if (info.id === this.state.dataShared[i].id) {
                bool = false;
            }
        }
        return bool;
    }

    removeListUserShare = (user: any) => {
        let bool = false;
        for (let i = 0; i < this.state.usersShared.length; i++) {
            if (user.id === this.state.usersShared[i].id) {
                bool = true;
            }
        }
        return bool;
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
            if (res.status === 204) {
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
                "RAM": docker.memoryUsage as number,
                "max": docker.memoryLimit as number 
            });

            updatedDockerCpuArray.push({
                "CPU": docker.cpuPercent as number,
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
                dockerExited: dockerExited,
            });
        });

        if (!this.interval) {
            this.interval = setInterval(this.statsDocker, 5000);
        }

        if (this.state.dockerCreated || this.state.dockerExited) {
            clearInterval(this.interval);
        }
    }
    
    editDockerName(e: any) {
        if (this.state.isNameEditing) {
            if (this.state.editDockerName === "") {
                toast("No new name was entered.", ToastConfig.WARNING);
            } else if (/\W/.test(this.state.editDockerName)) {
                toast("Only A-Z, a-z, 0-9 and '_' are accepted.", ToastConfig.WARNING);
            } else {
                this.props.Auth.renameDocker(this.props.docker.id, this.state.editDockerName).then((res) => {
                    toast(res.content.message, res.content.toast);
                    if (res.status === 204) {
                        this.setState({
                            dockerName: this.state.editDockerName
                        });
                    }
                });
            }
            this.setState({isNameEditing: false});
        } else {
            this.setState({isNameEditing: true});
        }
    }
    
    handleChange(e: any) {
        this.setState({editDockerName: e.target.value});
    }

    showDeleteModal = () => this.setState({ modalDeleteValidation: true });
    showStartIDEModal = () => this.state.dockerRunning ? this.redirectIDE() : this.setState({ modalStartIDE: true });
    showCommitModal = () => this.setState({ modalCommitImage: true });
    showAddShareModal = () => this.setState({ modalAddShare: true });
    closeAddShareModal = () => this.setState({ modalAddShare: false });
    closeCommitModal = () => this.setState({ modalCommitImage: false });
    closeDeleteModal = () => this.setState({ modalDeleteValidation: false });
    closeStartIDEModal = () => this.setState({ modalStartIDE: false });
    redirectIDE = () => this.props.parentProps.history.push(formatRoute(IDE, {id: this.props.docker.id}));

    handleChangeNameCommit = (e: any) => this.setState({ nameCommit: e.target.value });
    handleChangeVersionCommit = (e: any) => this.setState({ versionCommit: e.target.value });

    handlerBeforeIDE = () => {
        if (this.state.dockerPaused) {
            this.resumeDocker();
            this.redirectIDE();
        }

        if (this.state.dockerExited || this.state.dockerCreated) {
            this.setState({ modalStartIDEValidated: true });
            this.startDocker();
            setTimeout(() => this.redirectIDE(), 3000);
        }
    }

    exportContainer = () => this.props.Auth.exportContainer(this.props.docker.id);

    exportImage = () => this.props.Auth.exportImage();

    commitImage = () => {
        this.props.Auth.commitImage(
            this.props.docker.id, 
            this.state.nameCommit, 
            this.state.versionCommit, 
            this.state.privacyCommit === "public" ? false : true
            ).then((res) => {
            toast(res.content.message, res.content.toast);
            this.closeCommitModal();
        });
    }

    shareEnv = (user: any) => {        
        this.props.Auth.shareEnv(this.props.docker.id, user.id).then((res) => {
            toast(res.content.message, res.content.toast);
        }).then(() => {
            this.props.Auth.getAllUserDockerShared(this.props.docker.id).then((res) => {
                this.setState({ 
                    usersShared: this.state.usersShared.concat(user),
                    dataShared: res.content.share_infos,
                    usersNotShared: this.state.usersNotShared.filter((item) => item.id !== user.id),
                });
            });
        });
    }

    handleChangeRadioCommit = (e: any, radio: any) => {
        this.setState({ privacyCommit: radio.value });
    }

    removeShareEnv = (user: any) => {
        this.props.Auth.removeShareEnv(this.props.docker.id, user.id).then((res) => {
            toast(res.content.message, res.content.toast);
        }).then(() => {
            this.props.Auth.getAllUserDockerShared(this.props.docker.id).then((res) => {
                this.setState({ 
                    usersShared: res.content.users,
                    dataShared: res.content.share_infos,
                    usersNotShared: this.state.usersNotShared.concat(user),
                });
            });
        });
    }

    render() {
        let body = [];
        for (let i = 0; i < this.state.usersShared.length; i++) {
            body.push(
                <Table.Row key={this.state.usersShared[i].username}>
                    <Table.Cell>{this.state.usersShared[i].firstname} {this.state.usersShared[i].lastname}</Table.Cell>
                    <Table.Cell>
                        {this.state.dataShared[i].readOnly === true ? <div>Yes</div> : <div>No</div>}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon.Group 
                            style={{ cursor: "pointer" }} 
                            onClick={() => this.removeShareEnv(this.state.usersShared[i])}
                        >
                            <Icon 
                                color="red" 
                                name="close"
                            />
                        </Icon.Group>
                    </Table.Cell>
                </Table.Row>
            );
        }

        let bodyNotShared = [];
        for (let i = 0; i < this.state.usersNotShared.length; i++) {
            bodyNotShared.push(
                <Table.Row key={this.state.usersNotShared[i].username}>
                    <Table.Cell>
                        {this.state.usersNotShared[i].firstname} {this.state.usersNotShared[i].lastname}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon.Group 
                            style={{ cursor: "pointer" }} 
                            onClick={() => this.shareEnv(this.state.usersNotShared[i])}
                        >
                            <Icon 
                                color="green" 
                                name="share square"
                            />
                            Share
                        </Icon.Group>
                    </Table.Cell>
                </Table.Row>
            );
        }

        return (
            <div>
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column width={1}>
                            <Popup
                                trigger={
                                    <Icon
                                        color="blue"
                                        name={this.state.isNameEditing ? "edit outline" : "edit"}
                                        style={{ cursor: "pointer" }} 
                                        onClick={this.editDockerName} 
                                    />
                                }
                                horizontalOffset={12}
                                content={
                                    this.state.isNameEditing
                                    ? "Confirm edit"
                                    : "Edit environment name"
                                }
                            />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            {
                                this.state.isNameEditing
                                ? <Input
                                    required={true}
                                    name="editDockerName"
                                    placeholder={this.state.dockerName}
                                    onChange={this.handleChange}
                                />
                                : 
                                <div>
                                    <Header as="h3" onClick={this.showStartIDEModal} style={{ cursor: "pointer" }}>
                                        {this.state.dockerName}
                                    </Header>
                                    <Modal
                                        basic={true} 
                                        size="small"
                                        open={this.state.modalStartIDE}
                                        onClose={this.closeStartIDEModal}
                                    >
                                    {!this.state.modalStartIDEValidated
                                    ?
                                    <div>
                                        <Modal.Content>
                                            <p>
                                            Environment needs to be running before going to your code editor.
                                            </p>
                                            <p>
                                            Would you like to turn it on ?
                                            </p>
                                        </Modal.Content>
                                    </div>
                                    :
                                    <div>
                                        <Modal.Content>
                                            <p>
                                                <Loader active={true} inline={true} /> Loading environnement.
                                            </p>
                                        </Modal.Content>
                                    </div>
                                    }
                                    <Modal.Actions>
                                        {!this.state.modalStartIDEValidated
                                        ?
                                        <div>
                                            <Button color="red" inverted={true} onClick={this.closeStartIDEModal}>
                                            <Icon name="remove" /> No
                                            </Button>
                                            <Button color="green" inverted={true} onClick={this.handlerBeforeIDE}>
                                            <Icon name="play"/> Yes
                                            </Button>
                                        </div>
                                        :
                                        null
                                        }
                                    </Modal.Actions>
                                    </Modal>
                                </div>
                            }
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Container textAlign="right">
                                { 
                                    (this.state.dockerCreated || this.state.dockerExited)
                                    ? <Popup
                                        trigger={
                                            <Icon 
                                                color="green" 
                                                name="play" 
                                                style={{ cursor: "pointer" }} 
                                                onClick={this.startDocker} 
                                            />
                                        }
                                        horizontalOffset={12}
                                        content="Start the environment"
                                    />
                                    : null
                                }
                                { 
                                    this.state.dockerRunning
                                    ? <Popup
                                        trigger={
                                            <Icon 
                                                color="teal" 
                                                name="pause" 
                                                style={{ cursor: "pointer" }} 
                                                onClick={this.pauseDocker}
                                            />
                                        }
                                        horizontalOffset={12}
                                        content="Pause the environment"
                                    />
                                    : null
                                }
                                { 
                                    this.state.dockerPaused
                                    ? <Popup
                                        trigger={
                                            <Icon 
                                                color="teal" 
                                                name="forward" 
                                                style={{ cursor: "pointer" }} 
                                                onClick={this.resumeDocker}
                                            />
                                        }
                                        horizontalOffset={12}
                                        content="Resume the environment"
                                    />
                                    : null
                                }
                                { 
                                    (this.state.dockerRunning || this.state.dockerPaused)
                                    ?  <Popup
                                        trigger={
                                            <Icon 
                                                color="red" 
                                                name="power off" 
                                                style={{ cursor: "pointer" }} 
                                                onClick={this.stopDocker}
                                            />
                                        }
                                        horizontalOffset={12}
                                        content="Stop the environment"
                                    />
                                    : null
                                }
                                <Popup
                                    trigger={
                                        <Icon 
                                            color="red" 
                                            name="trash" 
                                            style={{ cursor: "pointer" }}
                                            onClick={this.showDeleteModal}
                                        />
                                    }
                                    horizontalOffset={12}
                                    content="Delete the environment"
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
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <List>
                                <List.Item>
                                    <List.Header>ID</List.Header>
                                    {this.props.docker.id}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Image</List.Header>
                                    {this.state.dockerImage}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Creation date</List.Header>
                                    {this.state.dockerCreationDate}
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List>
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
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List>
                                <List.Item>
                                    <List.Header><Icon name="download" /> Export</List.Header>
                                    <Button.Group widths="2">
                                        <Button onClick={this.exportContainer}>
                                            Container
                                        </Button>
                                        <Button.Or />
                                        <Button onClick={this.exportImage}>
                                            Image
                                        </Button>
                                    </Button.Group>
                                </List.Item>
                                <List.Item>
                                    <List.Header><Icon name="save" /> Save Image</List.Header>
                                    <Button.Group widths="1">
                                        <Button onClick={this.showCommitModal}>
                                            Save
                                        </Button>
                                    </Button.Group>
                                    <Modal
                                        size="small"
                                        open={this.state.modalCommitImage}
                                        onClose={this.closeCommitModal}
                                    >
                                        <Header icon="plus square outline" content="Save Image" />
                                        <Modal.Content>
                                        <Form>
                                            <Form.Group>
                                                <Form.Input
                                                    label="Name"
                                                    required={true}
                                                    name="Name"
                                                    placeholder="Name"
                                                    value={this.state.nameCommit}
                                                    width={12}
                                                    onChange={this.handleChangeNameCommit}
                                                />
                                                <Form.Input
                                                    label="Version"
                                                    required={true}
                                                    name="Version"
                                                    placeholder={this.state.versionBeforeCommit}
                                                    width={4}
                                                    onChange={this.handleChangeVersionCommit}
                                                />
                                            </Form.Group>
                                            <Form.Group inline={true}>
                                                <label>Privacy</label>
                                                <Form.Field
                                                    control={Radio}
                                                    label="Private"
                                                    value="private"
                                                    checked={this.state.privacyCommit === "private"}
                                                    onChange={this.handleChangeRadioCommit}
                                                />
                                                <Form.Field
                                                    control={Radio}
                                                    label="Public"
                                                    value="public"
                                                    checked={this.state.privacyCommit === "public"}
                                                    onChange={this.handleChangeRadioCommit}
                                                />
                                            </Form.Group>
                                        </Form>
                                        </Modal.Content>
                                        <Modal.Actions>
                                                <Button color="red" inverted={true} onClick={this.closeCommitModal}>
                                                    <Icon name="remove" /> Cancel
                                                </Button>
                                                <Button color="green" inverted={true} onClick={this.commitImage}>
                                                    <Icon name="checkmark"/> Save
                                                </Button>
                                        </Modal.Actions>
                                    </Modal>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
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
                    <Grid.Row columns={3}>
                    <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={14}>
                            <h3>
                                <small>Share environment </small>
                                <Icon 
                                    color="green" 
                                    name="plus square outline" 
                                    onClick={this.showAddShareModal} 
                                    style={{ cursor: "pointer" }}
                                />
                            </h3>
                            <Modal
                                size="small"
                                open={this.state.modalAddShare}
                                onClose={this.closeAddShareModal}
                            >
                                <Header icon="plus square outline" content="Add User" />
                                <Modal.Content>
                                {this.state.usersNotShared === 0 ?
                                    <p>You have shared your environment with everyone</p>
                                : 
                                <Table size="small">
                                    <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Action</Table.HeaderCell>
                                    </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {bodyNotShared}
                                    </Table.Body>
                                </Table>
                                }
                                </Modal.Content>
                            </Modal>
                            {this.state.usersShared ?
                                <Table size="small">
                                    <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>ReadOnly</Table.HeaderCell>
                                        <Table.HeaderCell>Action</Table.HeaderCell>
                                    </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {body}
                                    </Table.Body>
                                </Table>
                            : 
                            <p>Your environment is not shared with anyone.</p>
                            }
                        </Grid.Column>
                        <Grid.Column width={1}></Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

}
export default DashDocker;
