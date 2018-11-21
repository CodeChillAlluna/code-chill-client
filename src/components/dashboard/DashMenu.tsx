import * as React from "react";
import AuthService from "../../AuthService";
import { Grid, Header, Container, Icon, Tab, Divider, Modal, Button, Input } from "semantic-ui-react";
import withAuth from "../withAuth";
import DashDocker from "./DashDocker";
import { toast } from "react-toastify";
import * as ToastConfig from "../../constants/toast.config";

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
            "activeIndex": 0,
            "modalAddValidation": false,
            "addDockerName": "",
        };
        this.Auth = new AuthService();
        this.addDocker = this.addDocker.bind(this);
        this.dockerDeleted = this.dockerDeleted.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addDocker() {
        if (this.state.addDockerName === "") {
            toast("Name is required to continue.", ToastConfig.WARNING);
        } else if (/\W/.test(this.state.addDockerName)) {
            toast("Only A-Z, a-z, 0-9 and '_' are accepted.", ToastConfig.WARNING);
        } else {
            this.Auth.createDocker(this.state.addDockerName).then((res) => {
                toast(res.content.message, res.content.toast);
                delete res.content.message;
                let updatedDockers = this.state.dockers;
                updatedDockers.push(res.content);
                this.setState({ dockers: updatedDockers });
                this.closeAddModal();
            });
        }
    }

    dockerDeleted() {
        this.Auth.getUserInfos().then((infos) => {
            this.setState({ dockers: infos.content.dockers });
        });
    }

    showAddModal = () => this.setState({ modalAddValidation: true });
    closeAddModal = () => this.setState({ modalAddValidation: false });

    handleChange(e: any) {
        this.setState({addDockerName: e.target.value});
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
                                key={docker.name}
                                docker={docker} 
                                Auth={this.Auth} 
                                onDockerDelete={this.dockerDeleted}
                                parentProps={this.props}
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
                                <small>Add new environment </small>
                                <Icon 
                                    color="green" 
                                    name="plus square outline" 
                                    onClick={this.showAddModal} 
                                    style={{ cursor: "pointer" }}
                                />
                                <Modal
                                    basic={true} 
                                    size="small"
                                    open={this.state.modalAddValidation}
                                    onClose={this.closeAddModal}
                                >
                                    <Header icon="plus square outline" content="Add environment?" />
                                    <Modal.Content>
                                        <p>
                                        Accepted characters: A-Z, a-z, 0-9 and '_'.
                                        </p>
                                        <Input
                                            required={true}
                                            name="addDockerName"
                                            placeholder="New Environment name"
                                            onChange={this.handleChange}
                                        />
                                        <br/>
                                        <p>
                                        Would you like to add this new environment?
                                        </p>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color="red" inverted={true} onClick={this.closeAddModal}>
                                            <Icon name="remove" /> Close
                                        </Button>
                                        <Button color="green" inverted={true} onClick={this.addDocker}>
                                            <Icon name="checkmark"/> Yes
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
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
