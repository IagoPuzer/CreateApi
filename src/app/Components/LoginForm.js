"use client";

import { signIn } from "next-auth/react";

export default function LoginForm() {
  async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    signIn("credentials", {
      ...data,
      callbackUrl: "/articles",
    });
  }

  return (
    <form
      onSubmit={login}
      className="bg-white p-12 rounded-lg w-96 max-w-full flex flex-col gap-2 justify-center items-center"
    >
      <h2 className="font-bold text-xl text-black mb-3">Faça seu login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="input input-primary bg-white focus:border-none w-full"
      />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        className="input input-primary bg-white focus:border-none w-full"
      />
      <button type="submit" className="btn btn-primary w-full">
        Login
      </button>
    </form>
  );
}
