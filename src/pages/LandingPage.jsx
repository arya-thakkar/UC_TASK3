import React from 'react';
import Header from '../components/Header';
import LogInForm from '../pages/LogINForm';
import SignupForm from '../pages/SignInForm';
const LandingPage = () => {
    return (
        <div className="landing-page">
            <Header />
            <SignupForm />
            {/* <LogInForm /> */}
        </div>
    );
};

export default LandingPage;