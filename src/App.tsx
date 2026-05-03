/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Dumbbell, 
  Utensils, 
  LineChart, 
  CheckCircle2, 
  ShieldCheck, 
  Wallet, 
  AlertTriangle,
  MessageCircle,
  Menu,
  ChevronLeft
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  return (
    <div className="min-h-screen bg-surface-base text-on-surface font-sans selection:bg-brand-primary selection:text-surface-base">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-surface-base/80 backdrop-blur-md border-b border-brand-primary/10">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-brand-primary rounded-lg overflow-hidden w-10 h-10">
              <img src="/logo.jpeg" alt="NAWA Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-on-surface">NAWA <span className="text-brand-primary">نواة</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#" className="text-brand-primary font-bold transition-colors">الرئيسية</a>
            <a href="#about" className="text-on-surface/60 hover:text-brand-primary font-medium transition-colors">عن الكوتش</a>
            <a href="#plans" className="text-on-surface/60 hover:text-brand-primary font-medium transition-colors">الخطط</a>
            <a href="#contact" className="text-on-surface/60 hover:text-brand-primary font-medium transition-colors">اتصل بنا</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-left ml-4">
              <p className="text-xs text-on-surface/40 uppercase font-mono tracking-widest text-right">Coach</p>
              <p className="text-sm font-bold text-right">يوسف محمد</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-brand-primary p-0.5">
              <img 
                src="/youssef.jpeg" 
                alt="Coach" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <button className="md:hidden p-2 text-brand-primary">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 px-6 overflow-hidden hero-gradient">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8">
                ابدأ رحلتك نحو <br />
                <span className="text-brand-primary">جسم أقوى</span> ونظام حياة أفضل
              </h1>
              <p className="text-xl text-on-surface/60 max-w-2xl mx-auto mb-12 leading-relaxed">
                نحن لا نقدم مجرد تمارين، بل نصمم لك خارطة طريق متكاملة للوصول إلى النسخة الأفضل من ذاتك تحت إشراف نخبة من المتخصصين.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-12 py-5 bg-brand-primary text-surface-base font-bold rounded-2xl hover:bg-brand-secondary transition-all transform active:scale-95 shadow-xl shadow-brand-primary/20">
                  ابدأ الآن
                </button>
                <button className="w-full sm:w-auto px-12 py-5 border border-brand-primary/30 text-brand-primary font-bold rounded-2xl hover:bg-brand-primary/5 transition-all">
                  تعرف علينا
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center bg-surface-card rounded-[2rem] p-10 md:p-16 border border-brand-primary/10">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-brand-primary/20 shadow-2xl">
                <img 
                  src="/youssef.jpeg" 
                  alt="Professional Fitness Coach" 
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-base/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-24 h-24 md:w-40 md:h-40 bg-brand-primary rounded-full flex items-center justify-center p-6 shadow-2xl rotate-12">
                <p className="text-surface-base font-black text-center text-xs md:text-sm leading-tight">5+ أعوام خبرة</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-2"
            >
              <p className="text-xl md:text-2xl text-on-surface leading-relaxed text-right font-medium">
                أنا مدرب متخصص في تحسين الأداء البدني وإعادة تكوين الجسم، أساعدك في الوصول لأفضل نسخة من نفسك من خلال نهج علمي وعملي يركز على النتائج المستدامة.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Dumbbell, label: "برامج مخصصة" },
                  { icon: Utensils, label: "نظام غذائي عملي" },
                  { icon: LineChart, label: "متابعة مستمرة" }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-surface-base rounded-2xl border border-brand-primary/10 flex flex-col items-center gap-3 text-center transition-transform hover:-translate-y-1">
                    <item.icon className="w-8 h-8 text-brand-primary" />
                    <span className="font-bold text-sm">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-4">
                <p className="text-brand-primary font-bold text-sm tracking-widest uppercase">التركيز دائمًا على:</p>
                <div className="flex flex-wrap gap-3">
                  {["الاستمرارية", "التقدم الحقيقي", "عادات قوية"].map((tag) => (
                    <span key={tag} className="px-6 py-2 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full text-sm font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Offer Banner */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden bg-gradient-to-l from-surface-card to-brand-primary/5 rounded-[2rem] p-10 md:p-14 border border-brand-primary/30"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] -mr-32 -mt-32" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="text-right space-y-4">
                <span className="inline-block bg-red-500 text-white text-xs font-black px-4 py-1.5 rounded-full animate-pulse uppercase tracking-widest mb-2">
                  أماكن محدودة
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">عرض عيد الأضحى <br/> المبارك</h2>
                <p className="text-on-surface/50 text-lg">خصومات حصرية تبدأ من 25% على جميع الباقات لفترة محدودة</p>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { months: "3 شهور", price: "199", size: "small" },
                  { months: "6 شهور", price: "349", size: "large" },
                  { months: "12 شهر", price: "599", size: "small" }
                ].map((off, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-surface-base p-8 rounded-2xl border-2 border-brand-primary/20 flex flex-col items-center min-w-[160px] ${off.size === 'large' ? 'scale-110 shadow-2xl shadow-brand-primary/10 border-brand-primary' : 'opacity-70'}`}
                  >
                    <span className="text-sm font-bold text-on-surface/40 mb-2">{off.months}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-brand-primary font-mono">{off.price}</span>
                      <span className="text-lg font-bold text-brand-primary">£</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Plans Section */}
        <section id="plans" className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 italic">اختر خطتك التدريبية</h2>
            <div className="h-1.5 w-24 bg-brand-primary mx-auto rounded-full" />
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start"
          >
            {[
              { 
                title: "الباقة الفضية", 
                period: "3 شهور", 
                price: "249", 
                features: ["برنامج تدريبي مخصص", "خطة غذائية مرنة", "متابعة أسبوعية", "تواصل عبر التطبيق"] 
              },
              { 
                title: "الباقة الذهبية", 
                period: "6 شهور", 
                price: "429", 
                best: true,
                features: ["كل مميزات الفضية", "تعديل الخطة كل أسبوعين", "مكالمة زووم شهرية", "دليل المكملات الغذائية"] 
              },
              { 
                title: "باقة النخبة", 
                period: "12 شهر", 
                price: "799", 
                features: ["كل مميزات الذهبية", "متابعة يومية مباشرة", "جلسات تدريب خاصة", "دخول مجاني للفعاليات"] 
              },
              { 
                title: "باقة التجهيز", 
                period: "تحضير بطولة", 
                price: "999", 
                features: ["تحليل كيميائي للجسم", "خطة تنشيف احترافية", "وضعيات العرض المسرحي", "دعم كامل حتى يوم العرض"] 
              }
            ].map((plan, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className={`group relative p-8 rounded-[2rem] border transition-all duration-300 flex flex-col h-full ${plan.best ? 'bg-surface-base border-brand-primary scale-105 shadow-2xl shadow-brand-primary/10' : 'bg-surface-card border-brand-primary/10 hover:border-brand-primary/40'}`}
              >
                {plan.best && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-surface-base px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    Best Value
                  </div>
                )}
                <h3 className="text-2xl font-black mb-1">{plan.title}</h3>
                <p className="text-on-surface/40 text-sm font-bold mb-6">{plan.period}</p>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-4xl font-black text-brand-primary font-mono">{plan.price}</span>
                  <span className="text-xl font-bold text-brand-primary">£</span>
                </div>
                
                <ul className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-on-surface/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-black transition-all ${plan.best ? 'bg-brand-primary text-surface-base hover:bg-brand-secondary' : 'border border-brand-primary/40 text-brand-primary hover:bg-brand-primary group-hover:text-surface-base'}`}>
                  اشترك الآن
                </button>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Feature Cards */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-surface-card rounded-3xl border border-brand-primary/10 flex flex-col items-start gap-4">
              <div className="p-4 bg-brand-primary/10 rounded-2xl">
                <Wallet className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-black">الدفع الكامل</h3>
              <p className="text-on-surface/50 leading-relaxed">
                احصل على خصم إضافي <span className="text-brand-primary font-bold">5%</span> عند سداد قيمة الاشتراك بالكامل مقدماً.
              </p>
              <p className="text-xs text-on-surface/20 mt-2">* تطبق الشروط والأحكام الخاصة بالاسترداد.</p>
            </div>
            
            <div className="p-10 bg-surface-card rounded-3xl border border-brand-primary/10 flex flex-col items-start gap-4">
              <div className="p-4 bg-brand-primary/10 rounded-2xl">
                <ShieldCheck className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-black">نظام الأقساط</h3>
              <p className="text-on-surface/50 leading-relaxed">
                يمكنك تقسيط الاشتراك على <span className="text-brand-primary font-bold">3 دفعات</span> متساوية بدون فوائد إضافية.
              </p>
              <p className="text-xs text-on-surface/20 mt-2">* متوفر لبعض الباقات المحددة فقط.</p>
            </div>
          </div>
        </section>

        {/* Refund Policy */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="bg-surface-card rounded-[2.5rem] p-10 md:p-16 border border-brand-primary/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-primary/5 -skew-x-12 -ml-20 pointer-events-none" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-brand-primary">سياسة الاسترجاع</h2>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 text-xl font-bold">
                     <ShieldCheck className="w-6 h-6 text-brand-primary" />
                     <span>الشروط</span>
                   </div>
                   <ul className="space-y-4">
                     {[
                       "الالتزام بالجدول الزمني المخصص",
                       "تقديم البيانات والتقييمات بدقة",
                       "طلب الاسترجاع خلال 7 أيام من البدء"
                     ].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 text-on-surface/60">
                         <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              </div>

              <div className="bg-surface-base p-8 rounded-3xl border-r-8 border-yellow-500 shadow-xl">
                 <div className="flex items-center gap-3 mb-6">
                   <AlertTriangle className="w-7 h-7 text-yellow-500" />
                   <h3 className="text-xl font-bold">ملاحظات هامة</h3>
                 </div>
                 <ul className="space-y-4 text-on-surface/50 text-sm leading-relaxed list-disc list-inside">
                   <li>يتم خصم رسوم التحويل والخدمات الإدارية من المبلغ المسترد.</li>
                   <li>الاسترجاع لا يشمل الباقات المخفضة أو عروض المناسبات الخاصة مثل (رمضان، الأضحى).</li>
                 </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="max-w-7xl mx-auto px-6 py-32 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-24 italic">كيف نبدأ العمل؟</h2>
          
          <div className="relative grid md:grid-cols-3 gap-16 md:gap-8">
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-brand-primary/10 -z-10" />
            
            {[
              { num: "1", title: "اختيار الباقة", text: "اختر الخطة التي تناسب احتياجاتك وأهدافك البدنية." },
              { num: "2", title: "تعبئة البيانات", text: "قم بتعبئة نموذج التقييم الشامل لحالتك الصحية والبدنية." },
              { num: "3", title: "انطلاق الخطة", text: "استلم خطتك المخصصة وابدأ التدريب مع المتابعة اليومية." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="w-24 h-24 rounded-full bg-brand-primary flex items-center justify-center text-3xl font-black text-surface-base shadow-2xl ring-8 ring-brand-primary/10">
                  {step.num}
                </div>
                <h3 className="text-2xl font-black">{step.title}</h3>
                <p className="text-on-surface/50 max-w-[200px] leading-relaxed italic">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="max-w-5xl mx-auto px-6 py-24">
          <div className="bg-gradient-to-br from-brand-primary to-green-600 p-12 md:p-20 rounded-[3rem] text-center shadow-2xl shadow-brand-primary/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-black text-surface-base mb-6">لديك استفسار؟ <br/> نحن هنا للمساعدة</h2>
              <p className="text-surface-base/80 text-xl font-medium mb-12 max-w-xl mx-auto italic">
                تواصل معنا مباشرة عبر الواتساب للحصول على استشارة سريعة بخصوص الباقة الأنسب لك ولأهدافك.
              </p>
              <button className="bg-white text-green-600 px-12 py-5 rounded-full font-black text-xl flex items-center gap-4 mx-auto hover:bg-slate-50 transition-all shadow-xl group-hover:shadow-white/20">
                <MessageCircle className="w-8 h-8 fill-green-600 text-green-600" />
                تواصل عبر واتساب
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-base border-t border-brand-primary/10 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-right">
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Dumbbell className="w-10 h-10 text-brand-primary" />
              <span className="text-3xl font-black tracking-tighter">NAWA ELITE</span>
            </div>
            <p className="text-on-surface/30 font-medium italic">Transforming lives through science and sweat.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-black uppercase tracking-widest text-on-surface/60">
            <a href="#" className="hover:text-brand-primary transition-colors">الرئيسية</a>
            <a href="#" className="hover:text-brand-primary transition-colors">عن الكوتش</a>
            <a href="#" className="hover:text-brand-primary transition-colors">خطط التدريب</a>
            <a href="#" className="hover:text-brand-primary transition-colors">اتصل بنا</a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-on-surface/20 uppercase tracking-widest">
          <p>© 2024 NAWA COACHING. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <p>DESIGNED FOR PERFORMANCE</p>
            <p>BUILT FOR RESULTS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
