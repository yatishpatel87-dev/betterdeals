import React from 'react';
import { ShoppingBag, ShieldCheck, Heart, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface AboutPageProps {
  lang: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang }) => {
  const t = getTranslation(lang);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          {lang === 'gu' ? 'Better Deals વિશે' : 'About Better Deals'}
        </h1>
        <p className="text-sm text-blue-400 font-semibold tracking-wide">
          {t.brandTagline}
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 leading-relaxed text-sm text-slate-300">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>{lang === 'gu' ? 'અમારું મિશન' : 'Our Mission'}</span>
        </h2>
        <p>
          {lang === 'gu'
            ? 'Better Deals નું મુખ્ય લક્ષ્ય ભારતીય ગ્રાહકોને Amazon, Flipkart અને દેશની ટોચની ઈ-કોમર્સ વેબસાઇટ્સ પરથી વાસ્તવિક, ચકાસાયેલા અને સૌથી મોટા ડિસ્કાઉન્ટ સોદા આપવાનું છે. અમે ઇન્ટરનેટ પરના હજારો ઉત્પાદનોની કિંમતો ટ્રેક કરીએ છીએ અને માત્ર તે જ સોદા પ્રદર્શિત કરીએ છીએ જે ગ્રાહકોના પૈસા બચાવે છે.'
            : 'Better Deals is dedicated to discovering and sharing the most genuine, high-value deals and discounts from premier online marketplaces including Amazon India and Flipkart. We track price histories, verify seller ratings, and curate discounts that provide authentic savings.'}
        </p>

        <h2 className="text-xl font-bold text-white flex items-center gap-2 pt-4">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          <span>{lang === 'gu' ? 'અમે શા માટે અલગ છીએ?' : 'Why Better Deals?'}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'gu' ? '100% અસલી લિંક્સ' : '100% Direct Official Store Links'}</span>
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'gu' 
                ? 'કોઈપણ થર્ડ-પાર્ટી મધ્યસ્થી વગર, સીધા સત્તાવાર સ્ટોર પેજ પર સુરક્ષિત રીડાયરેક્શન.' 
                : 'Direct redirection to official store checkouts without intermediate redirect tricks or suspicious ads.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'gu' ? 'પ્રોડક્ટ વીડિયો ડેમો' : 'Video Unboxings & Demos'}</span>
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'gu' 
                ? 'ઉત્પાદન ખરીદતા પહેલા તેના વાસ્તવિક ફીચર્સ અને ગુણવત્તા વિડીયો દ્વારા જોઈ શકાય છે.' 
                : 'Inspect video demonstrations and quality unboxings before finalizing any shopping decision.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'gu' ? 'કિંમત ચકાસણી' : 'Price Drop History Verification'}</span>
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'gu' 
                ? 'નકલી ઊંચા MRP ની સામે વાસ્તવિક બચતની ગણતરી કરીને જ પ્રોડક્ટ લિસ્ટ કરીએ છીએ.' 
                : 'We verify that discounts represent genuine price drops against standard median market pricing.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'gu' ? 'પૂર્ણ પારદર્શિતા' : 'Complete Affiliate Transparency'}</span>
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'gu' 
                ? 'અમે તમામ એફિલિએટ સંબંધો ખુલ્લેઆમ જાહેર કરીએ છીએ અને ગ્રાહક પર કોઈ વધારાનો ખર્ચ લાદતા નથી.' 
                : 'We operate transparently in accordance with FTC guidelines and Indian consumer advertising ethics.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
