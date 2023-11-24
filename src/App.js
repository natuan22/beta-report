import './App.css';
import { Fragment } from 'react';
import { routes } from './app/route';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {

  const mappedRoute = routes.map(({ path, component: Component }) => {
    return <Route key={path} path={path} element={<Component />} ></Route>
  })

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          {mappedRoute}
        </Routes>
      </BrowserRouter>

    </Fragment>
  );
}

export default App;
