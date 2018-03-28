function getGlobal(route, url) {
        if (url === '/') {
            return route;
        }
        return `${route}${url}`;
    }
    module.exports = {
        getGlobal,
      };