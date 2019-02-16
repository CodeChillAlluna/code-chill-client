import * as React from "react";
import AuthService from "../../AuthService";
import { Grid, Header, Tab, Divider } from "semantic-ui-react";
import withAuth from "../withAuth";
import DashImage from "./DashImage";

class DashImageMenu extends React.Component<any, any> {
    Auth: AuthService;

    constructor(props: any) {
        super(props);

        this.state = {
            "images": []
        };
        
        this.Auth = new AuthService();
        this.Auth.getUserImages().then((res) => {
            this.setState({ images: res.content.images });
        });
    }

    render() {
        let panes = [];
        for (let image of this.state.images) {
            panes.push({ 
                menuItem: `${image.id}`, 
                render: () => {
                    return (
                        <Tab.Pane>
                            <DashImage
                                key={image.id}
                                Auth={this.Auth}
                                parentProps={this.props}
                                image={image}
                            />
                        </Tab.Pane>
                    );
                }
            });
        }

        return (
            <div>
                <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header as="h1">Images</Header>
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
export default withAuth(DashImageMenu);
