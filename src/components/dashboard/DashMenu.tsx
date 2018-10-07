import * as React from "react";
import AuthService from "../../AuthService";
import withAuth from "../withAuth";
import NavBar from "../NavBar";
import DashDocker from "./DashDocker";

class DashMenu extends React.Component<any, any> {
    Auth: AuthService;
    userUpdate: Object;
    constructor(props: any) {
        super(props);
        this.state = {
            "firstname": this.props.user.firstname,
            "lastname": this.props.user.lastname,
            "email": this.props.user.email,
            "message": ""
        };
        this.Auth = new AuthService();
    }

    render() {
        return (
            <NavBar history={this.props.history} user={this.props.user}>
                <DashDocker />
            </NavBar>
        );
    }

}
export default withAuth(DashMenu);
