import './App.css';
import { ItemConsole } from './components/item/ItemConsole';
import { UserConsole } from './components/user/UserConsole';
import { RequestConsole } from './components/request/RequestConsole';
import {NotFound} from './components/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { AuthProvider } from './components/auth/AuthProvider';
import NavB from './components/NavB';

function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <NavB />
        <Routes>
          <Route path="/" element={<ItemConsole />} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/item" element={<ItemConsole />} />
          <Route path="/user" element={<UserConsole />} />
          <Route path="/request" element={<RequestConsole />} />
          <Route path="/*" element={<NotFound />} />
        </Routes >
      </AuthProvider> 
      </BrowserRouter >
    </>
  );
}

export default App;
