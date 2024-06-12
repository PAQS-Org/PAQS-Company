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
    meta: { public: true },
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("pages/public/Login.vue"),
        meta: { public: true },
      },
      {
        path: "register",
        name: "Register",
        component: () => import("pages/public/Register.vue"),
        meta: { public: true },
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: () => import("pages/public/ForgotPassword.vue"),
        meta: { public: true },
      },
      {
        path: "verify",
        component: () => import("pages/public/verifyEmail.vue"),
        meta: { public: true },
      },
      {
        path: "resetPassword",
        component: () => import("pages/public/resetPassword.vue"),
        meta: { public: true },
      },
    ],
  },
  {
    path: "/dash",
    component: () => import("layouts/Admin.vue"),
    redirect: { name: "dashboard" },
    children: [
      {
        path: "main",
        name: "dashboard",
        component: () => import("pages/admin/Dashboard.vue"),
      },
      {
        path: "maps",
        name: "maps",
        component: () => import("pages/admin/Maps.vue"),
      },
      {
        path: "scan",
        name: "scan",
        component: () => import("pages/admin/Scan.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("pages/admin/Settings.vue"),
      },
      {
        path: "generate",
        name: "GCode",
        component: () => import("pages/admin/GenerateQR.vue"),
      },
      {
        path: "update",
        name: "updatecode",
        component: () => import("pages/admin/UpdateCodes.vue"),
      },
      {
        path: "table-list",
        name: "table-list",
        component: () => import("pages/admin/Tables.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("layouts/Main.vue"),
    children: [
      {
        path: "",
        name: "Error",
        component: () => import("pages/ErrorNotFound.vue"),
      },
    ],
  },
];

export default routes;
