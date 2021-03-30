const en_locale = {
  en: {
    locale: {
      loginScreen: {
        title: 'Log into your account',
        meta: {
          title: 'Login - MatchMeMD'
        },
        cta: 'Login',
        continue: 'Or continue with',
        placeholderEmail: 'Email',
        placeholderPassword: 'Password',
        withFacebook: 'Login with Facebook',
        withGoogle: 'Login with Google',
        enterEmail: 'Please enter an email address',
        enterValidEmail: 'Please enter a valid email address',
        enterPassword: 'Please enter a password',
        enterValidPassword: 'Password must be atleast 8 characters long',
        loginError: {
          main: 'Invalid username or password. Please try again or',
          resetPassword: 'reset password'
        },
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot your password?',
        noAccount: "Don't have an account?",
        goToRegister: 'Register',
        tooltip: 'Complete form to login.'
      },

      forgotPasswordScreen: {
        title: 'Reset password',
        meta: {
          title: 'Forgot Password - MatchMeMD'
        },
        cta: 'Reset my password',
        continue: 'Or continue with',
        placeholderEmail: 'Email',
        placeholderPassword: 'Password',
        withFacebook: 'Login with Facebook',
        withGoogle: 'Login with Google',
        enterEmail: 'Please enter an email address',
        enterValidEmail: 'Please enter a valid email address',
        enterPassword: 'Please enter a password',
        enterValidPassword: 'Password must be atleast 8 characters long',
        resetError: {
          main: 'Oops something went wrong. Please try again later'
        },
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot your password?',
        noAccount: "Don't have an account?",
        goToRegister: 'Register',
        accountExists: 'Already have an account?',
        goToLogin: 'Login',
        tooltip: 'Enter your email to reset password.',
        successMessage:
          'Password reset email successfully sent. Please check your inbox to continue.',
        resetSuccessTitle: 'Password reset success'
      },

      registerScreen: {
        title: 'Start your medical journey',
        meta: {
          title: 'Register - MatchMeMD'
        },
        cta: 'Register',
        continue: 'Or continue with',
        placeholderEmail: 'Email',
        placeholderPassword: 'Password',
        placeholderFirstName: 'First name',
        placeholderLastName: 'Last name',
        withFacebook: 'Register with Facebook',
        withGoogle: 'Register with Google',
        enterEmail: 'Please enter an email address',
        enterValidEmail: 'Please enter a valid email address',
        enterPassword: 'Please enter a password',
        enterValidPassword: 'Password must be atleast 8 characters long',
        enterValidPasswordLowercase: 'Password should contain a lowercase letter',
        enterValidPasswordUppercase: 'Password should contain an uppercase letter',
        enterValidPasswordNumber: 'Password should contain a number',
        enterFirstName: 'Please enter your first name',
        enterValidFirstName: 'First name must be more than one character',
        enterLastName: 'Please enter your last name',
        enterValidLastName: 'Last name must be more than one character',
        emailInUse: {
          main: 'This email has already been registered',
          login: 'login',
          or: 'or',
          resetPassword: 'reset password'
        },
        signUpAcceptance: {
          main: 'By signing up, you confirm that you’ve read and accepted our',
          terms: 'Terms of Service',
          and: ' and ',
          policy: 'Privacy Policy.'
        },
        forgotPassword: 'Forgot your password?',
        accountExists: 'Already have an account?',
        goToLogin: 'Login',
        tooltip: 'Complete form to register.'
      },

      onboardScreen: {
        skip: 'Skip',
        completeProfile: 'Complete your profile',
        completeProfileDetailsOne:
          'Add a profile photo and answer a few questions so we can help you.',
        addPhoto: 'Add photo'
      }
    }
  }
}

export default en_locale
