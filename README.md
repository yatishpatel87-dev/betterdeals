# Better Deals — Smart Links • Better Deals
### એફિલિએટ માર્કેટિંગ પ્લેટફોર્મ અને સિક્યોર એડમિન પેનલ (Affiliate Marketing Platform & Secure Admin Console)

Better Deals એ એક આધુનિક, રિસ્પોન્સિવ અને ઉચ્ચ સુરક્ષા ધરાવતી એફિલિએટ માર્કેટિંગ વેબસાઇટ છે જે Amazon, Flipkart અને અગ્રણી બ્રાન્ડ્સના ચકાસાયેલા ડિસ્કાઉન્ટ સોદા, પ્રોડક્ટ અનબોક્સિંગ વિડીયો અને ફોટો ગેલેરી પ્રદર્શિત કરવા માટે ડિઝાઇન કરવામાં આવી છે.

---

## 🚀 મુખ્ય વિશેષતાઓ (Key Features)

### 1. ગ્રાહક પેનલ (Public Website)
- **મુખ્ય પૃષ્ઠ (`/`)**: ટ્રેન્ડિંગ ડીલ્સ સાથેનો હીરો બેનર, લાઇવ ઑફર્સ, લોકપ્રિય શ્રેણીઓ, ફીચર્ડ પ્રોડક્ટ્સ અને પ્રોમો વિડિઓ પ્રિવ્યૂ.
- **પ્રોડક્ટ વિગતો (`/product/:id`)**: મલ્ટીપલ ફોટો ગેલેરી, સેવિંગ્સ કેલ્ક્યુલેટર, યુટ્યુબ અથવા વિડિઓ ડેમો પ્લેયર, વેરિફાઇડ "Buy Now" એફિલિએટ બટન (નવા ટેબમાં ખુલે છે), સોશિયલ શેરિંગ (WhatsApp, Telegram, લિંક કોપી).
- **શ્રેણીઓ (`/category/:slug`)**: 10 ડિફોલ્ટ કેટેગરીઝ (મોબાઇલ, લેપટોપ, ઇલેક્ટ્રોનિક્સ, હોમ-કિચન, ફેશન, હેલ્થ, વગેરે).
- **સ્પેશિયલ ઑફર્સ (`/offers`)**: 20%, 30%, 50%, 70%+ છૂટવાળા સોદાનું ફિલ્ટર.
- **પ્રોમો વિડિયોઝ (`/videos`)**: અનબોક્સિંગ અને પ્રોડક્ટ ડેમો વિડીયો સાથે સીધા ખરીદી બટન.
- **એફિલિએટ પારદર્શિતા (`/privacy`)**: FTC અને ગ્રાહક માર્ગદર્શિકા મુજબ સંપૂર્ણ એફિલિએટ ડિસ્ક્લોઝર નોટિસ.
- **દ્વિભાષી સપોર્ટ**: ડિફોલ્ટ ભાષા **ગુજરાતી (Gujarati)** અને એક ક્લિકમાં **English** ટોગલ.

### 2. સુરક્ષિત એડમિન પેનલ (Secure Admin Panel)
- **રૂટ**: `/admin` (લૉગિન: `/admin/login`)
- **Google Sign-In**: માત્ર અધિકૃત એડમિન ઈમેલ (`yatishpatel086@gmail.com` અથવા Firestore `admins` માં સક્રિય યુઝર) જ એડમિન કામગીરી કરી શકે છે.
- **ડેશબોર્ડ સ્ટેટિસ્ટિક્સ**: કુલ પ્રોડક્ટ્સ, પ્રકાશિત, ડ્રાફ્ટ્સ, કેટેગરી, ફોટા અને વિડિયો ગણતરી.
- **પ્રોડક્ટ મેનેજમેન્ટ (`/admin/products`)**: પ્રોડક્ટ ઉમેરો/એડિટ કરો/ડિલીટ કરો, લાઈવ પ્રિવ્યૂ, URL ચકાસણી, ફોટો અપલોડર (JPG, PNG, WebP) અને થંબનેલ પસંદગી.
- **કેટેગરી મેનેજમેન્ટ (`/admin/categories`)**: કેટેગરી ઉમેરો, નામ બદલો, ક્રમ (Display Order) ગોઠવો.
- **મીડિયા મેનેજમેન્ટ (`/admin/media`)**: ફોટો અપલોડ અને વિડિઓ (MP4/WebM અથવા YouTube લિંક) સંચાલન.
- **સેટિંગ્સ (`/admin/settings`)**: લોગો, ટેગલાઇન, હીરો બેનર, ટેલિગ્રામ ચેનલ, વોટ્સએપ ગ્રૂપ અને ડિસ્ક્લોઝર ટેક્સ્ટ એડિટર.

---

## 🛠️ Windows પર લોકલ રન કરવાની રીત (Local Setup on Windows)

1. **Node.js ઇન્સ્ટોલ કરો**:
   - જો ઇન્સ્ટોલ ન હોય તો [Node.js (v18+)](https://nodejs.org) ડાઉનલોડ કરીને ઇન્સ્ટોલ કરો.

2. **પ્રોજેક્ટ ફોલ્ડરમાં કમાન્ડ પ્રોમ્પ્ટ (CMD / PowerShell) ખોલો**:
   ```bash
   npm install
   ```

3. **ડેવલપમેન્ટ સર્વર શરૂ કરો**:
   ```bash
   npm run dev
   ```
   બ્રાઉઝરમાં `http://localhost:3000` ઓપન કરો.

---

## 🌐 Firebase કન્સોલમાં Authorized Domains સેટઅપ

Google Sign-In લોકલ અને પ્રોડક્શન બંનેમાં યોગ્ય રીતે ચાલે તે માટે:
1. [Firebase Console](https://console.firebase.google.com) પર જાઓ.
2. તમારો પ્રોજેક્ટ પસંદ કરો -> **Authentication** -> **Settings** ટેબ -> **Authorized domains** પર ક્લિક કરો.
3. નીચેના ડોમેન્સ ઉમેરો:
   - `localhost`
   - તમારો Vercel ડોમેન (દા.ત. `better-deals.vercel.app`)
   - AI Studio ક્લાઉડ રન ડોમેન.

---

## 🚀 GitHub અને Vercel પર ડિપ્લોય કરવાની રીત (Deployment to Vercel)

### 1. GitHub પર અપલોડ કરો:
```bash
git init
git add .
git commit -m "Initial commit - Better Deals affiliate platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/better-deals.git
git push -u origin main
```

### 2. Vercel પર ડિપ્લોય કરો:
1. [Vercel](https://vercel.com) પર લૉગિન કરો.
2. **"Add New Project"** પર ક્લિક કરીને તમારી GitHub repository સિલેક્ટ કરો.
3. Framework Preset: **Vite** પસંદ રહેશે.
4. **Deploy** બટન દબાવો. Vercel 1-2 મિનિટમાં સાઇટ લાઈવ કરી દેશે.

---

## 🔐 સુરક્ષા પરીક્ષણ (Security & Permissions)
- જાહેર મુલાકાતીઓ માત્ર `status: 'published'` વાળા પ્રોડક્ટ્સ અને વિડિયોઝ જોઈ શકે છે.
- બિનઅધિકૃત યુઝર એડમિન પેનલના બટન્સ અથવા ડેટાબેઝ રાઈટ્સ મેળવી શકતો નથી.
- Firestore Security Rules સર્વર સ્તરે આ નિયમો લાગુ કરે છે.
