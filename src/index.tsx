import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'styled-components';

// Styles
import theme from './style/theme';
import './style/index.css';

// Store
import './store'

// Components
import Layout from "./component/layout";
import Header from "./component/header";
import Content from "./component/content";
import Current from "./component/current";
import Voltage from "./component/voltage";
import Temperature from "./component/temperature";
import Humidity from "./component/humidity";
import Power from "./component/power";

const App: FC = () => (
    <ThemeProvider theme={theme}>
        <Layout>
            <Header/>
            <Content>
                <Current/>
                <Voltage/>
                <Power/>
                <Temperature/>
                <Humidity/>
            </Content>
        </Layout>
    </ThemeProvider>
)

ReactDOM.render(<App/>, document.getElementById('root'));
