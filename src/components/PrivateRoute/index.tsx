// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) {
    // Você pode retornar um componente de carregamento, um spinner, ou null
    // dependendo da experiência do usuário que você deseja.
    return <div>Carregando autenticação...</div>;
  }

  // verificação se o usuário NÃO está autenticado
  if (!isAuthenticated) {
    // Redireciona para a página de login, passando o caminho atual
    // para que, após o login, o usuário possa ser redirecionado de volta.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // se o usuário estiver autenticado e não estiver mais carregando, renderizar os filhos
  return children;
};

export default PrivateRoute;