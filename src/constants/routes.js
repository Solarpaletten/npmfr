import Dashboard from '../pages/Dashboard';
import Clients from '../pages/Clients';
import Assets from '../pages/Assets';
import Cashier from '../pages/Cashier';
import Declaration from '../pages/Declaration';
import Documents from '../pages/Documents';
import GeneralLedger from '../pages/GeneralLedger';
import Personnel from '../pages/Personnel';
import Production from '../pages/Production';
import Salary from '../pages/Salary';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import Warehouse from '../pages/Warehouse';

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/clients', component: Clients },
  { path: '/warehouse', component: Warehouse },
  { path: '/general-ledger', component: GeneralLedger },
  { path: '/cashier', component: Cashier },
  { path: '/reports', component: Reports },
  { path: '/personnel', component: Personnel },
  { path: '/production', component: Production },
  { path: '/assets', component: Assets },
  { path: '/documents', component: Documents },
  { path: '/salary', component: Salary },
  { path: '/declaration', component: Declaration },
  { path: '/settings', component: Settings },
];

export default routes;
