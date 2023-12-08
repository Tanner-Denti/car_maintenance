import React from 'react';
import { useAuth } from './AuthContext';

const style = {
  container: `bg-slate-100 max-w-[75%] w-full mx-auto min-h-screen rounded-md shadow-xl flex pt-10`,
  contentBox: `ml-[325px] mt-[175px] text-center`,
  heading: `text-6xl font-bold p-2`,
  content: `max-w-[290px] text-left p-[15px] mb-[10px] font-semibold text-lg`,
  button: `ml-[-15px] bg-purple-500 text-white text-xl font-semibold rounded w-[250px] h-[75px]`,
  image: `h-[200px] mt-[175px]`
};

const Home = () => {
  const { user, googleSignIn } = useAuth();

  return (
    <div className={style.container}>
      <div className={style.contentBox}>
        <h1 className={style.heading}>About Us</h1>
        <p className={style.content}>This platform is a fun place to allow users to keep track of their vehicle information and maintenance. We offer the ability to track your vehicle information, and create and complete tasks related to car maintenance.</p>
        {!user && (
        <button onClick={googleSignIn} className={style.button}>Sign in with Google</button>
      )}
      </div>
      <img src="/home_image.png" alt="Car maintenance" className={style.image}/>
    </div>
  );
};

export default Home;