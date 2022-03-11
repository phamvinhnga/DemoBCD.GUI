// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    hmr: false,
    appConfig: 'appconfig.json',
    firebase: {
        apiKey: "AIzaSyBry8bSsqpHJzJKBswZKhl9zwzJ_iEaUAk",
        authDomain: "trenet-fcm.firebaseapp.com",
        databaseURL: "https://trenet-fcm.firebaseio.com",
        projectId: "trenet-fcm",
        storageBucket: "trenet-fcm.appspot.com",
        messagingSenderId: "1068843162649",
        appId: "1:1068843162649:web:a64dde57a78ad3aa295e88",
        measurementId: "G-7E1Q6FM1QH"
    }
};
