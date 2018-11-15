import * as React from "react";
import AuthService from "../AuthService";
import withAuth from "./withAuth";
import { toast } from "react-toastify";
import { Embed } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";

class CodeChillIDE extends React.Component<any, any> {
    Auth: AuthService;
    docker: object;
    
    state = {
        started: false,
        reloadIframe: true
    };

    constructor(props: any) {
        super(props);
        this.Auth = new AuthService();
        this.docker = this.props.user.dockers.find(
            (docker: any) => docker.id === Number(this.props.props.match.params.id)
        );
    }

    componentDidMount() {
        if (!!this.docker) {
            this.Auth.startDocker(this.docker["id"]).then((res) => {
                if (res.status === 204) {
                    toast(res.content.message, res.content.toast);
                    return true;
                } else {
                    this.setState({ started: true, reloadIframe: false });
                    return false;
                }
            }).then((res) => {
                if (res) {
                    setTimeout(
                        () => { 
                            this.setState({ started: true, reloadIframe: true });
                        }, 
                        1500
                    );
                }
            });
        } 
    } 

    render() {
        if (!this.docker) {
            this.props.props.history.replace("/NotFound");
            return null;
        } else {
            if (this.state.started) {
                const src = `${(window as any).env.docker}:${this.docker["port"]}`;
                if (this.state.reloadIframe) {
                    return (
                        <Embed
                            url={src}
                            icon="folder outline"
                        />
                    );
                } else {
                    return (
                        <Embed
                            url={src}
                            icon="folder outline"
                        />
                    );
                }
            } else {
                return <div><Loader active={true} inline={true}>Loading env...</Loader></div>;
            }
        }
    }
}

export default withAuth(CodeChillIDE);