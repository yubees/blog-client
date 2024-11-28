import React from 'react';
import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Google: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (response: any) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/auth/google/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });

      if (!res.ok) throw new Error('Failed to fetch user data');

      const userData = await res.json();
      if (res.ok) {
        console.log("Data", userData)
        localStorage.setItem("userToken", userData.userId)
        navigate(`/${userData.user}`)

      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleLoginError = () => {
    console.error('Google Login Failed');
  };



  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/auth/google/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: credentialResponse.credential }),
        });

        if (!res.ok) throw new Error('Failed to fetch user data');

        const userData = await res.json();
        if (res.ok) {
          console.log('One Tap Data', userData);
          localStorage.setItem('userToken', userData.userId);
          navigate(`/${userData.user}`);
        }
      } catch (error) {
        console.error('One Tap Login Error:', error);
        navigate('/signin'); // Redirect to sign-in on error
      }
    },
    onError: () => {
      console.error('One Tap Login Failed');
      navigate('/signin'); // Redirect to sign-in on failure
    },
  });

  return (
    <Button variant={"outline"} className="w-full py-[0.625rem] px-[0.875rem]">
      <GoogleLogin width={"360px"} onSuccess={handleLoginSuccess} onError={handleLoginError} useOneTap />
    </Button>
  );
};

export default Google;
