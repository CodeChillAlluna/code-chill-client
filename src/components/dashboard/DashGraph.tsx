import * as React from "react";
import AuthService from "../../AuthService";
import withAuth from "../withAuth";
import { ResponsiveStream } from "@nivo/stream";

class DashGraph extends React.Component<any, any> {
    Auth: AuthService;
    userUpdate: Object;
    constructor(props: any) {
        super(props);
        this.state = {
            "firstname": this.props.user.firstname,
            "lastname": this.props.user.lastname,
            "email": this.props.user.email,
            "message": "",
        };
        this.Auth = new AuthService();
    }

    render() {
        return (
            <div style={{ height: 120, width: "auto" }}>
                <ResponsiveStream
                    data={this.props.props.datavalues}
                    keys={this.props.props.dataname}
                    margin={{
                        "top": 10,
                        "right": 70,
                        "bottom": 10,
                        "left": 2
                    }}
                    axisRight={{
                        "orient": "right",
                        "tickSize": 0,
                        "tickPadding": 3,
                        "tickRotation": 0,
                        "legend": "%used",
                        "legendOffset": 39,
                        "min": 0,
                        "max": 100
                    }}
                    enableGridX={false}
                    enableGridY={true}
                    offsetType="none"
                    colors={this.props.props.graphcolor}
                    fillOpacity={0.85}
                    borderColor="#000"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={[
                        {
                            "anchor": "bottom-right",
                            "direction": "column",
                            "translateX": 100,
                            "itemWidth": 80,
                            "itemHeight": 20,
                            "itemTextColor": "#999",
                            "symbolSize": 12,
                            "symbolShape": "circle",
                            "effects": [
                                {
                                    "on": "hover",
                                    "style": {
                                        "itemTextColor": "#000"
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        );
    }

}
export default withAuth(DashGraph);
