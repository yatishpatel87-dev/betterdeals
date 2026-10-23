import React from 'react';
import { ShieldCheck, Info, FileText, Lock } from 'lucide-react';
import { SiteSettings, Language } from '../types';

interface PrivacyPageProps {
  settings: SiteSettings;
  lang: Language;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ settings, lang }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          {lang === 'gu' ? 'પ્રાઈવસી પોલિસી અને એફિલિએટ ડિસ્ક્લોઝર' : 'Privacy Policy & Affiliate Disclosure'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {lang === 'gu' ? 'છેલ્લે અપડેટ: ઓક્ટોબર 2026' : 'Last Updated: October 2026'}
        </p>
      </div>

      {/* Main Affiliate Disclosure Box */}
      <div className="bg-blue-950/40 border border-blue-500/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2.5 text-blue-300 font-bold text-base">
          <Info className="w-5 h-5 text-amber-400" />
          <span>{lang === 'gu' ? 'સંપૂર્ણ એફિલિએટ જાહેરાત (Affiliate Disclaimer)' : 'Comprehensive Affiliate Disclosure'}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {settings.affiliateDisclosure || 
            `Better Deals is an affiliate marketing platform that participates in the Amazon Services LLC Associates Program and Flipkart Affiliate Network, designed to provide a means for websites to earn advertising fees by linking to Amazon.in and Flipkart.com.`}
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          {lang === 'gu' 
            ? 'જ્યારે તમે અમારી વેબસાઇટ પરની એફિલિએટ લિંક પર ક્લિક કરીને પ્રોડક્ટ ખરીદો છો, ત્યારે વેચાણકર્તા સ્ટોર અમને ચોક્કસ ટકાવારી કમિશન આપી શકે છે. આ કમિશન તમારા અંતિમ બિલ પર કોઈ વધારાનો બોજ નાખતું નથી. ઉત્પાદનની કિંમત અને ઓફર સ્ટોર દ્વારા સીધી નિર્ધારિત કરવામાં આવે છે.'
            : 'Clicking our affiliate links directs you straight to verified retail portals. We do not sell goods directly and do not store financial payment information on our servers. All transaction disputes, shipping, and warranty claims belong strictly between the customer and the respective merchant platform.'}
        </p>
      </div>

      {/* Privacy Policy */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <div className="flex items-center gap-2 text-white font-bold text-base border-b border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-emerald-400" />
          <span>{lang === 'gu' ? '1. ડેટા સુરક્ષા અને પ્રાઈવસી' : '1. Data Privacy & Collection'}</span>
        </div>
        <p>
          {lang === 'gu'
            ? 'અમે કોઈપણ જાહેર મુલાકાતી પાસેથી પાસવર્ડ, બેંક વિગતો કે ક્રેડિટ કાર્ડ જેવી સંવેદનશીલ વિગતો એકત્ર કરતા નથી. સાઇટ માત્ર કૂકીઝ અને રેફરલ ટ્રેકિંગ કોડ્સનો ઉપયોગ કરે છે જેથી એફિલિએટ ખરીદીઓ નોંધાઈ શકે.'
            : 'Better Deals does not collect or store credit card credentials, bank account passwords, or sensitive personal data. We use standard browser cookies to facilitate outbound affiliate referral attribution.'}
        </p>

        <div className="flex items-center gap-2 text-white font-bold text-base border-b border-slate-800 pb-3 pt-4">
          <FileText className="w-5 h-5 text-blue-400" />
          <span>{lang === 'gu' ? '2. ત્રીજા પક્ષની લિંક્સ (Third-Party Links)' : '2. Third-Party Websites & External Retailers'}</span>
        </div>
        <p>
          {lang === 'gu'
            ? 'અમારી વેબસાઇટમાં બાહ્ય વેબસાઇટ્સ (જેમ કે Amazon.in, Flipkart.com, વગેરે) ની લિંક્સ શામેલ છે. એકવાર તમે અમારી સાઇટ છોડીને તેમની વેબસાઇટ પર જાઓ છો, ત્યારે તેમની પોતાની પ્રાઈવસી પોલિસી અને નિયમો લાગુ પડે છે.'
            : 'Our website contains links to external retail domains. Once you transition to Amazon, Flipkart, or partner stores, your transaction is governed by the terms and privacy practices of that platform.'}
        </p>

        <div className="flex items-center gap-2 text-white font-bold text-base border-b border-slate-800 pb-3 pt-4">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span>{lang === 'gu' ? '3. કિંમતો અને ઉપલબ્ધતા' : '3. Price and Stock Accuracy'}</span>
        </div>
        <p>
          {lang === 'gu'
            ? 'ઓનલાઇન શોપિંગ સ્ટોર્સ પર કિંમતો અને સ્ટોક કોઈપણ સમયે બદલાઈ શકે છે. અમે નિયમિતપણે કિંમતો અપડેટ કરવાનો પ્રયત્ન કરીએ છીએ, પરંતુ ખરીદી કરતા પહેલા મર્ચન્ટના પેજ પર અંતિમ કિંમત ચકાસવી ગ્રાહકની જવાબદારી છે.'
            : 'Product prices, promo codes, and availability fluctuate based on merchant flash sales. While our system endeavors to maintain updated information, the price displayed on the merchant site at checkout is the definitive legal price.'}
        </p>
      </div>
    </div>
  );
};
