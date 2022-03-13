import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

// Styles
import theme from './style/theme';
import './style/index.css';

// Hooks
import { useData } from './hook/useData';
import { Breakpoint, useBreakpoint } from './hook/useBreakpoint';

// Store
import './store';
import { useBaloo } from './store';

// Components
import Layout from './component/layout';
import Header from './component/header';
import Content from './component/content';
import Voltage from './component/voltage';
import Temperature from './component/temperature';
import Humidity from './component/humidity';
import Power from './component/power';
import Reload from './component/reload';
import Logo from './component/logo';
import Loading from './component/loading';
import Current from './component/current';
import Capacity from './component/capacity';
import If from './component/if';
import OverviewGraph from './component/overviewGraph';
import OverviewList from './component/overviewList';

const App: FC = () => {
  const { data, error, loading, fetchData } = useData();
  const breakPoint = useBreakpoint();

  useEffect(() => {
    data && useBaloo.setState(data);
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <If condition={loading}>
          <Loading isHealthy={!error} />
        </If>
        <Header isHealthy={!error}>
          <Logo />
          <Reload reload={fetchData} disabled={loading} isHealthy={!error} />
        </Header>
        <If condition={!!data && !error}>
          <Content>
            <If condition={breakPoint >= Breakpoint.m}>
              <OverviewGraph />
            </If>
            <If condition={breakPoint < Breakpoint.m}>
              <OverviewList />
            </If>
            <Capacity />
            <Voltage />
            <Current />
            <Power />
            <Temperature />
            <Humidity />
          </Content>
        </If>
      </Layout>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
