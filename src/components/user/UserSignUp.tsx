import * as React from "react";
import NavBar from "../NavBar";
import AuthService from "../../AuthService";
import { Button, Form, Grid, Header, Image, Message, Segment, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import { HOME, LOGIN } from "../../Routes";

const logo = require("../../resources/logocodeandchill.png");

export default class UserSignUp extends React.Component<any, any> {

    Auth: AuthService;

    constructor(props?: any, context?: any) {
        super(props, context);
        this.Auth = new AuthService();
        this.state = {
            "user": {
                "username": "",
                "email": "",
                "firstname": "",
                "lastname": "",
                "password": "",
                "password2": "",
                "enabled": true,
                "lastPasswordResetDate": new Date().getTime()
            },
            "message": false,
            "usernameSize": false,
            "usernameChar": false,
            "usernameUsed": false,
            "emailSize": false,
            "emailUsed": false,
            "firstnameSize": false,
            "lastnameSize": false,
            "passwordSize": false,
            "passwordChar": false,
            "passwordcCompare": false,
            "errCheck": false,
        };

        this.handleChangeUN = this.handleChangeUN.bind(this);
        this.handleChangeM = this.handleChangeM.bind(this);
        this.handleChangeFN = this.handleChangeFN.bind(this);
        this.handleChangeLN = this.handleChangeLN.bind(this);
        this.handleChangeP = this.handleChangeP.bind(this);
        this.handleChangePC = this.handleChangePC.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.checkSize = this.checkSize.bind(this);
    }

    componentWillMount() {
        if (this.Auth.loggedIn()) {
            this.props.history.replace(formatRoute(HOME));
        }
    }

    handleChangeUN(e: any) {
        var newState = Object.assign({}, this.state);
        newState.user[e.target.name] = e.target.value;
        this.setState(newState);
        
        this.setState({usernameUsed: false});

        if (this.checkSize(5, 100, e.target.value.length)) {
            this.setState({usernameSize: false});
        } else {
            this.setState({usernameSize: true});
        }
        if (!/\W/.test(e.target.value)) {
            this.setState({usernameChar: false});
        } else {
            this.setState({usernameChar: true});
        }
    }

    handleChangeM(e: any) {
        var newState = Object.assign({}, this.state);
        newState.user[e.target.name] = e.target.value;
        this.setState(newState);

        this.setState({emailUsed: false});

        if (this.checkSize(4, 100, e.target.value.length)) {
            this.setState({emailSize: false});
        } else {
            this.setState({emailSize: true});
        }
    }

    handleChangeFN(e: any) {
        var newState = Object.assign({}, this.state);
        newState.user[e.target.name] = e.target.value;
        this.setState(newState);

        if (this.checkSize(3, 100, e.target.value.length)) {
            this.setState({firstnameSize: false});
        } else {
            this.setState({firstnameSize: true});
        }
    }

    handleChangeLN(e: any) {
        var newState = Object.assign({}, this.state);
        newState.user[e.target.name] = e.target.value;
        this.setState(newState);

        if (this.checkSize(3, 100, e.target.value.length)) {
            this.setState({lastnameSize: false});
        } else {
            this.setState({lastnameSize: true});
        }
    }

    handleChangeP(e: any) {
        var newState = Object.assign({}, this.state);
        newState.user[e.target.name] = e.target.value;
        this.setState(newState);

        if (this.checkSize(4, 100, e.target.value.length)) {
            this.setState({passwordSize: false});
        } else {
            this.setState({passwordSize: true});
        }
        if (/\s/.test(e.target.value)
            || /'/.test(e.target.value)
            || /"/.test(e.target.value)
            || /\\/.test(e.target.value)
            || /\//.test(e.target.value)) {
            this.setState({passwordChar: true});
        } else {
            this.setState({passwordChar: false});
        }
        if (typeof(this.state.user.password2) !== "undefined") {
            if (e.target.value === this.state.user.password2) {
                this.setState({passwordcCompare: false});
            } else {
                this.setState({passwordcCompare: true});
            }
        }
    }

    handleChangePC(e: any) {
        var newState = Object.assign({}, this.state);
        newState.user[e.target.name] = e.target.value;
        this.setState(newState);
        
        if (this.state.user.password === e.target.value) {
            this.setState({passwordcCompare: false});
        } else {
            this.setState({passwordcCompare: true});
        }
    }

    render() {
        if (this.state.message) {
            return(
                <NavBar history={this.props.history} >
                    {this.state.message}
                </NavBar>
            );
        } else {
            return(
                <NavBar history={this.props.history} >
                    <Grid
                        textAlign="center"
                        style={{ height: "100%" }}
                        verticalAlign="middle"
                    >
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as="h2" color="teal" textAlign="center">
                                <Image src={logo} />
                            {" "}Register your account
                            </Header>
                            <Form
                                error={true}
                                success={true}
                                size="large"
                                onSubmit={this.handleFormSubmit}
                            >
                                <Segment stacked={true}>
                                    {
                                        this.state.errCheck ?
                                        <Label attached="bottom" color="red">
                                            You still have some errors!
                                        </Label>
                                        : null
                                    }
                                    <Form.Input
                                        error={
                                            (this.state.usernameSize
                                            || this.state.usernameChar
                                            || this.state.usernameUsed)
                                        }
                                        required={true}
                                        max={100}
                                        fluid={true}
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="Username"
                                        name="username"
                                        onChange={this.handleChangeUN}
                                    />
                                    {
                                        (this.state.usernameSize || this.state.usernameChar || this.state.usernameUsed)
                                        ? <Label basic={true} color="red" pointing={true}>
                                            {
                                                this.state.usernameSize
                                                ? "Username must be 5 characters or more"
                                                : null
                                            }
                                            {
                                                this.state.usernameSize && this.state.usernameChar
                                                ? <br/>
                                                : null
                                            }
                                            {
                                                this.state.usernameChar
                                                ? "Username must be composed of A-Z, a-z, 0-9 or '_'"
                                                : null
                                            }
                                            {
                                                this.state.usernameUsed
                                                ? "Username is already in use"
                                                : null
                                            }
                                        </Label>
                                        :
                                        null
                                    }
                                    <Form.Input
                                        error={this.state.emailSize || this.state.emailUsed}
                                        required={true}
                                        max={100}
                                        fluid={true}
                                        icon="envelope"
                                        iconPosition="left"
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        onChange={this.handleChangeM}
                                    />
                                    {
                                        this.state.emailSize ?
                                        <Label basic={true} color="red" pointing={true}>
                                            Email is invalid
                                        </Label>
                                        : null
                                    }
                                    {
                                        this.state.emailUsed ?
                                        <Label basic={true} color="red" pointing={true}>
                                            Email is already in use
                                        </Label>
                                        : null
                                    }
                                    <Form.Input
                                        error={this.state.firstnameSize}
                                        required={true}
                                        max={100}
                                        fluid={true}
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="First name"
                                        name="firstname"
                                        onChange={this.handleChangeFN}
                                    />
                                    {
                                        this.state.firstnameSize ?
                                        <Label basic={true} color="red" pointing={true}>
                                            Firstname must be 3 characters or more
                                        </Label>
                                        : null
                                    }
                                    <Form.Input
                                        error={this.state.lastnameSize}
                                        required={true}
                                        max={100}
                                        fluid={true}
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="Last name"
                                        name="lastname"
                                        onChange={this.handleChangeLN}
                                    />
                                    {
                                        this.state.lastnameSize ?
                                        <Label basic={true} color="red" pointing={true}>
                                            Lastname must be 3 characters or more
                                        </Label>
                                        : null
                                    }
                                    <Form.Input
                                        error={this.state.passwordSize || this.state.passwordChar}
                                        required={true}
                                        max={100}
                                        fluid={true}
                                        icon="lock"
                                        iconPosition="left"
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        onChange={this.handleChangeP}
                                    />
                                    {
                                        this.state.passwordSize || this.state.passwordChar ?
                                        <Label basic={true} color="red" pointing={true}>
                                        {
                                            this.state.passwordSize
                                            ? "Password must be 4 characters or more"
                                            : null
                                        }
                                        {
                                            this.state.passwordSize && this.state.passwordChar
                                            ? <br/>
                                            : null
                                        }
                                        {
                                            this.state.passwordChar
                                            ? "No whitespace, ', \", / or \\ allowed"
                                            : null
                                        }
                                        </Label>
                                        : null
                                    }
                                    <Form.Input
                                        error={this.state.passwordcCompare}
                                        required={true}
                                        max={100}
                                        fluid={true}
                                        icon="lock"
                                        iconPosition="left"
                                        placeholder="Confirm password"
                                        type="password"
                                        name="password2"
                                        onChange={this.handleChangePC}
                                    />

                                    <Button
                                        color="teal"
                                        fluid={true}
                                        size="large"
                                        type="submit"
                                    >
                                        Sign up
                                    </Button>
                                </Segment>
                            </Form>
                            <Message>
                                <p>Already have an account? <Link to={formatRoute(LOGIN)}>Login</Link></p>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </NavBar>
            );
        }
    }

    private checkSize(min: number, max: number, size: number) {
        if (size < min) { return false; } 
        if (size > max) { return false; }
        return true;
    }

    private checkErr() {
        if (this.state.usernameSize
            || this.state.usernameChar
            || this.state.emailSize
            || this.state.firstnameSize
            || this.state.lastnameSize
            || this.state.passwordSize
            || this.state.passwordChar
            || this.state.passwordcCompare) {
            return true;
        }
        return false;
    }

    private handleFormSubmit(e: any) {
        e.preventDefault();
        const user = this.state.user;

        if (this.checkErr()) {
            this.setState({errCheck: true});
        } else {
            this.setState({errCheck: false});
            this.Auth.createAccount(user).then((res) => {
                if (res.status === 400) {
                    if (res.content.email !== "success") {
                        this.setState({emailUsed: true});
                    }
                    if (res.content.username !== "success") {
                        this.setState({usernameUsed: true});
                    }
                } else {
                    this.setState(
                        {
                            "message": (
                                <Message positive={true}>
                                    <Message.Header>Your user registration was successful</Message.Header>
                                    <p>You may now <Link to={formatRoute(LOGIN)}>log-in </Link>
                                    with the username you have chosen</p>
                                </Message>
                            )
                        }
                    );
                }
            });
        }
    }
}