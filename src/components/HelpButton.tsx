import * as React from "react";
import { Rail, Sticky, Icon, Accordion, Segment } from "semantic-ui-react";

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
            <Rail position="left">
                <Sticky offset={70}>
                    <Icon
                        inverted={!this.state.menuOpen}
                        circular={true}
                        name="question"
                        color="orange"
                        size="big"
                        onClick={this.interactHelpMenu}
                        style={{ cursor: "pointer" }}
                    />
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
                                    When you are in you IDE, right click the file or the folder and click download.
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
                                    Below your environment, you can manage users who have access to it.
                                </Accordion.Content>

                                <Accordion.Content active={this.state.activeIndex === 1}>
                                    You can give them access for a limited time with different rights to it
                                    (read only...).
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
                                    If you want to create an image of your environment to make environments 
                                    based on yours, click on "Save Image".
                                </Accordion.Content>

                                <Accordion.Content active={this.state.activeIndex === 2}>
                                    If your image is an update of the one being currently used, 
                                    leave it under the same name and increment the version.
                                </Accordion.Content>

                                <Accordion.Content active={this.state.activeIndex === 2}>
                                    You can choose to make this image public or private.
                                </Accordion.Content>

                                <Accordion.Title
                                    active={this.state.activeIndex === 3}
                                    index={3}
                                    onClick={this.handleClickAcc}
                                >
                                    <Icon name="dropdown" />
                                    So, what exactly is the difference between an image and an environment?
                                </Accordion.Title>

                                <Accordion.Content active={this.state.activeIndex === 3}>
                                    Think of the environment as your computer, with files and folders.
                                </Accordion.Content>

                                <Accordion.Content active={this.state.activeIndex === 3}>
                                    The image is the OS and contains the installed softwares.
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