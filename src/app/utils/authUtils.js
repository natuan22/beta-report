const ROLES = {
    ADMIN: process.env.REACT_APP_ADMIN,
    PREMIUM_USER: process.env.REACT_APP_PREMIUM_USER,
    ADMIN_BLOGS: process.env.REACT_APP_ADMIN_BLOGS,
    BASE_USER: process.env.REACT_APP_BASE_USER,
};

export const checkAccess = (routeRole, routePath) => {
    const userRole = localStorage.getItem(process.env.REACT_APP_USER_ROLE) || ROLES.BASE_USER;

    // Cấm ADMIN và PREMIUM_USER truy cập admin-blogs
    if ((userRole === ROLES.ADMIN || userRole === ROLES.PREMIUM_USER) && routePath.startsWith("/admin-blogs")) {
        return false;
    }

    // ADMIN, PREMIUM_USER, ADMIN_BLOGS có quyền truy cập mọi route
    if ([ROLES.ADMIN, ROLES.PREMIUM_USER, ROLES.ADMIN_BLOGS].includes(userRole)) {
        return true;
    }

    // Quyền cơ bản hoặc khớp vai trò
    return routeRole === ROLES.BASE_USER || userRole === routeRole;
};
  