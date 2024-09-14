import Sidebar from '../components/Sidebar';
import Map from '../components/Map';

import styles from './AppLayout.module.css';
import { useAuth } from '../contexts/FakeAuthContext';
import User from '../components/User';

function AppLayout() {
   const { isAuthenticated } = useAuth();

   return (
      <div className={styles.app}>
         {isAuthenticated ? (
            <>
               <Sidebar />
               <Map />
               <User />
            </>
         ) : (
            ''
         )}
      </div>
   );
}

export default AppLayout;
