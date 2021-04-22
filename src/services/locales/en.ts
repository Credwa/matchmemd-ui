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
        accountExists: 'Remembered your password?',
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

      emailActionsScreen: {
        meta: {
          titleReset: 'Reset password - MatchMeMD',
          titleVerify: 'Verify password - MatchMeMD'
        },
        titles: {
          reset: 'Reset password',
          verify: 'Email verified!'
        },
        resetSuccessTitle: 'Password reset successful',
        placeholderPassword: 'Password',
        placeholderPasswordConfirm: 'Confirm password',
        confirmPasswordError: 'Passwords do not match',
        cta: 'Change password',
        rememberedPassword: 'Remembered your password? ',
        goToLogin: 'Login',
        tooltip: 'Complete form to reset your password',
        resetCodeExpired: 'Reset code may have expired',
        resendPasswordReset: 'resend password reset',
        login: 'Login',
        successMessage: 'Password successfully reset. Redirecting you to login...',
        downloadPdf: 'Download your free pdf'
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
      },

      components: {
        prompt: {
          reload: 'Reload',
          close: 'Close',
          readyOffline: 'App ready to work offline.',
          newContent: 'New content available, click on reload button to update.'
        }
      },

      policyScreen: {
        header: 'Privacy Policy of ',
        at: 'At',
        paragraphOne:
          ', we collect and manage user data according to the following Privacy Policy.',
        dataCollected: 'Data Collected',
        paragraphTwo:
          'We collect information you provide directly to us. For example, we collect information when you create an account, subscribe, participate in any interactive features of our services, fill out a form, request customer support or otherwise communicate with us. The types of information we may collect include your name, email address, postal address, credit card information and other contact or identifying information you choose to provide.',
        paragraphThree:
          'We collect anonymous data from every visitor of the Website to monitor traffic and fix bugs. For example, we collect information like web requests, the data sent in response to such requests, the Internet Protocol address, the browser type, the browser language, and a timestamp for the request.',
        paragraphFour:
          'We also use various technologies to collect information, and this may include sending cookies to your computer. Cookies are small data files stored on your hard drive or in your device memory that helps us to improve our services and your experience, see which areas and features of our services are popular and count visits. We may also collect information using web beacons (also known as "tracking pixels"). Web beacons are electronic images that may be used in our services or emails and to track count visits or understand usage and campaign effectiveness. Our Privacy Policy was created with the help of the',
        andThe: 'and the',
        useOfData: 'Use of the Data',
        paragraphFive: {
          one: 'We only use your personal information to provide you the ',
          two: 'services or to communicate with you about the Website or the services.'
        },
        paragraphSix:
          'We employ industry standard techniques to protect against unauthorized access of data about you that we store, including personal information.',
        paragraphSeven:
          'We do not share personal information you have provided to us without your consent, unless:',
        paragraphEight: 'Doing so is appropriate to carry out your own request',
        paragraphNine:
          "We believe it's needed to enforce our legal agreements or that is legally required",
        paragraphTen:
          "We believe it's needed to detect, prevent or address fraud, security or technical issues",
        sharingOfData: 'Sharing of Data',
        paragraphEleven:
          "We don't share your personal information with third parties. Aggregated, anonymized data is periodically transmitted to external services to help us improve the Website and service.",
        paragraphTwelve:
          'We may allow third parties to provide analytics services. These third parties may use cookies, web beacons and other technologies to collect information about your use of the services and other websites, including your IP address, web browser, pages viewed, time spent on pages, links clicked and conversion information.',
        paragraphThirteen:
          "We also use social buttons provided by services like Twitter, Google+, LinkedIn and Facebook. Your use of these third party services is entirely optional. We are not responsible for the privacy policies and/or practices of these third party services, and you are responsible for reading and understanding those third party services' privacy policies.",
        cookies: 'Cookies',
        paragraphFourteen: 'We may use cookies on our site to remember your preferences.',
        paragraphFifteen: {
          one: 'For more general information on cookies, please read',
          two: '"What Are Cookies"'
        },
        optOut: 'Opt-Out, Communication Preferences',
        paragraphSixteen:
          'You may modify your communication preferences and/or opt-out from specific communications at any time. Please specify and adjust your preferences.',
        security: 'Security',
        paragraphSeventeen:
          'We take reasonable steps to protect personally identifiable information from loss, misuse, and unauthorized access, disclosure, alteration, or destruction. But, you should keep in mind that no Internet transmission is ever completely secure or error-free. In particular, email sent to or from the Sites may not be secure.',
        aboutChildren: 'About Children',
        paragraphEighteen:
          'The Website is not intended for children under the age of 13. We do not knowingly collect personally identifiable information via the Website from visitors in this age group.',
        policyChanges: 'Changes to the Privacy Policy',
        paragraphNineteen:
          'We may amend this Privacy Policy from time to time. Use of information we collect now is subject to the Privacy Policy in effect at the time such information is used.',
        paragraphTwenty:
          'If we make major changes in the way we collect or use information, we will notify you by posting an announcement on the Website or sending you an email.',
        terms: 'Terms and Conditions',
        pleaseRead: 'Please read our '
      },

      termsScreen: {
        header: 'Terms and Conditions of ',
        at: 'At',
        paragraphOne:
          "These terms and conditions outline the rules and regulations for the use of MatchMeMD's Website.",
        paragraphTwo:
          'The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.',
        paragraphThree: {
          one:
            "We employ the use of cookies. By accessing MatchMeMD, you agreed to use cookies in agreement with the MatchMeMD's",
          two:
            ' Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.'
        },
        cookies: 'Cookies',
        paragraphFour:
          'Unless otherwise stated, MatchMeMD and/or its licensors own the intellectual property rights for all material on MatchMeMD. All intellectual property rights are reserved. You may access this from MatchMeMD for your own personal use subjected to restrictions set in these terms and conditions.',
        andThe: 'and the',
        license: 'License',
        paragraphFive: {
          one: 'You must not:',
          two: 'Republish material from MatchMeMD',
          three: 'Sell, rent or sub-license material from MatchMeMD',
          four: 'Reproduce, duplicate or copy material from MatchMeMD',
          five: 'Redistribute content from MatchMeMD'
        },
        paragraphSix:
          'This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the',
        paragraphSeven:
          'Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. MatchMeMD does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of MatchMeMD,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, MatchMeMD shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.',
        paragraphEight:
          'MatchMeMD reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.',
        paragraphNine: {
          one: 'You warrant and represent that:',
          two:
            'You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;',
          three:
            'The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;',
          four:
            'The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy',
          five:
            'The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.'
        },
        paragraphTen:
          ' You hereby grant MatchMeMD a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.',
        hyperlinking: 'Hyperlinking to our Content',
        paragraphEleven: {
          one:
            'The following organizations may link to our Website without prior written approval:',
          two: 'Government agencies;',
          three: 'Search engines;',
          four: 'News organizations;',
          five:
            'Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and',
          six:
            'System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.',
          seven:
            'These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.',
          eight:
            'We may consider and approve other link requests from the following types of organizations:',
          nine: 'commonly-known consumer and/or business information sources;',
          ten: 'dot.com community sites;',
          eleven: 'associations or other groups representing charities;',
          twelve: 'online directory distributors;',
          thirteen: 'internet portals;',
          fourteen: 'accounting, law and consulting firms; and',
          fifteen: 'educational institutions and trade associations.',
          sixteen:
            'We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of MatchMeMD; and (d) the link is in the context of general resource information.',
          seventeen:
            'These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.',
          eighteen:
            'If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to MatchMeMD. Please include your name, your organization name, contact information as well as the URL of  your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.',
          nineteen: 'Approved organizations may hyperlink to our Website as follows:',
          twenty: 'By use of our corporate name; or',
          twentyOne: 'By use of the uniform resource locator being linked to; or',
          twentyTwo:
            'By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.',
          twentyThree:
            "No use of MatchMeMD's logo or other artwork will be allowed for linking absent a trademark license agreement."
        },
        iframes: 'iFrames',
        paragraphTwelve:
          'Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.',
        contentLiability: 'Content Liability',
        paragraphThirteen:
          'We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.',
        yourPrivacy: 'Your Privacy',
        paragraphFourteen: 'Please read our ',
        rights: 'Reservation of Rights',
        paragraphFifteen:
          'We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.',
        removal: 'Removal of links from our website',
        paragraphSixteen:
          'If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly. We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.',
        disclaimer: 'Disclaimer',
        paragraphSeventeen: {
          one:
            'To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:',
          two: 'limit or exclude our or your liability for death or personal injury;',
          three:
            'limit or exclude our or your liability for fraud or fraudulent misrepresentation;',
          four:
            'limit any of our or your liabilities in any way that is not permitted under applicable law; or',
          five:
            'exclude any of our or your liabilities that may not be excluded under applicable law.',
          six:
            'The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.',
          seven:
            'As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.'
        }
      }
    }
  }
}

export default en_locale
