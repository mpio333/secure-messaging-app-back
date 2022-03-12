import { createContext, useContext, useState } from 'react';
import { Auth } from '../types/auth';

const initialAuth = { isAuthenticated: false, redirectPath: '/' };
export const AuthContext = createContext<[Auth, (session: Auth) => void]>([initialAuth, () => {}]);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC = props => {
  const [authState, setAuthState] = useState(initialAuth);
  const defaultAuthContext: [Auth, typeof setAuthState] = [authState, setAuthState];

  return <AuthContext.Provider value={defaultAuthContext}>{props.children}</AuthContext.Provider>;
};
