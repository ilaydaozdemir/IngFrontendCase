import { Router } from '@vaadin/router';

// index.html'deki <div id="outlet"></div> elementini hedefliyoruz
const outlet = document.getElementById('outlet');
const router = new Router(outlet);

router.setRoutes([
  { path: '/',                    component: 'employee-list' },
  { path: '/employees',           component: 'employee-list' },
  { path: '/employees/add',       component: 'employee-form' },
  { path: '/employees/:id/edit',  component: 'employee-form' },
  // 404 için:
  { path: '(.*)',                 component: 'not-found-view' }
]);
