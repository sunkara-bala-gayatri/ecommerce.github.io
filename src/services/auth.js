// Frontend-only Mock Authentication using LocalStorage

// Helper to get users from localStorage
const getUsers = () => {
    const users = localStorage.getItem('fashion_hall_users');
    return users ? JSON.parse(users) : [];
};

// Helper to save users to localStorage
const saveUsers = (users) => {
    localStorage.setItem('fashion_hall_users', JSON.stringify(users));
};

// Register User
export const register = async (userData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getUsers();

    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
        throw new Error('Email already exists');
    }

    // Create new user (excluding password in real life, but saving it here for simulation)
    const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password, // In a real frontend-only app, NEVER store plain passwords
    };

    users.push(newUser);
    saveUsers(users);

    return { status: 'success', message: 'Registration successful' };
};

// Login User
export const login = async (userData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getUsers();

    // Find user by email
    const user = users.find(u => u.email === userData.email);
    if (!user) {
        throw new Error('No account found with this email. Please register a new account.');
    }

    // Check password
    if (user.password !== userData.password) {
        throw new Error('Invalid email or password');
    }

    // Create a mock token
    const mockToken = `mock_jwt_token_${user.id}_${Date.now()}`;

    return {
        status: 'success',
        message: 'Login successful',
        token: mockToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
};

// Get Token
export const getToken = () => {
    return localStorage.getItem('token');
};

// Remove Token
export const removeToken = () => {
    localStorage.removeItem('token');
};

// Set Token
export const setToken = (token) => {
    localStorage.setItem('token', token);
};
