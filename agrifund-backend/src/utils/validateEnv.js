export const validateEnv = () => {
    const requiredEnvVars = [
        'PORT',
        'SUPABASE_URL',
        'SUPABASE_KEY',
        'JWT_SECRET',
        'NODE_ENV'
    ];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    // Validate PORT is a number
    const port = parseInt(process.env.PORT);
    if (isNaN(port)) {
        throw new Error('PORT must be a number');
    }

    // Validate URLs
    try {
        new URL(process.env.SUPABASE_URL);
    } catch (error) {
        throw new Error('SUPABASE_URL must be a valid URL');
    }

    // Validate JWT_SECRET length
    if (process.env.JWT_SECRET.length < 32) {
        throw new Error('JWT_SECRET must be at least 32 characters long');
    }

    // Validate NODE_ENV
    const validEnvironments = ['development', 'production', 'test'];
    if (!validEnvironments.includes(process.env.NODE_ENV)) {
        throw new Error('NODE_ENV must be one of: development, production, test');
    }
};
