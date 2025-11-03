import authService from './authService';

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const result = await authService.login('testuser', 'password123');
      
      expect(result.msg).toBe('Login successful');
      expect(result.username).toBe('testuser');
      expect(localStorage.getItem('username')).toBe('testuser');
    });

    it('should throw error with invalid credentials', async () => {
      await expect(
        authService.login('wronguser', 'wrongpass')
      ).rejects.toMatchObject({ msg: 'Invalid credentials' });
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const result = await authService.register('newuser', 'password123');
      
      expect(result.msg).toBe('User registered successfully');
    });
  });

  describe('logout', () => {
    it('should clear localStorage on logout', () => {
      localStorage.setItem('authToken', 'token');
      localStorage.setItem('username', 'testuser');
      
      authService.logout();
      
      expect(localStorage.getItem('authToken')).toBeNull();
      expect(localStorage.getItem('username')).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      localStorage.setItem('authToken', 'token');
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false when token does not exist', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('should return current username', () => {
      localStorage.setItem('username', 'testuser');
      expect(authService.getCurrentUser()).toBe('testuser');
    });

    it('should return null when no user is logged in', () => {
      expect(authService.getCurrentUser()).toBeNull();
    });
  });
});
