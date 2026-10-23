export type Language = 'en' | 'ar';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      vuKids: 'VU Kids',
      visionUpgrade: 'Vision Upgrade',
      digitalMarketing: 'Digital Marketing',
      about: 'About',
      contact: 'Contact',
      explorePrograms: 'Explore Our Programs',
    },
    hero: {
      eyebrow: 'TECHNOLOGY · EDUCATION · DIGITAL GROWTH',
      title: 'Technology that teaches, builds and grows',
      titleAccent: 'businesses',
      description: 'Vision Upgrade runs three connected practices: hands-on learning programs for young learners through VU Kids, our own software and technology solutions, and digital marketing that turns attention into measurable growth.',
      primaryCta: 'Explore Our Programs',
      secondaryCta: 'Contact Us',
      visual: {
        title: 'Vision Upgrade',
        status: 'Three practices, one standard',
        live: 'Live',
        rows: [
          { label: 'VU Kids', caption: 'Learning programs for young minds' },
          { label: 'Vision Upgrade', caption: 'Software and technology solutions' },
          { label: 'Digital Marketing', caption: 'Content, campaigns and growth' },
        ],
        badge: { label: 'DIGITAL GROWTH', value: 'Built to scale' },
      },
      pillars: [
        { title: 'Education', description: 'Structured, practical learning programs for kids.' },
        { title: 'Technology', description: 'Software products and solutions we build ourselves.' },
        { title: 'Marketing', description: 'Digital strategies that move brands forward.' },
      ],
    },
    programsIntro: {
      eyebrow: 'Our Programs',
      title: 'Three practices. One standard of quality.',
      description: 'Each area of Vision Upgrade has its own team, its own craft and its own visual identity — but they share the same commitment to practical, measurable work.',
      items: [
        { index: '01', title: 'VU Kids', description: 'Educational courses and learning programs for kids.' },
        { index: '02', title: 'Vision Upgrade', description: 'Our own software products, technology solutions and innovation.' },
        { index: '03', title: 'Digital Marketing', description: 'Social media, content, branding and online growth.' },
      ],
    },
    vuKids: {
      eyebrow: 'Program 01 · Education',
      title: 'VU Kids',
      description: 'VU Kids is our education arm: learning programs built for children who are curious about how things work. Young learners meet technology through guided, hands-on activities rather than passive theory, so confidence grows alongside understanding.',
      features: [
        { title: 'Age-aware curriculum', description: 'Content is grouped by age band so every session stays challenging without ever losing the fun.' },
        { title: 'Learning by doing', description: 'Children build, test and improve real things instead of memorising instructions on a screen.' },
        { title: 'Creative and friendly', description: 'Colourful, encouraging sessions designed to keep young participants curious and engaged.' },
      ],
      cta: 'Explore VU Kids',
      visual: {
        label: 'LEARNING PATH',
        headline: 'Curiosity first, skills second',
        items: [
          { title: 'Explore', caption: 'Play and discovery' },
          { title: 'Create', caption: 'Building with tools' },
          { title: 'Share', caption: 'Presenting the result' },
        ],
      },
    },
    visionUpgrade: {
      eyebrow: 'Program 02 · Software & Technology',
      title: 'Vision Upgrade',
      description: 'Vision Upgrade is our own technology practice: the software we build, the solutions we engineer and the digital innovation we keep shipping. Everything is designed to be usable, maintainable and ready for real-world load.',
      features: [
        { title: 'Products we own', description: 'Software we design, build and maintain ourselves — shaped by real requirements, not assumptions.' },
        { title: 'Technology solutions', description: 'Web platforms, integrations and internal tools built to fit the way an organisation actually works.' },
        { title: 'Continuous improvement', description: 'Regular releases, performance work and security hygiene keep every product dependable over time.' },
      ],
      cta: 'Explore Our Solutions',
      visual: {
        label: 'BUILD STACK',
        headline: 'Engineering that ships',
        items: [
          { title: 'Products', caption: 'Our own software' },
          { title: 'Platforms', caption: 'Web and integrations' },
          { title: 'Delivery', caption: 'Hosting and operations' },
        ],
      },
    },
    digitalMarketing: {
      eyebrow: 'Program 03 · Digital Marketing',
      title: 'Digital Marketing',
      description: 'Our marketing practice helps brands show up, look credible and grow online. We combine social media management, content creation, branding and campaign thinking into one coherent digital presence.',
      features: [
        { title: 'Social media management', description: 'A steady, on-brand presence across the channels your audience actually uses.' },
        { title: 'Content and branding', description: 'Visual identity and content that stay recognisable across every channel and format.' },
        { title: 'Online growth', description: 'Campaigns planned around outcomes, reviewed and adjusted rather than left to run blind.' },
      ],
      cta: 'Grow Your Business',
      visual: {
        label: 'CAMPAIGN FLOW',
        headline: 'Attention that converts',
        items: [
          { title: 'Target', caption: 'Right audience' },
          { title: 'Distribute', caption: 'Channels and content' },
          { title: 'Measure', caption: 'Results and learning' },
        ],
      },
    },
    about: {
      eyebrow: 'About Vision Upgrade',
      title: 'Where education, technology and marketing meet.',
      description: 'Vision Upgrade was built on a simple idea: the same curiosity that drives a child to take something apart is what drives a good engineer or a sharp campaign.',
      body: 'The three parts of the company feed each other. What our learning programs teach young people about how technology works shows up in how we build software. What we learn about attention and storytelling in marketing shapes how that software is presented to the people who use it. Keeping all three in one company means the feedback loop is short and the quality bar is shared.',
      pillars: [
        { label: 'One company, three perspectives', caption: 'Educators, engineers and marketers sit in the same organisation and plan together.' },
        { label: 'Built for real use', caption: 'Everything we teach, build or campaign is designed to work beyond a demo.' },
        { label: 'Open about what is next', caption: 'Programmes and products are shaped with the people who use them.' },
      ],
      points: [
        { title: 'Education', description: 'Learning that starts with doing' },
        { title: 'Technology', description: 'Software we build and maintain' },
        { title: 'Marketing', description: 'Clear, creative, measurable' },
      ],
      cta: 'Talk To Vision Upgrade',
      visualTitle: 'ONE ORGANISATION',
      visualSubtitle: 'Vision Upgrade',
      visualBody: 'Three practices, one shared standard.',
    },
    whyUs: {
      eyebrow: 'Why Choose Us',
      title: 'How we work',
      description: 'Four principles that shape every program, product and campaign we deliver.',
      items: [
        { title: 'Practical learning', description: 'Concepts are taught by building something real, so knowledge transfers straight into practice.' },
        { title: 'Technology-driven', description: 'Modern tooling and clean engineering keep the solutions we ship fast, stable and scalable.' },
        { title: 'Creative digital', description: 'Original creative thinking for the content, brands and campaigns we put into the world.' },
        { title: 'Continuous improvement', description: 'Every release, lesson and campaign is reviewed and refined instead of being left to drift.' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's build something worth upgrading.",
      description: 'Tell us about your program, product or campaign and we will come back with a clear next step — no hard sell, no vague promises.',
      details: [
        { label: 'EMAIL', value: 'hello@visionupgrade.com' },
        { label: 'PHONE', value: '+00 000 000 0000' },
        { label: 'STUDIO', value: 'Address to be confirmed' },
        { label: 'HOURS', value: 'Monday – Friday, 09:00 – 18:00' },
      ],
      detailsNotice: 'Contact details below are placeholders. Replace them with verified channels before launch.',
      notes: [
        { title: 'Replies within two working days', description: 'Every enquiry is read by a person and answered with a concrete proposal.' },
        { title: 'A short call before a long proposal', description: 'We start by understanding the problem, then suggest the smallest useful next step.' },
        { title: 'No obligation', description: 'You will get a clear recommendation, including when the answer is not to work with us.' },
      ],
      form: {
        submitLabel: 'Send message',
        submittingLabel: 'Sending...',
        successTitle: 'Message received',
        successMessage: "Thanks for reaching out. We'll get back to you within two working days.",
        demoNotice: 'Demo mode: this form validates in the browser but is not connected to a server yet.',
        errorTitle: 'Something went wrong',
        errorMessage: "We couldn't send your message. Please try again or email us directly.",
        retryLabel: 'Try again',
        resetLabel: 'Send another message',
        fields: {
          name: { label: 'Full name*', placeholder: 'Your full name' },
          email: { label: 'Email address*', placeholder: 'you@example.com' },
          phone: { label: 'Phone (optional)', placeholder: '+00 000 000 0000' },
          interest: { label: 'I am interested in*', placeholder: 'Choose an area' },
          interestOptions: [
            'VU Kids — education programs',
            'Vision Upgrade — software & technology',
            'Digital marketing & branding',
            'Something else',
          ],
          message: { label: 'Message*', placeholder: 'Tell us a little about your project...' },
        },
      },
    },
    footer: {
      description: 'Vision Upgrade (VUSoft) is a technology company working across education, software and digital marketing — building practical learning programs, our own software solutions and campaigns that help brands grow.',
      columns: [
        {
          title: 'Company',
          links: [
            { title: 'Home', href: '/#home' },
            { title: 'About', href: '/#about' },
            { title: 'Why Choose Us', href: '/#why-us' },
            { title: 'Contact', href: '/#contact' },
          ],
        },
        {
          title: 'Programs',
          links: [
            { title: 'VU Kids', href: '/#vu-kids' },
            { title: 'Vision Upgrade', href: '/#vision-upgrade' },
            { title: 'Digital Marketing', href: '/#digital-marketing' },
            { title: 'Explore Our Programs', href: '/#programs' },
          ],
        },
      ],
      copyright: '© 2026 Vision Upgrade (VUSoft). All rights reserved.',
    },
    language: {
      switch: 'العربية',
      current: 'English',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      vuKids: 'VU Kids',
      visionUpgrade: 'Vision Upgrade',
      digitalMarketing: 'التسويق الرقمي',
      about: 'من نحن',
      contact: 'اتصل بنا',
      explorePrograms: 'استكشف برامجنا',
    },
    hero: {
      eyebrow: 'التقنية · التعليم · النمو الرقمي',
      title: 'التقنية التي تُعلّم، وتُبنى، وتنمّي',
      titleAccent: 'الأعمال',
      description: 'تدير Vision Upgrade ثلاثة أنشطة مترابطة: برامج تعليمية عملية للشباب من خلال VU Kids، وحلول برمجية وتقنية خاصة بنا، والتسويق الرقمي الذي يحوّل الاهتمام إلى نمو قابل للقياس.',
      primaryCta: 'استكشف برامجنا',
      secondaryCta: 'اتصل بنا',
      visual: {
        title: 'Vision Upgrade',
        status: 'ثلاثة أنشطة. معيار واحد',
        live: 'مباشر',
        rows: [
          { label: 'VU Kids', caption: 'برامج تعليمية لعقول الشباب' },
          { label: 'Vision Upgrade', caption: 'حلول برمجية وتقنية' },
          { label: 'التسويق الرقمي', caption: 'المحتوى، الحملات، والنمو' },
        ],
        badge: { label: 'النمو الرقمي', value: 'مصمم للتوسع' },
      },
      pillars: [
        { title: 'التعليم', description: 'برامج تعليمية عملية ومنهجية للأطفال.' },
        { title: 'التقنية', description: 'منتجات برمجية وحلول نبنيها بأنفسنا.' },
        { title: 'التسويق', description: 'استراتيجيات رقمية تحرك العلامات التجارية.' },
      ],
    },
    programsIntro: {
      eyebrow: 'برامجنا',
      title: 'ثلاثة أنشطة. معيار واحد للجودة.',
      description: 'لكل مجال من مجالات Vision Upgrade فريقه الخاص، وحرفته الخاصة، وهويته البصرية الخاصة — لكنهم جميعًا يشتركون في الالتزام بالعمل العملي والقابل للقياس.',
      items: [
        { index: '٠١', title: 'VU Kids', description: 'دورات تعليمية وبرامج تعلم للأطفال.' },
        { index: '٠٢', title: 'Vision Upgrade', description: 'منتجات برمجية وحلول تقنية مبتكرة نبنيها بأنفسنا.' },
        { index: '٠٣', title: 'التسويق الرقمي', description: 'إدارة وسائل التواصل، المحتوى، الهوية، والنمو الرقمي.' },
      ],
    },
    vuKids: {
      eyebrow: 'البرنامج ٠١ · التعليم',
      title: 'VU Kids',
      description: 'VU Kids هو ذراعنا التعليمي: برامج تعلم مصممة للأطفال الفضوليين حول كيفية عمل الأشياء. يتعلم الشباب التقنية من خلال أنشطة عملية موجهة بدلاً من النظرية السلبية، لينمو الثقة جنبًا إلى جنب مع الفهم.',
      features: [
        { title: 'منهج يناسب العمر', description: 'يتم تجميع المحتوى حسب الفئة العمرية ليبقى كل درس تحديًا دون أن يفقد المتعة.' },
        { title: 'التعلم بالممارسة', description: 'يبني الأطفال ويختبرون ويطورون أشياء حقيقية بدلاً من حفظ التعليمات على الشاشة.' },
        { title: 'إبداعي وودود', description: 'جلسات ملونة ومشجعة مصممة للحفاظ على فضول المشاركين الصغار ومشاركتهم.' },
      ],
      cta: 'استكشف VU Kids',
      visual: {
        label: 'مسار التعلم',
        headline: 'الفضول أولاً، المهارات ثانياً',
        items: [
          { title: 'استكشاف', caption: 'اللعب والاكتشاف' },
          { title: 'إبداع', caption: 'البناء بالأدوات' },
          { title: 'مشاركة', caption: 'عرض النتيجة' },
        ],
      },
    },
    visionUpgrade: {
      eyebrow: 'البرنامج ٠٢ · البرمجيات والتقنية',
      title: 'Vision Upgrade',
      description: 'Vision Upgrade هو ممارستنا التقنية الخاصة: البرمجيات التي نبنيها، والحلول التي نهندسها، والابتكار الرقمي الذي نواصل إطلاقه. كل شيء مصمم ليكون قابلاً للاستخدام والصيانة وجاهزًا للتحميل الحقيقي.',
      features: [
        { title: 'منتجاتنا الخاصة', description: 'برمجيات نصممها ونبنيها ونصونها بأنفسنا — مبنية على متطلبات حقيقية، وليس افتراضات.' },
        { title: 'حلول تقنية', description: 'منصات ويب، وتكاملات، وأدوات داخلية مصممة لتلائم كيفية عمل المنظمة فعليًا.' },
        { title: 'التحسين المستمر', description: 'إصدارات منتظمة، وتحسين الأداء، والنظافة الأمنية تحافظ على موثوقية كل منتج مع مرور الوقت.' },
      ],
      cta: 'استكشف حلولنا',
      visual: {
        label: 'مجموعة التقنيات',
        headline: 'هندسة تُطلق فعليًا',
        items: [
          { title: 'منتجات', caption: 'برمجياتنا الخاصة' },
          { title: 'منصات', caption: 'ويب وتكاملات' },
          { title: 'تسليم', caption: 'استضافة وعمليات' },
        ],
      },
    },
    digitalMarketing: {
      eyebrow: 'البرنامج ٠٣ · التسويق الرقمي',
      title: 'التسويق الرقمي',
      description: 'يساعد ممارستنا التسويقية العلامات التجارية على الظهور، وبناء المصداقية، والنمو عبر الإنترنت. نجمع بين إدارة وسائل التواصل، وإنشاء المحتوى، والهوية البصرية، والتفكير الحملاتي في حضور رقمي متماسك واحد.',
      features: [
        { title: 'إدارة وسائل التواصل الاجتماعي', description: 'حضور ثابت ومتسق مع العلامة التجارية عبر القنوات التي يستخدمها جمهورك فعليًا.' },
        { title: 'المحتوى والهوية البصرية', description: 'هوية بصرية ومحتوى يبقيان قابلين للتعرف عبر جميع القنوات والتنسيقات.' },
        { title: 'النمو عبر الإنترنت', description: 'حملات مخططة بناءً على النتائج، ومُراجَعة ومُعدَّلة بدلاً من تركها تعمل بدون رقابة.' },
      ],
      cta: 'نمِّ عملك',
      visual: {
        label: 'مسار الحملة',
        headline: 'اهتمام يتحول إلى تحويل',
        items: [
          { title: 'استهداف', caption: 'الجمهور المناسب' },
          { title: 'توزيع', caption: 'القنوات والمحتوى' },
          { title: 'قياس', caption: 'النتائج والتعلم' },
        ],
      },
    },
    about: {
      eyebrow: 'عن Vision Upgrade',
      title: 'حيث يلتقي التعليم والتقنية والتسويق.',
      description: 'بُنيت Vision Upgrade على فكرة بسيطة: نفس الفضول الذي يدفع الطفل لتفكيك شيء ما هو ما يدفع المهندس الجيد أو الحملة الذكية.',
      body: 'تتغذى الأجزاء الثلاثة للشركة على بعضها البعض. ما تعلمه برامجنا التعليمية للشباب حول كيفية عمل التقنية يظهر في كيفية بناء البرمجيات لدينا. ما نتعلمه عن الاهتمام وسرد القصص في التسويق يشكل كيفية تقديم تلك البرمجيات للناس الذين يستخدمونها. الحفاظ على الثلاثة معًا في شركة واحدة يعني أن حلقة التغذية الراجعة قصيرة ومعيار الجودة مشترك.',
      pillars: [
        { label: 'شركة واحدة، ثلاث وجهات نظر', caption: 'المربون والمهندسون والمسوقون يجلسون معًا في نفس المنظمة ويخططون معًا.' },
        { label: 'مصمم للاستخدام الواقعي', caption: 'كل ما نعلمه أو نبنيه أو نسوق له مصمم للعمل خارج العرض التوضيحي.' },
        { label: 'منفتحون على ما هو قادم', caption: 'يتم تشكيل البرامج والمنتجات مع الأشخاص الذين يستخدمونها.' },
      ],
      points: [
        { title: 'التعليم', description: 'تعلم يبدأ بالممارسة' },
        { title: 'التقنية', description: 'برمجيات نبنيها ونصونها' },
        { title: 'التسويق', description: 'واضح، إبداعي، قابل للقياس' },
      ],
      cta: 'تحدث مع Vision Upgrade',
      visualTitle: 'منظمة واحدة',
      visualSubtitle: 'Vision Upgrade',
      visualBody: 'ثلاثة أنشطة. معيار مشترك واحد.',
    },
    whyUs: {
      eyebrow: 'لماذا نحن',
      title: 'كيف نعمل',
      description: 'أربعة مبادئ تشكل كل برنامج ومنتج وحملة نقدمها.',
      items: [
        { title: 'تعلم عملي', description: 'يتم تدريس المفاهيم من خلال بناء شيء حقيقي، بحيث ينتقل المعرفة مباشرة إلى التطبيق.' },
        { title: 'مدفوع بالتقنية', description: 'الأدوات الحديثة والهندسة النظيفة تجعل الحلول التي نشحنها سريعة ومستقرة وقابلة للتوسع.' },
        { title: 'رقمي إبداعي', description: 'تفكير إبداعي أصيل للمحتوى والعلامات التجارية والحملات التي نضعها في العالم.' },
        { title: 'تحسين مستمر', description: 'يتم مراجعة كل إصدار ودروس وحملة وتحسينها بدلاً من تركها تتلاشى.' },
      ],
    },
    contact: {
      eyebrow: 'اتصل بنا',
      title: 'لنبنِ شيئًا يستحق التطوير.',
      description: 'أخبرنا عن برنامجك أو منتجك أو حملتك وسنعود إليك بخطوة واضحة التالية — بدون ضغط مبيعات، بدون وعود vague.',
      details: [
        { label: 'البريد الإلكتروني', value: 'hello@visionupgrade.com' },
        { label: 'الهاتف', value: '+00 000 000 0000' },
        { label: 'المكتب', value: 'العنوان قيد التأكيد' },
        { label: 'ساعات العمل', value: 'الاثنين – الجمعة، ٠٩:٠٠ – ١٨:٠٠' },
      ],
      detailsNotice: 'بيانات الاتصال أدناه للعرض فقط ويجب استبدالها بقنوات موثوقة قبل الإطلاق.',
      notes: [
        { title: 'الرد خلال يومي عمل', description: 'يتم قراءة كل استفسار من قبل شخص والإجابة عليه باقتراح ملموس.' },
        { title: 'مكالمة قصيرة قبل عرض مفصّل', description: 'نبدأ بفهم المشكلة، ثم نقترح أصغر خطوة مفيدة التالية.' },
        { title: 'بدون التزام', description: 'ستحصل على توصية واضحة، بما في ذلك عندما يكون الجواب عدم العمل معنا.' },
      ],
      form: {
        submitLabel: 'إرسال الرسالة',
        submittingLabel: 'جارٍ الإرسال...',
        successTitle: 'تم استلام الرسالة',
        successMessage: 'شكراً لتواصلك معنا. سنعود إليك خلال يومي عمل.',
        demoNotice: 'وضع تجريبي: يتحقق النموذج محليًا فقط ولا يتصل بخادم بعد.',
        errorTitle: 'حدث خطأ ما',
        errorMessage: 'لم نتمكن من إرسال رسالتك. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة.',
        retryLabel: 'حاول مرة أخرى',
        resetLabel: 'إرسال رسالة أخرى',
        fields: {
          name: { label: 'الاسم الكامل*', placeholder: 'اسمك الكامل' },
          email: { label: 'البريد الإلكتروني*', placeholder: 'you@example.com' },
          phone: { label: 'الهاتف (اختياري)', placeholder: '+00 000 000 0000' },
          interest: { label: 'أنا مهتم بـ*', placeholder: 'اختر مجالاً' },
          interestOptions: [
            'VU Kids — برامج تعليمية',
            'Vision Upgrade — برمجيات وتقنية',
            'التسويق الرقمي والهوية البصرية',
            'شيء آخر',
          ],
          message: { label: 'الرسالة*', placeholder: 'أخبرنا قليلاً عن مشروعك...' },
        },
      },
    },
    footer: {
      description: 'Vision Upgrade (VUSoft) هي شركة تقنية تعمل عبر التعليم والبرمجيات والتسويق الرقمي — تبني برامج تعليمية عملية، وحلول برمجية خاصة بها، وحملات تساعد العلامات التجارية على النمو.',
      columns: [
        {
          title: 'الشركة',
          links: [
            { title: 'الرئيسية', href: '/#home' },
            { title: 'من نحن', href: '/#about' },
            { title: 'لماذا نحن', href: '/#why-us' },
            { title: 'اتصل بنا', href: '/#contact' },
          ],
        },
        {
          title: 'البرامج',
          links: [
            { title: 'VU Kids', href: '/#vu-kids' },
            { title: 'Vision Upgrade', href: '/#vision-upgrade' },
            { title: 'التسويق الرقمي', href: '/#digital-marketing' },
            { title: 'استكشف برامجنا', href: '/#programs' },
          ],
        },
      ],
      copyright: '© ٢٠٢٦ Vision Upgrade (VUSoft). جميع الحقوق محفوظة.',
    },
    language: {
      switch: 'English',
      current: 'العربية',
    },
  },
} as const;

