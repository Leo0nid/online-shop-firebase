//react
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

//firebase
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth } from '../../firebase.js';
import { storage } from '../../firebase.js';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.js';

import { toast } from 'react-toastify';

const SignUp = () => {
  const [userName, setuserName] = useState('');
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Загрузка файла
      const storageRef = ref(storage, `images/${Date.now() + userName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log(storageRef);
      
     
      await uploadTask;
  
      // Получение картинки (url) загруженного файла
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      
      // Регистрация пользователя
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await updateProfile(user, {
        displayName: userName,
        photoURL: downloadURL,
      });
  
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: userName,
        email: email,
        photoURL: downloadURL,
      });
      setLoading(false);
      toast.success('Аккаунт создан!');
      navigate('/shop');
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
            <h4 className="login__loading">Загрузка..</h4>
          ) : (
            <div className="login__wrapper">
              <h3 className="login__name">Регистрация</h3>
              <Formik>
                <Form className="login__form-auth" onSubmit={signup}>
                  <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Электронная почта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                  <button type="submit" className="login__btn">
                    Зарегистрироваться
                  </button>
                  <p className="login__path">
                    У вас еще нет аккаунта?{' '}
                    <Link className="login__path-link" to="/login">
                      Войти
                    </Link>
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

export default SignUp;
