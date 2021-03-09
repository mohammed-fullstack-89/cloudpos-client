
module.exports = {
    development: {
        production: false,
        url: "http://localhost:4200/#/login",
        protocol: 'http',
        hostname: 'localhost:4200',
        pathname: '/#/login',
    },
    CloudPos: {
        production: true,
        url: "http://rpos.live/staff/#/login",
        protocol: 'https',
        hostname: 'rpos.live',
        pathname: '/staff/#/login',
    },
    maestroPos: {
        production: true,
        url: "https://64.227.66.157/staff/#/login",
        protocol: 'https',
        hostname: '64.227.66.157',
        pathname: '/staff/#/login',
    },
    stagging: {
        production: false,
        url: "http://167.71.72.20/staff/#/login",
        protocol: 'http',
        hostname: 'rpos.live',
        pathname: '/staff/#/login',
    },
    stagging_new: {
        production: false,
        url: "http://rpos.live/staff_new/#/login",
        protocol: 'https',
        hostname: 'rpos.live',
        pathname: '/staff/#/login',
    },
    zug: {
        production: false,
        url: "http://192.168.1.90:4200/#/login",
        protocol: 'https',
        hostname: '192.168.1.90',
        pathname: '/#/login',
    },
    zugMac: {
        production: false,
        url: "http://192.168.1.6:4200/#/login",
        protocol: 'https',
        hostname: '192.168.1.6',
        pathname: '/#/login',
    },
    remoteZug: {
        production: false,
        url: "http://711fd7558428.ngrok.io",
        protocol: 'http',
        hostname: '711fd7558428.ngrok.io',
        pathname: '',
    },
}
