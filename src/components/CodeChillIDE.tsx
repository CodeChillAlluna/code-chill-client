import * as React from "react";
import AuthService from "../AuthService";
import withAuth from "./withAuth";
import { formatRoute } from "react-router-named-routes";
import { HOME } from "../Routes";

class CodeChillIDE extends React.Component<any, any> {
    Auth: AuthService;
    docker: object;
    src: string;

    constructor(props: any) {
        super(props);

        this.state = {
            "src": ""
        };

        this.Auth = new AuthService();
        this.docker = this.props.user.dockers.find(
            (docker: any) => docker.id === Number(this.props.props.match.params.id)
        );
        if (this.docker) {
            this.src = `${(window as any).env.docker}:${this.docker["port"]}`;
            this.setState({ "src": this.src });
        } else {
            this.Auth.checkUserHaveAccess(Number(this.props.props.match.params.id), this.props.user.id).then((res) => {
                if (res.status === 200) {
                    this.src = `${(window as any).env.docker}:${res.content.docker["port"]}`;
                    this.setState({ src: this.src });
                } else {
                    this.props.history.replace(formatRoute(HOME));
                }
            });
        }
    }

    render() {
        let height = window.innerHeight - 61;
        console.log(this.src);
        return (
            <iframe
                src={this.state.src}
                style={{
                    right: 0,
                    top: 61,
                    position: "absolute",
                    width: "100%",
                    height: `${height}px`
                }}
            />
        );
    }
}

export default withAuth(CodeChillIDE);