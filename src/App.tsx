import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import nestjsxCrudDataProvider, { axiosInstance } from "@refinedev/nestjsx-crud";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProvider } from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from "./pages/blog-posts";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { UserList } from "./pages/users";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={nestjsxCrudDataProvider(API_URL)}
                notificationProvider={useNotificationProvider}
                authProvider={authProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "blog-posts",
                    list: "/blog-posts",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                    show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "users",
                    list: "/users",
                    // create: "/users/create",
                    // edit: "/users/edit/:id",
                    // show: "/users/show/:id",
                    // meta: {
                    //   canDelete: true,
                    // },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "PI3TjS-KR0Ghr-Wz3IP0",
                  title: { text: "Chess Admin", icon: <AppIcon /> },
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated key='authenticated-inner' fallback={<CatchAllNavigate to='/login' />}>
                        <ThemedLayoutV2 Header={Header} Sider={(props) => <ThemedSiderV2 {...props} fixed />}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route index element={<NavigateToResource resource='blog-posts' />} />
                    <Route path='/blog-posts'>
                      <Route index element={<BlogPostList />} />
                      <Route path='create' element={<BlogPostCreate />} />
                      <Route path='edit/:id' element={<BlogPostEdit />} />
                      <Route path='show/:id' element={<BlogPostShow />} />
                    </Route>
                    <Route path='/users'>
                      <Route index element={<UserList />} />
                      {/* <Route path='create' element={<UserCreate />} />
                      <Route path='edit/:id' element={<UserEdit />} />
                      <Route path='show/:id' element={<UserShow />} /> */}
                    </Route>
                    <Route path='*' element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated key='authenticated-outer' fallback={<Outlet />}>
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path='/login' element={<Login />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
