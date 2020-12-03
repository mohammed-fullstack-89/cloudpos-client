
module.exports = {
    development: {
        production: false,
        url: "http//localhost:4200/#/login",
        protocol: 'http',
        hostname: 'localhost:4200',
        pathname: '/#/login',
    },
    cloudPos: {
        production: true,
        url: "https://188.166.99.43/staff/#/login",
        protocol: 'https',
        hostname: '188.166.99.43',
        pathname: '/staff/#/login',
    },
    maestro: {
        production: true,
        url: "https://64.227.66.157/staff/#/login",
        protocol: 'https',
        hostname: '64.227.66.157',
        pathname: '/staff/#/login',
    },
    stagging: {
        production: false,
        url: "https://rpos.live/staff/#/login",
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
}
