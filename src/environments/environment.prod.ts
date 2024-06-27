const baseUrlApp: string = 'https://giovannilamarmora.github.io/';

export const environment = {
  envType: 'PROD',
  production: true,
  baseUrl: baseUrlApp,
  baseUrlV2: baseUrlApp,
  googleID: 'G-0VT47TDXGS',
  profileImageUrl: baseUrlApp + 'assets/img/Profile.webp',
  CEHCertificateUrl: 'https://www.udemy.com/certificate/UC-117Y7TRV/',
  downloadResumeUrl:
    'https://drive.google.com/file/d/1m77_ACz4PVWFuFkbw69b1mijjL2HlgP_/view?usp=sharing',

  /* Email Sender */
  emailSenderUrl: 'https://formspree.io/f/xqknjvyg',
  //serverEmailSenderUrl:'https://oraclewebserver.ddns.net/email-sender/v1/send-email',
  serverEmailSenderUrl:
    'https://email-sender.giovannilamarmora.com/v1/send-email',
  templatePath: baseUrlApp + 'assets/template/email-template.json',

  /* Social Url */
  facebookUrl: 'https://www.facebook.com/gio.lamarmora',
  instagramUrl: 'https://www.instagram.com/gio_lamarmora',
  linkedinUrl: 'https://www.linkedin.com/in/giovannilamarmora',
  githubUrl: 'https://github.com/giovannilamarmora',
  githubProjectUrl: 'https://github.com/giovannilamarmoraproject',

  /* Contentful */
  contentfulBaseUrl: 'https://cdn.contentful.com',
  worksUrl: '/spaces/uptyiu46x1l9/environments/master/entries',

  /* Portfolio */
  portfolioCMSData:
    'https://portfolio.service.hostwebserver.site/v1/app/CMS/data',

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
