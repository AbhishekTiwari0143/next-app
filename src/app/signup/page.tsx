"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      console.log("sign up success", response);
      router.push("/login");
      toast.success("Signup Success");
      setUser({
        username: "",
        email: "",
        password: "",
      });
      setBtnDisabled(false);
    } catch (error: any) {
      console.log("Signup Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-8 text-3xl">{loading ? "Processing" : "SignUp"}</h1>
      <hr />
      <div className="flex gap-2 items-center mb-8">
        <label htmlFor="username" className=" text-xl">
          Username
        </label>
        <input
          className="p-2 rounded"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => {
            setUser((prev) => ({ ...prev, username: e.target.value }));
          }}
          placeholder="enter username"
        />
      </div>
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
          onClick={onSignup}
          className="mt-8 p-2 text-xl bg-red-400 rounded"
        >
          {btnDisabled ? "can't SignUp" : "Sign Up"}
        </button>
        <Link href="/login" className="mt-8 ">
          Visit Login page
        </Link>
      </div>
    </div>
  );
}
