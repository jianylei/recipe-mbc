import { Outlet } from 'react-router-dom';
import LayoutHeader from './LayoutHeader';

/**
 * @desc - Layout component
 */
const Layout = () => {
  return (
    <div>
      <LayoutHeader />
      <Outlet />
    </div>
  );
};

export default Layout;
