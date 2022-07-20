
module.exports = {
    development: {
        production: false,
        url: "http://localhost:4200",
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/',
        update_url: 'http://167.71.72.20/superadmin/public/checkFileUpdate/exe'
    },
    stagging: {
        production: false,
        url: "https://167.71.72.20/staff",
        protocol: 'http',
        hostname: '167.71.72.20',
        pathname: '/staff',
        update_url: 'http://167.71.72.20/superadmin/public/checkFileUpdate/exe'
    },
    cloudPOS: {
        production: true,
        url: "https://rpos.live/staff",
        protocol: 'https',
        hostname: 'rpos.live',
        pathname: '/staff',
        update_url: 'https://rpos.live/superadmin/public/checkFileUpdate/exe'
    },
    maestroPOS: {
        production: true,
        url: "https://64.227.66.157/staff",
        protocol: 'https',
        hostname: '64.227.66.157',
        pathname: '/staff',
        update_url: 'https://64.227.66.157/superadmin/public/checkFileUpdate/exe'
    },
    cloudPOS_EGY: {
        production: true,
        url: "https://188.166.8.54/staff",
        protocol: 'https',
        hostname: '188.166.8.54',
        pathname: '/staff',
        update_url: 'https://188.166.8.54/superadmin/public/checkFileUpdate/exe'
    },
    IisalPOS_SA: {
        production: true,
        url: "https://188.166.63.221/staff",
        protocol: 'https',
        hostname: '188.166.63.221',
        pathname: '/staff',
        update_url: 'https://88.166.63.221/superadmin/public/checkFileUpdate/exe'
    },
    production: {
        production: true,
        url: "https://app.rubikommpos.com",
        protocol: 'https',
        hostname: 'app.rubikommpos.com',
        pathname: '/',
        update_url: 'https://superadmin.rubikommpos.com/checkFileUpdate/exe'
    }
};
