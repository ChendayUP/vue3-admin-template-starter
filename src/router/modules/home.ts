const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/report",
  meta: {
    icon: "homeFilled",
    title: "报表查询",
    rank: 0
  },
  children: [
    {
      path: "/report",
      name: "Report",
      component: () => import("@/views/report/index.vue"),
      meta: {
        title: "报表查询",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} as RouteConfigsTable;

// const { VITE_HIDE_HOME } = import.meta.env;
// const Layout = () => import("@/layout/index.vue");

// export default {
//   path: "/",
//   name: "Report",
//   component: Layout,
//   redirect: "/report",
//   meta: {
//     icon: "homeFilled",
//     title: "报表查询",
//     rank: 0
//   },
//   children: [
//     {
//       path: "/report",
//       name: "Report",
//       component: () => import("@/views/report/index.vue"),
//       meta: {
//         title: "报表查询",
//         showLink: VITE_HIDE_HOME === "true" ? false : true
//       }
//     }
//   ]
// } as RouteConfigsTable;
