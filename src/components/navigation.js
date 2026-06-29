import { CONFIG } from '../config.js';

export const HEADER_HTML = `
  <nav class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="rounded-xl overflow-hidden w-10 h-10 border border-white/10 bg-[#f7f6f2] flex items-center justify-center shadow-sm relative">
        <img src="/logo.jpeg" alt="NAWA Logo" class="w-full h-full object-cover scale-[1.7]" />
      </div>
      <span class="text-2xl font-black tracking-tighter text-on-surface">NAWA <span class="text-primary">نواة</span></span>
    </div>
     <div class="hidden md:flex items-center gap-10">
      <a href="/index.html#hero" class="nav-link text-on-surface/60 hover:text-primary font-medium transition-colors">الرئيسية</a>
      <a href="/about.html" class="nav-link text-on-surface/60 hover:text-primary font-medium transition-colors">عن الكوتش</a>
      <a href="/index.html#plans" class="nav-link text-on-surface/60 hover:text-primary font-medium transition-colors">الباقات والاشتراكات</a>
      <a href="/index.html#success-stories" class="nav-link text-on-surface/60 hover:text-primary font-medium transition-colors">قصص النجاح</a>
      <a href="/calculator.html" class="nav-link text-on-surface/60 hover:text-primary font-medium transition-colors">حاسبة اللياقة</a>
    </div>

    <div class="flex items-center gap-4">
      <div class="hidden sm:block text-left ml-4">
        <p class="text-xs text-on-surface/40 uppercase font-mono tracking-widest text-right">Coach</p>
        <p class="text-sm font-bold text-right">يوسف محمد</p>
      </div>
      <div class="w-10 h-10 rounded-full border-2 border-primary p-0.5">
        <img 
          src="/youssef.jpeg" 
          alt="Coach" 
          class="w-full h-full object-cover rounded-full"
        />
      </div>
      <button id="mobile-menu-btn" class="md:hidden p-2 text-primary">
        <i data-lucide="menu" class="w-6 h-6"></i>
      </button>
    </div>
  </nav>
`;

export const MOBILE_MENU_HTML = `
  <div id="mobile-menu-backdrop" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300 md:hidden"></div>
  
  <div id="mobile-menu" class="fixed inset-y-0 right-0 z-[110] w-full max-w-[280px] bg-background border-l border-primary/20 translate-x-full transition-transform duration-500 md:hidden sidebar-shadow">
    <div class="flex flex-col h-full overflow-y-auto">
      <div class="p-6 flex justify-between items-center border-b border-white/5 bg-surface-container/50 backdrop-blur-md sticky top-0 z-10">
        <span class="text-xl font-black text-on-surface">NAWA <span class="text-primary">نواة</span></span>
        <button id="close-menu-btn" class="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
      </div>
      
      <nav class="flex flex-col p-4 gap-2">
        <a href="/index.html#hero" class="mobile-nav-link flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group">
          <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface/40 group-hover:bg-primary group-hover:text-background transition-all">
            <i data-lucide="home" class="w-5 h-5"></i>
          </div>
          <span class="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">الرئيسية</span>
        </a>
        
        <a href="/about.html" class="mobile-nav-link flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group">
          <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface/40 group-hover:bg-primary group-hover:text-background transition-all">
            <i data-lucide="user" class="w-5 h-5"></i>
          </div>
          <span class="text-lg font-bold text-on-surface/60 group-hover:text-primary transition-colors">عن الكوتش</span>
        </a>
        
        <a href="/index.html#plans" class="mobile-nav-link flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group">
          <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface/40 group-hover:bg-primary group-hover:text-background transition-all">
            <i data-lucide="layout-grid" class="w-5 h-5"></i>
          </div>
          <span class="text-lg font-bold text-on-surface/60 group-hover:text-primary transition-colors">الباقات والاشتراكات</span>
        </a>
        
        <a href="/index.html#success-stories" class="mobile-nav-link flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group">
          <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface/40 group-hover:bg-primary group-hover:text-background transition-all">
            <i data-lucide="trophy" class="w-5 h-5"></i>
          </div>
          <span class="text-lg font-bold text-on-surface/60 group-hover:text-primary transition-colors">قصص النجاح</span>
        </a>
        
        <a href="/calculator.html" class="mobile-nav-link flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group">
          <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface/40 group-hover:bg-primary group-hover:text-background transition-all">
            <i data-lucide="calculator" class="w-5 h-5"></i>
          </div>
          <span class="text-lg font-bold text-on-surface/60 group-hover:text-primary transition-colors">حاسبة اللياقة</span>
        </a>
      </nav>
 
      <div class="mt-auto p-6 border-t border-white/5 bg-surface-container/30">
        <div class="flex items-center gap-4 mb-6">
          <div class="relative">
            <div class="w-12 h-12 rounded-full border-2 border-primary p-0.5">
              <img src="/youssef.jpeg" alt="Coach" class="w-full h-full object-cover rounded-full" />
            </div>
            <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
          </div>
          <div class="text-right">
            <p class="text-[10px] text-on-surface/40 uppercase font-mono tracking-widest leading-none mb-1">Coach</p>
            <p class="text-sm font-bold text-on-surface">يوسف محمد</p>
          </div>
        </div>
        <a href="https://wa.me/\${CONFIG.whatsappNumber}" class="flex items-center justify-center gap-3 w-full py-4 bg-primary text-background font-black rounded-xl text-center shadow-lg shadow-primary/20 hover:bg-secondary transition-all active:scale-95">
          <i data-lucide="zap" class="w-5 h-5 fill-current"></i>
          ابدأ رحلتك الآن
        </a>
      </div>
    </div>
  </div>
`;

