import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './auth';

function AdminRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  if (!user || user.role !== 'Admin') {
    return <Redirect to="/" />;
  }

  return (
    <Route {...rest} render={(props) => <Component {...props} />} />
  );
}

export default AdminRoute;
