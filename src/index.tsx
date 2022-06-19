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
import Reload from './component/reload';
import Logo from './component/logo';
import Loading from './component/loading';
import If from './component/if';
import Overview from './component/overview';
import Logs from './component/logs';
import LogDialog from './component/log-dialog';
import Reset from './component/reset';

// Utils
import { toBalooState } from './context/model';

const App: FC = () => {
  const { data, error, loading, fetchData, consume } = useData();
  const [state, setState] = useState<BalooState>(INITIAL_STATE);
  const [showLogs, setShowLogs] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setState(toBalooState(data, state));
      consume();
    }
  }, [state, consume, data, setState]);

  useEffect(() => {
    setInterval(() => {
      fetchData();
    }, 20000);
  }, [fetchData]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <If condition={loading}>
          <Loading isHealthy={!error} />
        </If>
        <Header isHealthy={!error}>
          <Logo />
          <Reset disabled={loading} isHealthy={!error} />
          <Logs showLogs={() => setShowLogs(true)} isHealthy={!error} />
          <Reload reload={fetchData} disabled={loading} isHealthy={!error} />
        </Header>
        <If condition={!error}>
          <BalooStateContext.Provider value={state}>
            <Overview />
            <If condition={showLogs}>
              <LogDialog setState={setState} hide={() => setShowLogs(false)} />
            </If>
          </BalooStateContext.Provider>
        </If>
      </Layout>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
