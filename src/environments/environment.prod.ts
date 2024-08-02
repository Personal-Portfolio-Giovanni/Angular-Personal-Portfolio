const baseUrlApp: string =
  process.env['BASE_URL'] || 'https://giovannilamarmora.github.io/';

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
  serverEmailSenderUrl:
    process.env['EMAIL_SENDER_URL'] ||
    'https://email-sender.giovannilamarmora.com/v1/send-email',
  templatePath: baseUrlApp + 'assets/template/email-template.json',

  /* Social Url */
  facebookUrl: 'https://www.facebook.com/gio.lamarmora',
  instagramUrl: 'https://www.instagram.com/gio_lamarmora',
  linkedinUrl: 'https://www.linkedin.com/in/giovannilamarmora',
  githubUrl: 'https://github.com/giovannilamarmora',
  githubProjectUrl: 'https://github.com/giovannilamarmoraproject',

  portfolioData:
    process.env['PORTFOLIO_DATA_URL'] ||
    'https://portfolio.service.giovannilamarmora.com/v1/app/portfolio/data',

  // Cache
  cacheEnable: process.env['CACHE_ENABLE'] || false,
  cacheTimeout: 3600 /** Un'Ora */,

  /*
   * Animation Variables
   * ============================
   * Loader
   */
  loadingTime: 1000,
  isRevealUpActive: false,
  isParticleJSActive: false,
  isOnViewAnimationsActive: true,
  isRevealUpTS: true,
};
