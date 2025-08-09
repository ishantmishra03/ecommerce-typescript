import { useEffect, useState } from 'react';
import { Eye, EyeOff, Sun, Moon, User, Mail, Lock, Loader2 } from 'lucide-react';
import type { FormData, FormErrors } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleTheme } from '../../store/slices/theme.slice';
import { login, setLoading } from '../../store/slices/auth.slice';
import axios from '../../config/axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.mode  === 'dark');
  const { loading, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isLogin && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

   if(isLogin){
      try {
        setLoading(true);
        const {data} = await axios.post('/api/auth/login', formData);
        if(data.success){
          dispatch(login({ user: data.user }));
          toast.success(data.message);
          navigate('/cart');
        } 
      } catch (error) {
        toast.error(error.response?.data.message);
        setErrors({ general: error instanceof Error ? error.message : 'An error occurred' });
      } finally{
        setLoading(false);
        setErrors({});
      }
   } else {
    try {
      setLoading(true);
        const {data} = await axios.post('/api/auth/register', formData);
        if(data.success){
          dispatch(login({ user: data.user }));
          toast.success(data.message);
          navigate('/products');
        }
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'An error occurred' });
    } finally{
        setLoading(false);
        setErrors({});
      }
   }
  };

  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setFormData({ email: '', password: '', confirmPassword: '' });
    setErrors({});
    setTouched({});
  };

  useEffect(() => {
    if(isAuthenticated){
      navigate('/products');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
    }`}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-6">
            <button
             onClick={() => dispatch(toggleTheme())}
              className={`p-3 rounded-full border transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-600 text-yellow-400 hover:bg-slate-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className={`rounded-2xl shadow-2xl p-8 transition-all duration-300 ${
            isDarkMode
              ? 'bg-slate-800/50 border border-slate-700 backdrop-blur-sm'
              : 'bg-white/80 border border-gray-100 backdrop-blur-sm'
          }`}>
           <Link to="/">
            <div className="text-center mb-8">
              <h1 className={`text-4xl font-bold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Klyora
              </h1>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-2 rounded-full"></div>
            </div>
           </Link>

            {/* Mode Toggle */}
            <div className={`flex rounded-lg p-1 mb-8 ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <button
                onClick={() => isLogin || toggleMode()}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                  isLogin
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : isDarkMode
                    ? 'text-slate-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => !isLogin || toggleMode()}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                  !isLogin
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : isDarkMode
                    ? 'text-slate-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium ${
                    isDarkMode ? 'text-slate-200' : 'text-gray-700'
                  }`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`w-5 h-5 ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } ${errors.email && touched.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

             
              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className={`block text-sm font-medium ${
                    isDarkMode ? 'text-slate-200' : 'text-gray-700'
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } ${errors.password && touched.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                      isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label 
                    htmlFor="confirmPassword" 
                    className={`block text-sm font-medium ${
                      isDarkMode ? 'text-slate-200' : 'text-gray-700'
                    }`}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 ${
                        isDarkMode ? 'text-slate-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Confirm your password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                      className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                        isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* General Error */}
              {errors.general && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Submit  */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                  loading
                    ? 'bg-blue-400 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <User className="w-5 h-5 mr-2" />
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </div>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleMode}
                  className="ml-2 text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors duration-200"
                  disabled={loading}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;