const baseUrlApp: string =
  'https://giovannilamarmoraproject.github.io/Portfolio/';

export const environment = {
  envType: 'PROD',
  production: true,
  baseUrl: 'https://giovannilamarmoraproject.github.io/Portfolio/',
  baseUrlV2: baseUrlApp,
  googleID: 'G-0VT47TDXGS',
  profileImageUrl: baseUrlApp + 'assets/img/Profile.jpg',
  CEHCertificateUrl: 'https://www.udemy.com/certificate/UC-117Y7TRV/',
  downloadResumeUrl:
    'https://drive.google.com/file/d/1RUQ8AbiTcqq4nOnBFpw5QaCiV9tC7KAW/view?usp=sharing',
  /* Email Sender */
  emailSenderUrl: 'https://formspree.io/f/xqknjvyg',
  herokuEmailSenderUrl: 'https://prod-email-sender.herokuapp.com/v1/send-email',
  templatePath: baseUrlApp + 'assets/template/email-template.json',
  /* Social Url */
  facebookUrl: 'https://www.facebook.com/gio.lamarmora',
  instagramUrl: 'https://www.instagram.com/gio_lamarmora',
  linkedinUrl: 'https://www.linkedin.com/in/giovannilamarmora',
  githubUrl: 'https://github.com/giovannilamarmora',
  githubProjectUrl: 'https://github.com/giovannilamarmoraproject',
  worksUrl: '/spaces/uptyiu46x1l9/environments/master/entries',

  /*
   * Animation Variables
   * ============================
   * Loader
   */
  loadingTime: 1000,
  isRevealUpActive: false,
  isParticleJSActive: true,
  isOnViewAnimationsActive: true,
  isRevealUpTS: true,
};
