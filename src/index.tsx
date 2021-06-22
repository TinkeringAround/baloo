import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'styled-components';

// Styles
import theme from './styles/theme';
import './styles/index.css';

// Components
import Layout from "./components/layout";
import Header from "./components/header";
import Content from "./components/content";

const App: FC = () => (
    <ThemeProvider theme={theme}>
        <Layout>
            <Header/>
            <Content/>
        </Layout>
    </ThemeProvider>
)

ReactDOM.render(<App/>, document.getElementById('root'));
