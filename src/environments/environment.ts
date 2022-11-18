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
  profileImageUrl: baseUrlApp + 'assets/img/Profile.jpg',
  CEHCertificateUrl: 'https://www.udemy.com/certificate/UC-117Y7TRV/',
  downloadResumeUrl:
    'https://drive.google.com/file/d/1RUQ8AbiTcqq4nOnBFpw5QaCiV9tC7KAW/view?usp=sharing',
  emailSenderUrl: 'https://formspree.io/f/mqknjoak',
  herokuEmailSenderUrl: 'https://stg-email-sender.herokuapp.com/v1/send-email',
  templatePath: baseUrlApp + 'assets/template/email-template.json',
  /* Social Url */
  facebookUrl: 'https://www.facebook.com/gio.lamarmora',
  instagramUrl: 'https://www.instagram.com/gio_lamarmora',
  linkedinUrl: 'https://www.linkedin.com/in/giovannilamarmora',
  githubUrl: 'https://github.com/giovannilamarmora',
  githubProjectUrl: 'https://github.com/giovannilamarmoraproject',

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
