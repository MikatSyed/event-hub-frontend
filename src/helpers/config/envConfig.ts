export const getBaseUrl = (): any => {
    const environment = process.env.NODE_ENV;

    switch (environment) {
        case 'development':
            return 'http://localhost:8700/api/v1'; 
        case 'production':
            return 'https://event-hub-backend-omega.vercel.app/api/v1';
        default:
            return 'https://event-hub-backend-omega.vercel.app/api/v1'; 
    }
};