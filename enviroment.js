
module.exports = {
    development: {
        production: false,
        url: "http://192.168.1.6:4200/#/login",
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/#/login'
    },
    stagging: {
        production: false,
        url: "http://167.71.72.20/staff/#/login",
        protocol: 'http',
        hostname: '167.71.72.20',
        pathname: '/staff/#/login'
    },
    cloudPOS: {
        production: true,
        url: "https://rpos.live/staff/#/login",
        protocol: 'https',
        hostname: 'rpos.live',
        pathname: '/staff/#/login'
    },
    maestroPOS: {
        production: true,
        url: "https://64.227.66.157/staff/#/login",
        protocol: 'https',
        hostname: '64.227.66.157',
        pathname: '/staff/#/login'
    },
    cloudPOS_EGY: {
        production: true,
        url: "https://188.166.8.54/staff/#/login",
        protocol: 'https',
        hostname: '188.166.8.54',
        pathname: '/staff/#/login'
    },
    IisalPOS_SA: {
        production: true,
        url: "https://188.166.63.221/staff/#/login",
        protocol: 'https',
        hostname: '188.166.63.221',
        pathname: '/staff/#/login'
    }
};