export function getTranslation(lang: Language) {
  return translations[lang];
}

export const authTranslations = {
  en: {
    loginPage: {
      title: 'The internal workspace for Vision Upgrade.',
      subtitle: 'Manage administrator accounts, publish courses and talk to the team — all from one place.',
      sections: [
        { title: 'Administrator accounts', description: 'Invite colleagues, adjust roles and switch access on and off.' },
        { title: 'Course catalogue', description: 'Prepare drafts and publish the courses VU Kids and clients rely on.' },
        { title: 'Company chat', description: 'Keep day to day conversations in one place with the rest of the team.' },
      ],
      copyright: '© 2026 Vision Upgrade. Internal use only.',
      backToWebsite: 'Back to the website',
      backToWebsiteLong: 'Back to the Vision Upgrade website',
    },
    loginForm: {
      title: 'Sign in to the dashboard',
      subtitle: 'Use your Vision Upgrade administrator account to continue.',
      username: 'Username',
      password: 'Password',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      signIn: 'Sign in',
      signingIn: 'Signing in…',
      prototypeMode: 'Prototype mode',
      prototypeDesc: 'No credentials are checked and no password is ever stored. Use one of the demo accounts with any password of at least eight characters.',
      fillUsername: 'Selecting a username fills it in for you.',
    },
  },
  ar: {
    loginPage: {
      title: 'مساحة العمل الداخلية لـ Vision Upgrade.',
      subtitle: 'إدارة حسابات المسؤولين، ونشر الدورات، والتواصل مع الفريق — كل ذلك في مكان واحد.',
      sections: [
        { title: 'حسابات المسؤولين', description: 'دعوة الزملاء، وتعديل الأدوار، وتفعيل أو إيقاف الوصول.' },
        { title: 'كتالوج الدورات', description: 'إعداد المسودات ونشر الدورات التي يعتمد عليها VU Kids والعملاء.' },
        { title: 'دردشة الشركة', description: 'احتفظ بالمحادثات اليومية في مكان واحد مع بقية الفريق.' },
      ],
      copyright: '© ٢٠٢٦ Vision Upgrade. للاستخدام الداخلي فقط.',
      backToWebsite: 'العودة إلى الموقع',
      backToWebsiteLong: 'العودة إلى موقع Vision Upgrade',
    },
    loginForm: {
      title: 'تسجيل الدخول إلى لوحة التحكم',
      subtitle: 'استخدم حساب المسؤول في Vision Upgrade للمتابعة.',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      showPassword: 'إظهار كلمة المرور',
      hidePassword: 'إخفاء كلمة المرور',
      signIn: 'تسجيل الدخول',
      signingIn: 'جارٍ تسجيل الدخول…',
      prototypeMode: 'وضع تجريبي',
      prototypeDesc: 'لا يتم التحقق من بيانات الاعتماد ولا يتم تخزين كلمة المرور أبدًا. استخدم أحد الحسابات التجريبية مع أي كلمة مرور مكونة من 8 أحرف على الأقل.',
      fillUsername: 'اختيار اسم المستخدم يملأه تلقائياً لك.',
    },
  },
};

export const dashboardTranslations = {
  en: {
    sidebar: {
      workspace: 'Workspace',
      manage: 'Manage',
      dashboard: 'Dashboard overview',
      accounts: 'Admin accounts',
      courses: 'Courses',
      chat: 'Company chat',
      settings: 'Settings',
      home: 'Vision Upgrade dashboard home',
    },
  },
  ar: {
    sidebar: {
      workspace: 'مساحة العمل',
      manage: 'الإدارة',
      dashboard: 'نظرة عامة',
      accounts: 'حسابات المسؤولين',
      courses: 'الدورات',
      chat: 'دردشة الشركة',
      settings: 'الإعدادات',
      home: 'الصفحة الرئيسية للوحة التحكم',
    },
  },
};

