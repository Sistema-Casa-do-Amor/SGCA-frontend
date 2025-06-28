import { createContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    username: string;
  } | null;
  token: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
  isLoading: boolean;
}

// criando o context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// criando o provider para envolver sua aplicação
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Começa como true para verificar o token

  // Efeito para verificar o token no localStorage/sessionStorage ao carregar a aplicação
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('authUsername');
    if (storedToken && storedUsername) {
      // Aqui você poderia, opcionalmente, validar o token com uma API
      // Por simplicidade, vamos apenas assumir que é válido
      setToken(storedToken);
      setUser({ username: storedUsername });
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, username: string) => {
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('authUsername', username);
    setToken(newToken);
    setUser({ username });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUsername');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // fornecer o valor do contexto para os componentes filhos
  const contextValue = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };