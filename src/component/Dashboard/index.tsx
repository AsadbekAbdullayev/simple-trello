import suspenseHOC from '../shared/SuspenseHOC';
export default suspenseHOC(() => import(/* webpackChunkName: "Dashboard" */ './Dashboard'));
