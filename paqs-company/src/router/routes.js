const routes = [
  {
    path: "/",
    component: () => import("layouts/board.vue"),
    meta: { public: true },
    children: [
      { path: "/", component: () => import("pages/onBoard/onBoard.vue") },
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/publicLayout.vue"),
    redirect: { name: "Login" },
    meta: { public: true },
    children: [
      {
        path: "/auth/login",
        name: "Login",
        component: () => import("pages/public/Login.vue"),
      },
      {
        path: "/auth/register",
        name: "Register",
        component: () => import("pages/public/Register.vue"),
      },
      {
        path: "/auth/forgot-password",
        name: "ForgotPassword",
        component: () => import("pages/public/ForgotPassword.vue"),
      },
    ],
  },
  // {
  //   path: '/main',
  //   component: () => import('layouts/Main.vue'),
  //   redirect: { name: 'Home' },
  //   meta: { public: true },
  //   children: [
  //     {
  //       path: '/main/home',
  //       name: 'Home',
  //       component: () => import('pages/Home.vue'),
  //     },
  //   ],
  // },
  {
    path: "/dash",
    component: () => import("layouts/Admin.vue"),
    redirect: { name: "Dash" },
    meta: { public: true },
    children: [
      {
        path: "/dash/main",
        name: "dashboard",
        component: () => import("pages/admin/Dashboard.vue"),
      },
      {
        path: "/dash/maps",
        name: "maps",
        component: () => import("pages/admin/Maps.vue"),
      },
      {
        path: "/dash/scan",
        name: "scan",
        component: () => import("pages/admin/Scan.vue"),
      },
      {
        path: "/dash/settings",
        name: "settings",
        component: () => import("pages/admin/Settings.vue"),
      },
      {
        path: "/dash/generate",
        name: "GCode",
        component: () => import("pages/admin/GenerateQR.vue"),
      },
      {
        path: "/dash/table-list",
        name: "table-list",
        component: () => import("pages/admin/Tables.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("layouts/Main.vue"),
    children: [
      { path: "", name: "Error", component: () => import("pages/Error.vue") },
    ],
  },
];

export default routes;
