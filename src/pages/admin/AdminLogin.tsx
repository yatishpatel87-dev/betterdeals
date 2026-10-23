import React, { useState } from 'react';
import { ShieldCheck, LogIn, AlertCircle, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { loginWithGoogle, isUserAdmin, seedInitialDataIfEmpty } from '../../firebase/db';
import { auth } from '../../firebase/config';
import { Language } from '../../types';
import { getTranslation } from '../../utils/translations';
import { User } from 'firebase/auth';

interface AdminLoginProps {
  currentUser: User | null;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  navigate: (path: string) => void;
  lang: Language;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  currentUser,
  isAdmin,
  setIsAdmin,
  navigate,
  lang,
}) => {
  const t = getTranslation(lang);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const user = await loginWithGoogle();
      if (user) {
        const adminStatus = await isUserAdmin(user);
        setIsAdmin(adminStatus);
        if (adminStatus) {
          await seedInitialDataIfEmpty(true);
          navigate('/admin');
        } else {
          setErrorMsg(
            lang === 'gu'
              ? `આ એકાઉન્ટ (${user.email}) ને એડમિન પરવાનગી નથી. માત્ર અધિકૃત એડમિન (જેવા કે yatishpatel086@gmail.com) પ્રવેશ કરી શકે છે.`
              : `Account ${user.email} is not authorized as an administrator. Only authorized emails can access the admin console.`
          );
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      <div className="text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-white">
          Better Deals {lang === 'gu' ? 'એડમિન પોર્ટલ' : 'Admin Portal'}
        </h1>
        <p className="text-xs text-slate-400">
          {lang === 'gu' 
            ? 'પ્રોડક્ટ્સ, એફિલિએટ લિંક્સ અને મીડિયા મેનેજ કરવા માટે સુરક્ષિત લૉગિન' 
            : 'Secure access to manage affiliate deals, categories, and media.'}
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {currentUser && isAdmin ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400">{lang === 'gu' ? 'તમે લૉગિન છો' : 'Logged in as'}</p>
              <p className="text-sm font-bold text-white">{currentUser.email}</p>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
            >
              {lang === 'gu' ? 'ડેશબોર્ડ પર જાઓ' : 'Open Admin Dashboard'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                {lang === 'gu'
                  ? 'આ વિસ્તાર માત્ર અધિકૃત એડમિન માટે સુરક્ષિત છે. Google Authentication દ્વારા માત્ર વેરિફાઇડ એડમિન પ્રવેશ મેળવી શકે છે.'
                  : 'Authorized personnel only. Access is protected by server-enforced Firebase Authentication and Firestore Security Rules.'}
              </span>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-lg transition-all disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{loading ? (lang === 'gu' ? 'તપાસ થઈ રહી છે...' : 'Verifying...') : t.loginWithGoogle}</span>
            </button>
          </div>
        )}

        <div className="pt-2 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? 'મુખ્ય સાઇટ પર પાછા ફરો' : 'Return to Website'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
