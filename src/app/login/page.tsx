"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const Router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response);
      toast.success("Login success");
      Router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error);
      toast.error("Something went wrong: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-8 text-3xl">{loading ? "processing" : "Loading"}</h1>
      <hr />

      <div className="flex gap-2 items-center mb-8">
        <label htmlFor="email" className=" text-xl">
          Email
        </label>
        <input
          className="p-2 rounded"
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => {
            setUser((prev) => ({ ...prev, email: e.target.value }));
          }}
          placeholder="enter email"
        />
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="password" className=" text-xl">
          Password
        </label>
        <input
          className="p-2 rounded"
          type="text"
          id="password"
          value={user.password}
          onChange={(e) => {
            setUser((prev) => ({ ...prev, password: e.target.value }));
          }}
          placeholder="enter password"
        />
      </div>
      <div className="flex gap-6 items-center">
        <button
          onClick={onLogin}
          className="mt-8 p-2 text-xl bg-red-400 rounded"
        >
          Log In
        </button>
        <Link href="/signup" className="mt-8 ">
          Visit Signup page
        </Link>
      </div>
    </div>
  );
}
