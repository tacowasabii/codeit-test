'use client';
import React, { useEffect, useState } from 'react';

const SignupForm: React.FC = () => {
  var bcrypt = require('bcryptjs');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isIdValid = testIdIsValid(form.id);
    const isNameValid = testNameIsValid(form.name);
    const isEmailValid = testEmailIsValid(form.email);
    const isPasswordValid = testPasswordIsValid(form.password);
    const isConfirmPasswordValid = testConfirmPasswordIsValid({
      password: form.password,
      confirmPassword: form.confirmPassword,
    });

    if (isIdValid && isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      const userInfo = {
        id,
        name,
        email,
        // password: bcrypt.genSaltSync(password),
        password,
      };
      let users = JSON.parse(localStorage.getItem('users') ?? '[]');
      users.push(userInfo);
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { id, name, email, password, confirmPassword } = form;

  const onChange = (e: any) => {
    const nextForm = {
      ...form,
      [e.target.id]: e.target.value,
    };
    setForm(nextForm);
  };
  const [isIdUnvaild, setIsIdUnvaild] = useState(false);
  const [idMessage, setIdMessage] = useState('');
  const [isNameUnvalid, setIsNameUnvalid] = useState(false);
  const [nameMessage, setNameMessage] = useState('');
  const [isEmailUnvalid, setIsEmailUnvalid] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [isPasswordUnvalid, setIsPasswordUnvalid] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isConfirmPasswordUnvalid, setIsConfirmPasswordUnvalid] = useState(false);
  const [ConfirmPasswordMessage, setConfirmPasswordMessage] = useState('');

  const testIdIsValid = (id: string): boolean => {
    const len = id.trim().length;
    if (len === 0) {
      setIdMessage('값을 입력해주세요.');
      setIsIdUnvaild(true);
      return false;
    } else if (len < 5) {
      setIdMessage('최소 5자 이상 입력해주세요.');
      setIsIdUnvaild(true);
      return false;
    } else if (len > 15) {
      setIdMessage('최대 15자 이하로 입력해주세요.');
      setIsIdUnvaild(true);
      return false;
    } else {
      setIdMessage('');
      setIsIdUnvaild(false);
      return true;
    }
  };

  const testNameIsValid = (name: string): boolean => {
    if (name.trim().length === 0) {
      setNameMessage('값을 입력해주세요.');
      setIsNameUnvalid(true);
      return false;
    } else {
      setNameMessage('');
      setIsNameUnvalid(false);
      return true;
    }
  };

  const testEmailIsValid = (email: string): boolean => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isValid) {
      setIsEmailUnvalid(false);
      setEmailMessage('');
      return true;
    } else {
      setIsEmailUnvalid(true);
      setEmailMessage('이메일 형식에 맞게 입력해주세요.');
      return false;
    }
  };

  const testPasswordIsValid = (password: string): boolean => {
    const len = password.trim().length;
    if (len === 0) {
      setPasswordMessage('값을 입력해주세요.');
      setIsPasswordUnvalid(true);
      return false;
    } else if (len < 8) {
      setPasswordMessage('최소 8자 이상 입력해주세요.');
      setIsPasswordUnvalid(true);
      return false;
    } else if (len > 20) {
      setPasswordMessage('최대 20자 이하로 입력해주세요.');
      setIsPasswordUnvalid(true);
      return false;
    } else if (!/^[a-zA-Z0-9]*$/.test(password)) {
      setPasswordMessage('영문과 숫자만 입력해주세요.');
      setIsPasswordUnvalid(true);
      return false;
    } else {
      setPasswordMessage('');
      setIsPasswordUnvalid(false);
      return true;
    }
  };
  const testConfirmPasswordIsValid = ({
    password,
    confirmPassword,
  }: {
    password: string;
    confirmPassword: string;
  }): boolean => {
    const len = confirmPassword.trim().length;
    if (len === 0) {
      setConfirmPasswordMessage('값을 입력해주세요.');
      setIsConfirmPasswordUnvalid(true);
      return false;
    } else if (len < 8) {
      setConfirmPasswordMessage('최소 8자 이상 입력해주세요.');
      setIsConfirmPasswordUnvalid(true);
      return false;
    } else if (len > 20) {
      setConfirmPasswordMessage('최대 20자 이하로 입력해주세요.');
      setIsConfirmPasswordUnvalid(true);
      return false;
    } else if (!/^[a-zA-Z0-9]*$/.test(password)) {
      setConfirmPasswordMessage('영문과 숫자만 입력해주세요.');
      setIsConfirmPasswordUnvalid(true);
      return false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordMessage('비밀번호가 일치하지 않습니다.');
      setIsConfirmPasswordUnvalid(true);
      return false;
    } else {
      setConfirmPasswordMessage('');
      setIsConfirmPasswordUnvalid(false);
      return true;
    }
  };

  return (
    <div className="flex w-full justify-center">
      <form
        onSubmit={handleSubmit}
        className="mt-20 min-h-screen flex-col items-center justify-center"
      >
        <div className="">
          <label htmlFor="id">ID:</label>
          <input id="id" value={id} onChange={onChange} />
        </div>
        {isIdUnvaild && <div className="text-red-500">{idMessage}</div>}
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" value={name} onChange={onChange} />
        </div>
        {isNameUnvalid && <div className="text-red-500">{nameMessage}</div>}
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" value={email} onChange={onChange} />
        </div>
        {isEmailUnvalid && <div className="text-red-500">{emailMessage}</div>}
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" value={password} onChange={onChange} />
        </div>
        {isPasswordUnvalid && <div className="text-red-500">{passwordMessage}</div>}
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input id="confirmPassword" value={confirmPassword} onChange={onChange} />
        </div>
        {isConfirmPasswordUnvalid && <div className="text-red-500">{ConfirmPasswordMessage}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupForm;
