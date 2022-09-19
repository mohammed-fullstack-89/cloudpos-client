
module.exports = {
    development: {
        production: false,
        url: "http://192.168.6.215:4200",
        protocol: 'http',
        hostname: '192.168.6.215',
        pathname: '/',
        update_url: 'http://192.168.6.215/superadmin/public/checkFileUpdate/exe'
    },
    stagging: {
        production: false,
        url: "http://167.71.72.20/staff",
        protocol: 'http',
        hostname: '167.71.72.20',
        pathname: '/staff',
        update_url: 'http://167.71.72.20/superadmin/public/checkFileUpdate/exe'
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
