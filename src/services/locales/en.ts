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
        meta: {
          title: 'Onboarding'
        },
        skip: 'Skip',
        completeProfile: 'Tell us about yourself',
        completeProfileDetailsOne:
          'Add a profile photo and answer a few questions so we can help you.',
        completeProfileTwo: 'Tell us about your education',
        completeProfileDetailsTwo:
          'Next answer some questions about your medical education and interests. ',
        upNext: 'Up next...',
        addPhoto: 'Add a photo',
        welcome: 'Welcome',
        firstPage: '1 of 2',
        secondPage: '2 of 2',
        nextButton: 'Next',
        finishButton: 'Finish',
        backButton: 'Back',
        inputLabels: {
          location: 'What country are you in?',
          birthday: "What's your date of birth?",
          gender: {
            title: 'Gender',
            male: 'Male',
            female: 'Female'
          },
          educationalStatus: {
            title: 'What is your educational status?',
            medicalStudent: 'Medical student',
            medicalGraduate: 'Medical graduate',
            nursingStudent: 'Nursing student',
            nursePractitioner: 'Nurse practitioner'
          },
          school: {
            attend: 'Which medical university did you attend?',
            schoolName: 'School name'
          },
          hasClinicalInterest: {
            interested: 'Are you interested in doing clinicals in the U.S?',
            yes: 'Yes',
            no: 'No'
          },
          startDate: {
            title: 'When would you like to start?',
            early: '0-3 months',
            medium: '3-6 months',
            late: '6-12 months',
            veryLate: '1 year or later'
          },
          clinical: {
            title: 'Which clinicals are you interested in?',
            core: 'Core rotations',
            elective: 'Elective rotations',
            observership: 'Observerships'
          },
          specialties: {
            selectAll: 'Select all',
            removeAll: 'Remove all',
            title: 'Select specialties you are interested in.',
            anesthesiology: 'Anesthesiology',
            cardiology: 'Cardiology',
            dermatology: 'Dermatology',
            emergencyMedicine: 'Emergency medicine',
            endocrinology: 'Endocrinology',
            familyMedicine: 'Family medicine',
            gastroenterology: 'Gastroenterology',
            generalSurgery: 'General surgery',
            geriatricMedicine: 'Geriatric medicine',
            hematologyOncology: 'Hematology & Oncology',
            infectiousDisease: 'Infectious disease',
            internalMedicine: 'Internal medicine',
            nephrology: 'Nephrology',
            neurology: 'Neurology',
            obstetricsGynecology: 'Obstetrics & Gynecology',
            pediatrics: 'Pediatrics',
            psychiatry: 'Psychiatry',
            urgentCare: 'Urgent Care'
          },
          visa: {
            title: 'Do you need a VISA for U.S clinicals?',
            yes: 'Yes',
            no: 'No'
          }
        },
        defaultSelectedCountryOption: 'Country',
        defaultSelectedBirthday: 'Date of birth',
        stepper: {
          medicalInterests: 'Medical interests',
          aboutYou: 'About you',
          accountCreated: 'Account created'
        }
      }
    }
  }
}

export default en_locale
