import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

// Styles
import theme from './style/theme';
import './style/index.css';

// Context
import { BalooState, BalooStateContext, INITIAL_STATE } from './context';

// Hooks
import { useData } from './hook/useData';

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
import Overview from './component/overview';

const App: FC = () => {
  const { data, error, loading, fetchData } = useData();
  const [state, setState] = useState<BalooState>(INITIAL_STATE);

  useEffect(() => {
    data && setState(data);
  }, [data, setState]);

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
          <BalooStateContext.Provider value={state}>
            <Content>
              <Overview />
              <Capacity />
              <Voltage />
              <Current />
              <Power />
              <Temperature />
              <Humidity />
            </Content>
          </BalooStateContext.Provider>
        </If>
      </Layout>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
