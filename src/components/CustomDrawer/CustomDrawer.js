import { Component } from "react";

export default class CustomDrawer extends Component {
    render() {
        <Drawer
            title="Basic Drawer"
            placement="left"
            closable={false}
            onClose={this.handleClosePreviewDrawer.bind(this)}
            visible={this.state.visiblePreviewDrawer}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    }
}