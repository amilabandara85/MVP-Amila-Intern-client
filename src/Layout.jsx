import { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './components/navmenu/navmenu';


export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu />
                <Container tag="main">

                </Container>
            </div>
        );
    }
}
