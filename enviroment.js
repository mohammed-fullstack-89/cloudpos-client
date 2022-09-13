
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
        update_url: 'https://167.71.72.20/superadmin/public/checkFileUpdate/exe'
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
