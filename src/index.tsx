import React, {FC, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'styled-components';

// Styles
import theme from './style/theme';
import './style/index.css';

// Hooks
import {useData} from "./hook/useData";

// Store
import './store';
import {useBaloo} from "./store";

// Components
import Layout from './component/layout';
import Header from './component/header';
import Content from './component/content';
import Current from './component/current';
import Voltage from './component/voltage';
import Temperature from './component/temperature';
import Humidity from './component/humidity';
import Power from './component/power';
import Reload from './component/reload';
import Logo from './component/logo';
import Health from "./component/health";

const App: FC = () => {
    const {data, error, loading, fetchData} = useData();

    useEffect(() => {
        data && useBaloo.setState(data);
    }, [data])

    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Header>
                    <Logo/>
                    <Reload reload={fetchData} disabled={loading}/>
                </Header>
                <Content>
                    <Health isHealthy={!error} loading={loading}/>
                    <Current/>
                    <Voltage/>
                    <Power/>
                    <Temperature/>
                    <Humidity/>
                </Content>
            </Layout>
        </ThemeProvider>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
