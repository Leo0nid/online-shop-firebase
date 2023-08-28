//react
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';

//firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      console.log(user);
      setLoading(false);
      toast.success('Успешная авторизация!');
      navigate('/');
    } catch (error) {
      setLoading(false);
      toast.error('Ошибка!');
    }
  };
  return (
    <>
      <div className="login">
        <div className="container">
          {loading ? (
            <h4 className="login__loading"> Загрузка.. </h4>
          ) : (
            <div className="login__wrapper">
              <h3 className="login__name">Добро пожаловать!</h3>
              <Formik>
                <Form className="login__form-auth" onSubmit={signIn}>
                  <label className="login__label" htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Введите вашу почту"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label className="login__label" htmlFor="password"></label>
                  <input
                    type="password"
                    placeholder="Введите ваш пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                    <motion.button whileHover={{ scale: 1.1 }} className="login__btn">Войти</motion.button>
                  <p className="login__path">
                    Нет аккаунта?{' '}
                    <Link className="login__path-link" to="/signup">
                      Создать аккаунт
                    </Link>{' '}
                  </p>
                </Form>
              </Formik>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
