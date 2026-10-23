import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { SiteSettings, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface ContactPageProps {
  settings: SiteSettings;
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, lang }) => {
  const t = getTranslation(lang);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          {lang === 'gu' ? 'અમારો સંપર્ક કરો' : 'Get in Touch'}
        </h1>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          {lang === 'gu' 
            ? 'ડીલ સબમિટ કરવા, ભાગીદારી અથવા કોઈપણ પ્રશ્ન માટે અમારો સંપર્ક કરો.' 
            : 'Have a question, feedback, or a hot deal tip? We would love to hear from you.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info (Span 5) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <h3 className="font-bold text-base text-white">
              {lang === 'gu' ? 'સંપર્ક વિગત' : 'Contact Details'}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Email</span>
                  <a href={`mailto:${settings.contactEmail}`} className="text-white hover:text-blue-400 font-semibold">
                    {settings.contactEmail || 'contact@betterdeals.in'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-600/10 text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">{lang === 'gu' ? 'ફોન' : 'Phone'}</span>
                  <a href={`tel:${settings.contactPhone}`} className="text-white hover:text-emerald-400 font-semibold">
                    {settings.contactPhone || '+91 98765 43210'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-600/10 text-amber-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">{lang === 'gu' ? 'સ્થળ' : 'Location'}</span>
                  <span className="text-white font-medium">
                    Ahmedabad, Gujarat, India
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
              <span className="font-semibold text-slate-200 block">
                {lang === 'gu' ? 'સોદા સૂચવવા માંગો છો?' : 'Have a deal to recommend?'}
              </span>
              <p>
                {lang === 'gu' 
                  ? 'જો તમને Amazon અથવા Flipkart પર કોઈ અસામાન્ય ડિસ્કાઉન્ટ દેખાય તો અમને મોકલો.' 
                  : 'Send us the product URL and discount details and our team will verify and list it.'}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form (Span 7) */}
        <div className="md:col-span-7">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'gu' ? 'સંદેશ મોકલાઈ ગયો!' : 'Message Sent!'}
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  {lang === 'gu' 
                    ? 'તમારો સંદેશ સફળતાપૂર્વક મળ્યો છે. અમારી ટીમ ટૂંક સમયમાં તમારો સંપર્ક કરશે.' 
                    : 'Thank you for reaching out. We will review your message and reply promptly.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
                >
                  {lang === 'gu' ? 'બીજો સંદેશ મોકલો' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {lang === 'gu' ? 'તમારું નામ' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {lang === 'gu' ? 'ઈમેલ એડ્રેસ' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {lang === 'gu' ? 'વિષય' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    placeholder={lang === 'gu' ? 'ડીલ સૂચન અથવા પૂછપરછ' : 'Deal Suggestion / Inquiry'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {lang === 'gu' ? 'સંદેશ' : 'Message'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    placeholder={lang === 'gu' ? 'તમારો સંદેશ અહીં લખો...' : 'Write your message or deal link here...'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'gu' ? 'સંદેશ મોકલો' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
