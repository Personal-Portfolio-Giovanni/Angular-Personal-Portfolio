// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseUrlApp: string = '../../';

export const environment = {
  envType: 'DEV',
  production: false,
  baseUrl: '../../',
  baseUrlV2: '../../../../',
  googleID: 'G-0VT47TDXGS',
  profileImageUrl: baseUrlApp + 'assets/img/Profile.webp',
  CEHCertificateUrl: 'https://www.udemy.com/certificate/UC-117Y7TRV/',
  downloadResumeUrl:
    'https://drive.google.com/file/d/1m77_ACz4PVWFuFkbw69b1mijjL2HlgP_/view?usp=sharing',
  emailSenderUrl: 'https://formspree.io/f/mqknjoak',
  //serverEmailSenderUrl:'https://oraclewebserver.ddns.net/email-sender/v1/send-email',
  serverEmailSenderUrl:
    'https://email-sender.hostwebserver.site/email-sender/v1/send-email',
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
  portfolioCMSData: 'http://localhost:8080/v1/app/CMS/data',
  portfolioData: 'http://localhost:8080/v1/app/portfolio/data',

  // Cache
  cacheEnable: false,
  cacheTimeout: 180000,

  /*
   * Animation Variables
   * ============================
   * Loader
   */
  loadingTime: 1000,
  isRevealUpActive: false,
  isParticleJSActive: true,
  isOnViewAnimationsActive: true,
  // If isRevealUpTS: false, the Reveal Up Javascript is active
  isRevealUpTS: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
