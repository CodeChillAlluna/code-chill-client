import * as React from "react";
import { Rail, Sticky, Icon, Accordion, Segment, Container } from "semantic-ui-react";

export default class HelpButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            "menuOpen": false,
            "activeIndex": -1
        };
    }

    interactHelpMenu = () => this.setState({ menuOpen: !this.state.menuOpen });
    
    handleClickAcc = (e, titleProps) => {
        const { index }: any = titleProps;
        const newIndex: number = this.state.activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    }

    render () {
        return (
            <Rail position="right">
                <Sticky offset={70}>
                    <Container textAlign="right">
                        <Icon
                            inverted={!this.state.menuOpen}
                            circular={true}
                            name="question"
                            color="orange"
                            size="big"
                            onClick={this.interactHelpMenu}
                            style={{ cursor: "pointer" }}
                        />
                    </Container>
                {
                    this.state.menuOpen ?
                        <Segment color="orange" inverted={true}>
                            <Accordion inverted={true}>
                                <Accordion.Title
                                    active={this.state.activeIndex === 0}
                                    index={0}
                                    onClick={this.handleClickAcc}
                                >
                                    <Icon name="dropdown" />
                                    Download/Uploading files in my environment
                                </Accordion.Title>

                                <Accordion.Content active={this.state.activeIndex === 0}>
                                    Right click the file or the folder and click download.
                                </Accordion.Content>

                                <Accordion.Content active={this.state.activeIndex === 0}>
                                    You can simply drag any file or folder from
                                    your file explorer down into your environment.
                                </Accordion.Content>

                                <Accordion.Title
                                    active={this.state.activeIndex === 1}
                                    index={1}
                                    onClick={this.handleClickAcc}
                                >
                                    <Icon name="dropdown" />
                                    How do I share my environment with others?
                                </Accordion.Title>

                                <Accordion.Content active={this.state.activeIndex === 1}>
                                    As you create your environment, you can choose
                                    who to share your environment with.
                                </Accordion.Content>
                            </Accordion>
                        </Segment>
                    : null
                }
                </Sticky>
            </Rail>
        );
    }
}