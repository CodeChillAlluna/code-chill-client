import * as React from "react";
import { Icon, Accordion, Segment, Container } from "semantic-ui-react";

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
            <div
                style={{
                    right: 8,
                    bottom: 8,
                    position: "fixed",
                    zIndex: 99
                }}
            >
                {
                    this.state.menuOpen ?
                        <Segment color="orange" inverted={true} raised={true} compact={true} size="small">
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
                                    When you are in you IDE, right click <br/>
                                    the file or the folder and click download.
                                </Accordion.Content>

                                <Accordion.Content active={this.state.activeIndex === 0}>
                                    You can simply drag any file or folder <br/>
                                    from your file explorer down into your <br/>
                                    environment.
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
                                    Below your environment, you can manage <br/>
                                    users who have access to it.
                                </Accordion.Content>

                                <Accordion.Content active={this.state.activeIndex === 1}>
                                    You can give them access for a limited <br/>
                                    time with different rights to it (read <br/>
                                    only...).
                                </Accordion.Content>

                                <Accordion.Title
                                    active={this.state.activeIndex === 2}
                                    index={2}
                                    onClick={this.handleClickAcc}
                                >
                                <Icon name="dropdown" />
                                    How do I create an image?
                                </Accordion.Title>

                                <Accordion.Content active={this.state.activeIndex === 2}>
                                    If you want to create an image of your <br/>
                                    environment to make environments based <br/>
                                    on yours, click on "Save Image".
                                </Accordion.Content>

                                <Accordion.Content active={this.state.activeIndex === 2}>
                                    If your image is an update of the one <br/>
                                    being currently used, leave it under the <br/>
                                    same name and increment the version.
                                </Accordion.Content>

                                <Accordion.Content active={this.state.activeIndex === 2}>
                                    You can choose to make this image public <br/>
                                    or private.
                                </Accordion.Content>

                                <Accordion.Title
                                    active={this.state.activeIndex === 3}
                                    index={3}
                                    onClick={this.handleClickAcc}
                                >
                                <Icon name="dropdown" />
                                    So, what exactly is the difference between <br/>
                                    an image and an environment?
                                </Accordion.Title>

                                <Accordion.Content active={this.state.activeIndex === 3}>
                                    Think of the environment as your computer, <br/>
                                    with files and folders.
                                </Accordion.Content>

                                <Accordion.Content active={this.state.activeIndex === 3}>
                                    The image is the OS and contains the installed <br/>
                                    softwares.
                                </Accordion.Content>

                                <Accordion.Title
                                    active={this.state.activeIndex === 4}
                                    index={4}
                                    onClick={this.handleClickAcc}
                                >
                                <Icon name="dropdown" />
                                    My IDE is not showing, what do I do?
                                </Accordion.Title>

                                <Accordion.Content active={this.state.activeIndex === 4}>
                                    If your IDE is not showing, refresh the page <br/>
                                    and wait a little.
                                </Accordion.Content>
                            </Accordion>
                        </Segment>
                    : null
                }
                <Container fluid={true} textAlign="right">
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
            </div>
        );
    }
}