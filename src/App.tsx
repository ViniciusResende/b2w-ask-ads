import { BrowserRouter, Route, Switch } from 'react-router-dom';
import cx from 'classnames';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';
import AdminRoom from './pages/AdminRoom';

import { AuthContextProvider } from './context/AuthContext';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isInDarkTheme } = useTheme();

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <div className={cx('app-wrapper', { dark: isInDarkTheme })}>
            <Route path='/' exact component={Home} />
            <Route path='/rooms/new' exact component={NewRoom} />
            <Route path='/rooms/:id' component={Room} />

            <Route path='/admin/rooms/:id' component={AdminRoom} />
          </div>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
