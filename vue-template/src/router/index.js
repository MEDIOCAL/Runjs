import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const lawyerfirm = resolve => {
    require.ensure(['../vue/lawyerfirm.vue'], () => {
        resolve(require('../vue/lawyerfirm.vue'));
    });
};
const lawyer = resolve => {
    require.ensure(['../vue/lawyer.vue'], () => {
        resolve(require('../vue/lawyer.vue'));
    });
};
const search = resolve => {
    require.ensure(['../vue/search.vue'], () => {
        resolve(require('../vue/search.vue'));
    });
};
const recommendWx = resolve => {
    require.ensure(['../vue/recommendWxList.vue'], () => {
        resolve(require('../vue/recommendWxList.vue'));
    });
};
const ftfList = resolve => {
    require.ensure(['../vue/ftfList.vue'], () => {
        resolve(require('../vue/ftfList.vue'));
    });
};
const lawyerAssociation = resolve => {
    require.ensure(['../vue/lawyerAssociation.vue'], () => {
        resolve(require('../vue/lawyerAssociation.vue'));
    });
};
const routes = [{
        path: '/',
        name: 'lawyerfirm',
        component: lawyerfirm
    },{
        path: '/lawyer',
        name: 'lawyer',
        component: lawyer
    },{
        path: '/search',
        name: 'search',
        component: search
    },{
        path: '/recommendWx',
        name: 'recommendWx',
        component: recommendWx
    },{
        path: '/ftfList',
        name: 'ftfList',
        component: ftfList
    },{
        path: '/lawyerAssociation',
        name: 'lawyerAssociation',
        component: lawyerAssociation
    },{
        path: '*',
        component: lawyerfirm
    }]

export default new Router({
    mode: 'history',
    base: __dirname,
    routes
});