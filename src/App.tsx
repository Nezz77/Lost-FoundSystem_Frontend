import './App.css';
import NavB from './components/NavB';
import { ItemConsole } from './components/item/ItemConsole';
import { UserConsole } from './components/user/UserConsole';
import { RequestConsole } from './components/request/RequestConsole';
import {NotFound} from './components/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavB />
        <Routes>
          <Route path="/" element={<ItemConsole />} />
          <Route path="/item" element={<ItemConsole />} />
          <Route path="/user" element={<UserConsole />} />
          <Route path="/request" element={<RequestConsole />} />
          <Route path="/*" element={<NotFound />} />
        </Routes >
      </BrowserRouter >
    </>
  );
}

export default App;
