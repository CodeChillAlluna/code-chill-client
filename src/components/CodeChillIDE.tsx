import * as React from "react";
import AuthService from "../AuthService";
import withAuth from "./withAuth";

class CodeChillIDE extends React.Component<any, any> {
    Auth: AuthService;
    docker: object;
    src: string;

    constructor(props: any) {
        super(props);
        this.Auth = new AuthService();
        this.docker = this.props.user.dockers.find(
            (docker: any) => docker.id === Number(this.props.props.match.params.id)
        );
        this.src = `${(window as any).env.docker}:${this.docker["port"]}`;
    }

    render() {
        let height = window.innerHeight - 61;
        return (
            <iframe
                src={this.src}
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