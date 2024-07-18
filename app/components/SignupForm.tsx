"use client";
import React from "react";

const SignupForm: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input id="id" />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
