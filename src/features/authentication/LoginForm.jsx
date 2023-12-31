/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMin from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";

import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("bazza@gmail.com");
  const [password, setPassword] = useState("123bazza");
  const { loginFn, isLogin } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !email) return;
    loginFn(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword(" ");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogin}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogin}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogin}>
          {isLogin ? <SpinnerMin /> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
