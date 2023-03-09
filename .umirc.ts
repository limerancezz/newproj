import {defineConfig} from '@umijs/max';

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: '@umijs/max',
    },
    routes: [
        {
            path: '/',
            redirect: '/countdown',
        },
        {
            name: '倒计时',
            path: '/countdown',
            component: './Countdown',
        },
        // {
        //   name: '权限演示',
        //   path: '/access',
        //   component: './Access',
        // },
        {
            name: ' CRUD 示例',
            //Table
            path: '/table',
            component: './Table',
        },
        {
            name: ' TABLE2',
            //Table2
            path: '/table2',
            component: './Table2',
        },
        {
            name: 'TODO List 示例',
            //Todos
            path: '/todos',
            component: './Todos',
        },
        {
            name: 'Todoslist',
            path: '/todolist',
            component: './Todolist',
        },
    ],
    proxy: {
        '/api': {
            target: 'http://0.0.0.0:8080',
            changeOrigin: true,
            pathRewrite: {'^/api': ''},
        },
    },
    npmClient: 'npm',
});
