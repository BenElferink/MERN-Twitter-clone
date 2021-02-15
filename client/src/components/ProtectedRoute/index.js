import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ Private, Public, ...rest }) {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      // return a Route
      // which conditionally renders on of the following
      render={(props) => {
        if (isLoggedIn) {
          return <Private />;
        } else {
          return <Public />;
        }
      }}
    />
  );
}
