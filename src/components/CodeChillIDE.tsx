import * as React from "react";
import AuthService from "../AuthService";
import withAuth from "./withAuth";

class CodeChillIDE extends React.Component<any, any> {
    Auth: AuthService;
    port: number;
    constructor(props: any) {
        super(props);
        this.Auth = new AuthService();
        this.port = this.props.user.dockers[0].port;
    }

    componentDidMount() {
        this.Auth.startDocker(this.props.user.dockers[0].name).then((res) => {
            console.log(res);
        });
    }

    componentWillUnmount() {
        this.Auth.stopDocker(this.props.user.dockers[0].name).then((res) => {
            console.log(res);
        });
    }

    render() {
        let height = window.innerHeight - 61;
        console.log(`${(window as any).env.docker}:${this.props.user.dockers[0].port}`);
        return (
            <iframe
                src={`${(window as any).env.docker}:${this.props.user.dockers[0].port}`}
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