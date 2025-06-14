import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'E-comm API',
        version: '1.0.0',
        description: 'API documentation for E-comm project',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

export const swaggerSpec = swaggerJSDoc({
    swaggerDefinition,
    apis: ['./src/routes/*.ts'],
});
