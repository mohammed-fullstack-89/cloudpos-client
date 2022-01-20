
module.exports = {
    development: {
        production: false,
        url: "http://localhost:4200",
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/'
    },
    stagging: {
        production: false,
        url: "http://167.71.72.20/staff",
        protocol: 'http',
        hostname: '167.71.72.20',
        pathname: '/staff'
    },
    cloudPOS: {
        production: true,
        url: "https://rpos.live/staff",
        protocol: 'https',
        hostname: 'rpos.live',
        pathname: '/staff'
    },
    maestroPOS: {
        production: true,
        url: "https://64.227.66.157/staff",
        protocol: 'https',
        hostname: '64.227.66.157',
        pathname: '/staff'
    },
    cloudPOS_EGY: {
        production: true,
        url: "https://188.166.8.54/staff",
        protocol: 'https',
        hostname: '188.166.8.54',
        pathname: '/staff'
    },
    IisalPOS_SA: {
        production: true,
        url: "https://188.166.63.221/staff",
        protocol: 'https',
        hostname: '188.166.63.221',
        pathname: '/staff'
    }
};
