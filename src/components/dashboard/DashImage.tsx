import * as React from "react";
import { Grid, List, Header, Form, Radio } from "semantic-ui-react";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
// import { formatRoute } from "react-router-named-routes";
// import * as ToastConfig from "../../constants/toast.config";

class DashImage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            "radioPrivacy" : this.props.image.privacy === true ? "private" : "public"
        };
    }

    handleChangeRadio = (e: any, radio: any) => {
        this.setState({ radioPrivacy: radio.value });
        let privacy = radio.value === "private" ? true : false;
        this.props.Auth.changePrivacy(this.props.image.id, privacy).then((res) => {
            console.log(res);
            toast(res.content.message, res.content.toast);
        });
    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <div>
                                <Header as="h3">
                                    {this.props.image.name}
                                </Header>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <List>
                                <List.Item>
                                    <List.Header>Version</List.Header>
                                    {this.props.image.version}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Privacy</List.Header>
                                    <Form.Group grouped={true}>
                                        <Form.Field>
                                            <Radio
                                                label="Private"
                                                name="radioGroup"
                                                value="private"
                                                checked={this.state.radioPrivacy === "private"}
                                                onChange={this.handleChangeRadio}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label="Public"
                                                name="radioGroup"
                                                value="public"
                                                checked={this.state.radioPrivacy === "public"}
                                                onChange={this.handleChangeRadio}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

}
export default DashImage;