export const FOOTER_HTML = `
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-right">
    <div class="space-y-4">
      <div class="flex items-center justify-center md:justify-start gap-4">
        <div class="rounded-xl overflow-hidden w-12 h-12 border border-white/10 bg-[#f7f6f2] flex items-center justify-center shadow-md relative">
          <img src="/logo.jpeg" alt="NAWA Logo" class="w-full h-full object-cover scale-[1.7]" />
        </div>
        <span class="text-3xl font-black tracking-tighter">NAWA ELITE</span>
      </div>
      <p class="text-on-surface/30 font-medium italic">Transforming lives through science and sweat.</p>
    </div>

    <div class="flex flex-wrap justify-center gap-8 text-sm font-bold tracking-wide text-on-surface/60">
      <a href="/index.html#hero" class="hover:text-primary transition-colors">الرئيسية</a>
      <a href="/about.html" class="hover:text-primary transition-colors">عن الكوتش</a>
      <a href="/index.html#plans" class="hover:text-primary transition-colors">الباقات والاشتراكات</a>
      <a href="/index.html#success-stories" class="hover:text-primary transition-colors">قصص النجاح</a>
      <a href="/calculator.html" class="hover:text-primary transition-colors">حاسبة اللياقة</a>
    </div>
  </div>
  
  <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-on-surface/20 uppercase tracking-widest">
    <p>© 2024 NAWA COACHING. ALL RIGHTS RESERVED.</p>
    <div class="flex gap-4">
      <p>DESIGNED FOR PERFORMANCE</p>
      <p>BUILT FOR RESULTS</p>
    </div>
  </div>
`;

export const WHATSAPP_BTN_HTML = `
  <a 
    href="https://wa.me/${CONFIG.whatsappNumber}" 
    target="_blank" 
    class="fixed bottom-8 left-8 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
    aria-label="WhatsApp"
  >
    <i data-lucide="message-circle" class="w-8 h-8 fill-white"></i>
    <span class="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-surface-container text-on-surface px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-primary/20 shadow-xl">
      تواصل معنا
    </span>
  </a>
`;
