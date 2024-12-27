import { AuthPage } from "@refinedev/antd";

export const Login = () => {
  return <AuthPage type='login' registerLink={false} rememberMe={false} />;
};
