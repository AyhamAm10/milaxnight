export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Header
    nav: {
      features: 'Features',
      howItWorks: 'How it Works',
      testimonial: 'Testimonial',
      login: 'Login',
    },
    // Hero
    hero: {
      tagline: 'Live Your Passion',
      headline: 'Manage tasks with clarity — move faster with Milaknight.',
      subtext: 'A lightweight task manager for individuals and teams. Plan, assign, and track progress in minutes.',
      cta: 'Get Started',
    },
    // Features
    features: {
      title: 'Features',
      subtitle: 'Everything you need to stay organized',
      items: [
        {
          title: 'Smart Boards',
          description: 'Visualize work with simple boards and statuses',
        },
        {
          title: 'Due Dates & Reminders',
          description: 'Stay on time with deadlines and notifications',
        },
        {
          title: 'Team Collaboration',
          description: 'Assign tasks, comment, and keep everyone aligned',
        },
      ],
    },
    // How It Works
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Get started in three simple steps',
      steps: [
        {
          step: '01',
          title: 'Create your workspace',
          description: 'Set up your personalized workspace in seconds',
        },
        {
          step: '02',
          title: 'Add tasks and assign owners',
          description: 'Break down your projects into manageable tasks',
        },
        {
          step: '03',
          title: 'Track progress and complete work',
          description: 'Monitor progress and celebrate achievements',
        },
      ],
    },
    // Testimonial
    testimonial: {
      title: 'What Our Users Say',
      quote: 'Milaknight made our weekly planning effortless. We ship faster and miss fewer details.',
      author: 'Sara A.',
      role: 'Operations Manager',
    },
    // Footer
    footer: {
      tagline: 'Live Your Passion',
      links: {
        about: 'About',
        contact: 'Contact',
        privacy: 'Privacy Policy',
      },
      copyright: '© 2024 Milaknight. All rights reserved.',
    },
    // Login
    login: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your account',
      email: 'Email',
      password: 'Password',
      submit: 'Sign In',
      comingSoon: 'Coming Soon',
      noAccount: "Don't have an account?",
      signUp: 'Sign up',
    },
  },
  ar: {
    // Header
    nav: {
      features: 'الميزات',
      howItWorks: 'كيف يعمل',
      testimonial: 'آراء العملاء',
      login: 'تسجيل الدخول',
    },
    // Hero
    hero: {
      tagline: 'عِش شغفك',
      headline: 'إدارة مهامك بوضوح — واشتغل أسرع مع Milaknight.',
      subtext: 'مدير مهام خفيف للأفراد والفرق. خطّط، عيّن، وتابع التقدم خلال دقائق.',
      cta: 'ابدأ الآن',
    },
    // Features
    features: {
      title: 'الميزات',
      subtitle: 'كل ما تحتاجه للبقاء منظماً',
      items: [
        {
          title: 'لوحات ذكية',
          description: 'عرض المهام بشكل بصري وبحالات واضحة',
        },
        {
          title: 'مواعيد وتذكيرات',
          description: 'التزم بالمواعيد مع تنبيهات بسيطة',
        },
        {
          title: 'تعاون الفريق',
          description: 'تعيين المهام، تعليقات، وتنظيم العمل',
        },
      ],
    },
    // How It Works
    howItWorks: {
      title: 'كيف يعمل',
      subtitle: 'ابدأ في ثلاث خطوات بسيطة',
      steps: [
        {
          step: '٠١',
          title: 'أنشئ مساحة عملك',
          description: 'إعداد مساحة عملك الشخصية في ثوانٍ',
        },
        {
          step: '٠٢',
          title: 'أضف المهام وعيّن المسؤولين',
          description: 'قسّم مشاريعك إلى مهام قابلة للإدارة',
        },
        {
          step: '٠٣',
          title: 'تابع التقدم وأنهِ العمل',
          description: 'راقب التقدم واحتفل بالإنجازات',
        },
      ],
    },
    // Testimonial
    testimonial: {
      title: 'آراء عملائنا',
      quote: 'Milaknight خلّى التخطيط الأسبوعي أسهل بكثير. صار إنجازنا أسرع وتفاصيلنا أوضح.',
      author: 'سارة',
      role: 'مديرة عمليات',
    },
    // Footer
    footer: {
      tagline: 'عِش شغفك',
      links: {
        about: 'من نحن',
        contact: 'تواصل معنا',
        privacy: 'سياسة الخصوصية',
      },
      copyright: '© ٢٠٢٤ Milaknight. جميع الحقوق محفوظة.',
    },
    // Login
    login: {
      title: 'مرحباً بعودتك',
      subtitle: 'سجّل الدخول إلى حسابك',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      submit: 'تسجيل الدخول',
      comingSoon: 'قريباً',
      noAccount: 'ليس لديك حساب؟',
      signUp: 'سجّل الآن',
    },
  },
} as const;

export const getTranslation = (lang: Language) => translations[lang];
