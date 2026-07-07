# Masari Backend — Explained Simply
# الشرح المبسّط للـ Backend الخاص بمشروع مساري

> A study guide for presenting the Masari backend. Every section is written first in **simple English**, then in **Arabic (العربية)**.
> دليل للتحضير لعرض مشروع مساري. كل قسم مكتوب أولًا بالإنجليزية المبسّطة ثم بالعربية.

---

## 0. What is Masari? / ما هو مساري؟

**English:** Masari is a **student task-management app** for university students. Students sign up, add their assignments/tasks with deadlines, organize them by course and priority, and the app reminds them before a deadline. It also shows analytics (how productive they are) and has an admin panel to manage educational content (levels, subjects, resources).

**العربية:** مساري هو **تطبيق لإدارة مهام الطلاب** الجامعيين. الطالب يسجّل حساب، يضيف مهامه وواجباته مع مواعيد التسليم، ينظّمها حسب المادة والأولوية، والتطبيق يذكّره قبل قرب الموعد. كما يعرض إحصائيات عن إنتاجيته، ويحتوي على لوحة تحكم (Admin) لإدارة المحتوى التعليمي (المستويات، المواد، المصادر).

---

## 1. What is a "Backend"? / ما هو الـ "Backend"؟

**English:** Think of a restaurant 🍽️:
- The **Frontend** is the dining room — what the customer sees and touches (menu, tables). This is the website/app screen.
- The **Backend** is the kitchen — the customer never sees it, but it does the real work: cooking the food, storing ingredients, following recipes.
- The **Database** is the fridge/storage — where all ingredients (data) are kept.

The backend receives **requests** ("I want a pizza"), does the work (checks who you are, cooks it, saves the order), and sends back a **response** ("here is your pizza").

**العربية:** تخيّل مطعمًا 🍽️:
- الـ **Frontend** هو صالة الطعام — ما يراه الزبون ويتعامل معه (القائمة، الطاولات). أي شاشة الموقع أو التطبيق.
- الـ **Backend** هو المطبخ — الزبون لا يراه، لكنه يقوم بالعمل الحقيقي: تحضير الطعام، تخزين المكوّنات، اتباع الوصفات.
- الـ **Database (قاعدة البيانات)** هي الثلاجة/المخزن — حيث تُحفظ كل المكوّنات (البيانات).

الـ Backend يستقبل **طلبًا** ("أريد بيتزا")، ينفّذ العمل (يتحقق من هويتك، يحضّرها، يحفظ الطلب)، ثم يُرجع **ردًّا** ("تفضّل البيتزا").

---

## 2. What technologies did we use? / ما التقنيات المستخدمة؟

**English:** The backend is built with **JavaScript (Node.js)**. The main tools:

| Tool | What it does (simple) |
|------|------------------------|
| **Node.js** | Lets us run JavaScript on the server (not just in the browser). |
| **Express** | The web framework — handles incoming requests and routes them. The "waiter" system. |
| **MongoDB** | The database — stores users, tasks, notifications, etc. |
| **Mongoose** | A helper that lets our code talk to MongoDB using simple objects (defines the "shape" of our data). |
| **JWT (jsonwebtoken)** | Digital ID cards — proves who a logged-in user is. |
| **bcryptjs** | Scrambles (hashes) passwords so we never store the real password. |
| **Zod** | Checks that incoming data is valid (e.g. email is really an email). |
| **Nodemailer** | Sends emails (like the "reset your password" email). |
| **node-cron** | A timer/alarm that runs a job on schedule (e.g. every 15 minutes) to create deadline reminders. |
| **helmet / cors / rate-limit** | Security guards (explained in section 8). |

**العربية:** الـ Backend مبني بلغة **JavaScript** عبر **Node.js**. أهم الأدوات:

| الأداة | ماذا تفعل (ببساطة) |
|--------|---------------------|
| **Node.js** | تمكّننا من تشغيل JavaScript على الخادم (وليس فقط داخل المتصفح). |
| **Express** | إطار العمل للويب — يستقبل الطلبات ويوجّهها. بمثابة نظام "النادل". |
| **MongoDB** | قاعدة البيانات — تخزّن المستخدمين، المهام، الإشعارات… إلخ. |
| **Mongoose** | وسيط يسهّل التخاطب مع MongoDB عبر كائنات بسيطة (ويحدّد "شكل" البيانات). |
| **JWT** | بطاقات هوية رقمية — تُثبت هوية المستخدم المسجَّل دخوله. |
| **bcryptjs** | يشفّر (Hash) كلمات المرور حتى لا نخزّن كلمة المرور الحقيقية أبدًا. |
| **Zod** | يتحقّق من صحة البيانات الواردة (مثلًا أن البريد بريد حقيقي). |
| **Nodemailer** | يرسل الإيميلات (مثل إيميل إعادة تعيين كلمة المرور). |
| **node-cron** | مؤقّت/منبّه يشغّل مهمة بشكل دوري (كل 15 دقيقة) لإنشاء تذكيرات المواعيد. |
| **helmet / cors / rate-limit** | حرّاس الأمان (مشروحون في القسم 8). |

---

## 3. The journey of one request / رحلة الطلب الواحد

**English:** This is the most important idea to explain in your presentation. When a user does something (e.g. "create a task"), the request travels through **layers**, each with one job:

```
  📱 Frontend
     │  sends:  POST /api/tasks   { title, deadline, ... }
     ▼
  ┌─────────────────────────────────────────────────────┐
  │ 1. app.js        → security checks + find the route  │
  │ 2. Route         → "this URL maps to this function"  │
  │ 3. Middleware    → is the user logged in? is data ok?│
  │ 4. Controller    → reads the request, calls service  │
  │ 5. Service       → the real logic (business rules)   │
  │ 6. Model         → saves/reads from MongoDB          │
  └─────────────────────────────────────────────────────┘
     │  returns:  { success: true, data: { task } }
     ▼
  📱 Frontend shows the new task
```

Each layer only does its own job and passes work to the next. This makes the code **organized and easy to fix**.

**العربية:** هذه أهم فكرة اشرحها في العرض. عندما يقوم المستخدم بعمل ما (مثل "إنشاء مهمة")، ينتقل الطلب عبر **طبقات**، لكل طبقة وظيفة واحدة:

```
  📱 الواجهة (Frontend)
     │  ترسل:  POST /api/tasks   { title, deadline, ... }
     ▼
  ┌──────────────────────────────────────────────────────────┐
  │ 1. app.js       → فحوصات الأمان + تحديد المسار            │
  │ 2. Route        → "هذا الرابط يقابله هذه الوظيفة"          │
  │ 3. Middleware   → هل المستخدم مسجّل دخوله؟ هل البيانات صحيحة؟│
  │ 4. Controller   → يقرأ الطلب ويستدعي الـ Service           │
  │ 5. Service      → المنطق الحقيقي (قواعد العمل)             │
  │ 6. Model        → يحفظ/يقرأ من قاعدة البيانات MongoDB      │
  └──────────────────────────────────────────────────────────┘
     │  يُرجع:  { success: true, data: { task } }
     ▼
  📱 الواجهة تعرض المهمة الجديدة
```

كل طبقة تؤدي وظيفتها فقط وتسلّم العمل للطبقة التالية. هذا يجعل الكود **منظّمًا وسهل الإصلاح**.

---

## 4. The folder structure / هيكل المجلدات

**English:** Inside `server/src/` everything is split by responsibility:

```
server/src/
├── server.js       → Starts the app + starts the reminder timer (cron)
├── app.js          → Sets up Express + all security middleware
├── config/         → Settings: database, env variables, logger, mailer
├── routes/         → The URLs (e.g. /api/tasks, /api/auth)
├── middleware/     → Guards that run before controllers (auth, validation, errors)
├── controllers/    → Receive the request, send the response
├── services/       → The brains: the actual business logic
├── models/         → The "shape" of each data type (User, Task, ...)
├── validators/     → Rules for what valid input looks like (Zod schemas)
├── utils/          → Small helpers (tokens, error class, response formatter)
└── seed.js         → Fills the database with demo data for testing
```

**Golden rule:** Routes are thin, Controllers are thin, and the **Services hold the real logic**. Models only describe the data.

**العربية:** داخل `server/src/` كل شيء مقسّم حسب المسؤولية:

```
server/src/
├── server.js       → يشغّل التطبيق + يشغّل مؤقّت التذكيرات (cron)
├── app.js          → يجهّز Express وكل وسائط الأمان
├── config/         → الإعدادات: قاعدة البيانات، المتغيرات، السجلّات، البريد
├── routes/         → الروابط (مثل /api/tasks و /api/auth)
├── middleware/     → حرّاس يعملون قبل الـ Controllers (المصادقة، التحقق، الأخطاء)
├── controllers/    → تستقبل الطلب وترسل الرد
├── services/       → العقل: منطق العمل الفعلي
├── models/         → "شكل" كل نوع بيانات (User، Task، ...)
├── validators/     → قواعد شكل المدخلات الصحيحة (مخططات Zod)
├── utils/          → أدوات مساعدة صغيرة (التوكن، صنف الأخطاء، تنسيق الرد)
└── seed.js         → يملأ قاعدة البيانات ببيانات تجريبية للاختبار
```

**القاعدة الذهبية:** الـ Routes بسيطة، والـ Controllers بسيطة، و**الـ Services تحمل المنطق الحقيقي**. أما الـ Models فتصف البيانات فقط.

---

## 5. The data (Models) / البيانات (النماذج)

**English:** A **Model** describes what one item looks like in the database. The main ones:

- **User** — name, email, hashed password, university, major, preferences (language ar/en, theme light/dark, timezone, email reminders on/off).
- **Task** — the core item: title, description, course, **priority** (high/medium/low), **status** (pending / in_progress / completed), **deadline**, sub-tasks (checklist), attachments, and the **owner** (which user it belongs to).
- **Notification** — a reminder message for a user (deadline soon / overdue).
- **Level, Subject, Resource** — the educational content managed by the admin (academic level → subject → resource/file).
- **Comment, Group** — comments on tasks, and group/shared tasks (partly for future use).

Notice the Task model marks `owner` and `deadline` as **indexed** — this makes searching by user and sorting by deadline **fast**.

**العربية:** الـ **Model** يصف شكل عنصر واحد في قاعدة البيانات. أهمها:

- **User (مستخدم)** — الاسم، البريد، كلمة المرور المشفّرة، الجامعة، التخصص، التفضيلات (اللغة ar/en، الثيم فاتح/داكن، المنطقة الزمنية، تفعيل تذكيرات الإيميل).
- **Task (مهمة)** — العنصر الأساسي: العنوان، الوصف، المادة، **الأولوية** (عالية/متوسطة/منخفضة)، **الحالة** (قيد الانتظار/قيد التنفيذ/مكتملة)، **موعد التسليم**، المهام الفرعية (قائمة تحقق)، المرفقات، و**المالك** (لأي مستخدم تعود).
- **Notification (إشعار)** — رسالة تذكير للمستخدم (اقتراب الموعد / تأخّر).
- **Level, Subject, Resource** — المحتوى التعليمي الذي يديره الأدمن (المستوى الدراسي ← المادة ← المصدر/الملف).
- **Comment, Group** — تعليقات على المهام، ومهام المجموعات المشتركة (جزء منها للاستخدام المستقبلي).

لاحظ أن نموذج المهمة يجعل `owner` و `deadline` **مفهرسَين (Indexed)** — وهذا يجعل البحث حسب المستخدم والترتيب حسب الموعد **سريعًا**.

---

## 6. The main features / الميزات الرئيسية

### 6.1 Authentication (login & signup) / المصادقة (تسجيل الدخول والاشتراك)

**English:** This is how we know **who** the user is and keep them secure.
1. **Register/Login:** The password is never stored as-is. We **hash** it with bcrypt (a one-way scramble). On login we compare the hash.
2. **Two tokens (JWT):**
   - **Access token** — a short-lived ID card (15 minutes). Sent with every request in the `Authorization: Bearer ...` header.
   - **Refresh token** — a longer-lived token (7 days) used to get a new access token without logging in again.
3. **Token rotation:** every time the refresh token is used, we issue a fresh one — safer.
4. **Forgot password:** we email a special reset link that expires in 30 minutes. For privacy, the reply is the same whether the email exists or not (so attackers can't discover which emails are registered).

**العربية:** هكذا نعرف **مَن** هو المستخدم ونحافظ على أمانه.
1. **التسجيل/الدخول:** كلمة المرور لا تُخزَّن كما هي أبدًا. نشفّرها بـ bcrypt (تشفير باتجاه واحد). عند الدخول نقارن التشفير.
2. **توكنان (JWT):**
   - **Access token** — بطاقة هوية قصيرة العمر (15 دقيقة)، تُرسَل مع كل طلب في ترويسة `Authorization: Bearer ...`.
   - **Refresh token** — توكن أطول عمرًا (7 أيام) للحصول على access token جديد دون إعادة تسجيل الدخول.
3. **تدوير التوكن:** في كل مرة يُستخدم فيها الـ refresh token نُصدر واحدًا جديدًا — أكثر أمانًا.
4. **نسيت كلمة المرور:** نرسل رابط إعادة تعيين خاص ينتهي خلال 30 دقيقة. ولحماية الخصوصية، يكون الرد واحدًا سواء وُجد البريد أم لا (حتى لا يكتشف المهاجم البريد المسجّل).

### 6.2 Tasks / المهام

**English:** The heart of the app. Users can:
- Create, read, update, delete their tasks.
- **Filter & search:** by status, priority, course, date range, or a text search.
- **Sort:** by deadline, creation date, or priority.
- Manage **sub-tasks** (a checklist inside a task) and **archive/restore** tasks.
- Add **comments**.
> Important security detail: every task query is filtered by `owner: userId`. So a user can **only ever see or touch their own tasks** — never someone else's.

**العربية:** قلب التطبيق. يستطيع المستخدم:
- إنشاء وقراءة وتعديل وحذف مهامه.
- **التصفية والبحث:** حسب الحالة، الأولوية، المادة، المدى الزمني، أو بحث نصّي.
- **الترتيب:** حسب الموعد، تاريخ الإنشاء، أو الأولوية.
- إدارة **المهام الفرعية** (قائمة تحقق داخل المهمة) و**أرشفة/استعادة** المهام.
- إضافة **تعليقات**.
> تفصيل أمني مهم: كل استعلام عن المهام مقيّد بـ `owner: userId`. أي أن المستخدم **لا يرى أو يعدّل إلا مهامه هو** — ولا يصل لمهام غيره أبدًا.

### 6.3 Notifications & the reminder engine / الإشعارات ومحرّك التذكير

**English:** This is a nice feature to highlight. A **cron job** (a scheduled timer) runs every 15 minutes. It looks at all users' tasks and, for any task whose deadline is **within 24 hours** or **already overdue**, it creates a notification (in Arabic, e.g. "the deadline for X is near"). A clever `key` prevents making the **same** reminder twice. This is the "kitchen working in the background even when no one ordered."

**العربية:** ميزة جميلة تستحق الإبراز. تعمل **مهمة cron** (مؤقّت مجدول) كل 15 دقيقة. تفحص مهام كل المستخدمين، وأي مهمة موعدها **خلال 24 ساعة** أو **متأخّرة**، تنشئ لها إشعارًا (بالعربية مثل "اقترب موعد تسليم X"). ويمنع مفتاح ذكي `key` تكرار نفس التذكير مرتين. إنها "المطبخ الذي يعمل في الخلفية حتى دون طلب".

### 6.4 Analytics / الإحصائيات

**English:** From a user's tasks we calculate productivity numbers: total tasks, completed, pending, overdue, **completion rate (%)**, a breakdown **per course**, and a **7-day trend** (created vs completed each day). The frontend turns these into charts.

**العربية:** من مهام المستخدم نحسب أرقام الإنتاجية: إجمالي المهام، المكتملة، المعلّقة، المتأخرة، **نسبة الإنجاز (%)**، توزيع **حسب المادة**، و**اتجاه آخر 7 أيام** (المنشأة مقابل المكتملة يوميًا). والواجهة تحوّلها إلى رسوم بيانية.

### 6.5 Content & Admin panel / المحتوى ولوحة التحكم

**English:** There is educational content organized as **Level → Subject → Resource**. Anyone can read it, but only an **admin** can add/edit/delete it. The admin uses a separate password and gets a separate admin token sent in the `x-admin-token` header (kept separate from student tokens so they never mix).

**العربية:** يوجد محتوى تعليمي منظّم كـ **مستوى ← مادة ← مصدر**. يستطيع الجميع قراءته، لكن **الأدمن فقط** يضيف/يعدّل/يحذف. يستخدم الأدمن كلمة مرور منفصلة ويحصل على توكن أدمن منفصل يُرسَل في ترويسة `x-admin-token` (منفصل عن توكنات الطلاب حتى لا يختلطا).

---

## 7. The API endpoints (the menu) / نقاط الـ API (القائمة)

**English:** Everything lives under `/api`. Main groups:

| Prefix | Purpose |
|--------|---------|
| `/api/auth` | register, login, refresh, logout, me, update profile, change/forgot/reset password |
| `/api/tasks` | full task management + sub-tasks + comments |
| `/api/notifications` | list, mark read, mark all read, delete |
| `/api/analytics` | the productivity numbers |
| `/api/content` | levels, subjects, resources (read for all, write for admin) |
| `/api/health` | a simple check that the server is alive |

**العربية:** كل شيء تحت `/api`. المجموعات الرئيسية:

| البادئة | الغرض |
|---------|-------|
| `/api/auth` | التسجيل، الدخول، التجديد، الخروج، بياناتي، تعديل الملف، تغيير/نسيان/إعادة كلمة المرور |
| `/api/tasks` | إدارة كاملة للمهام + المهام الفرعية + التعليقات |
| `/api/notifications` | العرض، تعليم كمقروء، تعليم الكل كمقروء، الحذف |
| `/api/analytics` | أرقام الإنتاجية |
| `/api/content` | المستويات والمواد والمصادر (قراءة للجميع، كتابة للأدمن) |
| `/api/health` | فحص بسيط أن الخادم يعمل |

---

## 8. Security (how we protect the app) / الأمان (كيف نحمي التطبيق)

**English:** Great point to impress in a presentation. We layer several protections:
- **Passwords hashed** with bcrypt — never stored in plain text.
- **JWT tokens** to verify identity on every request.
- **helmet** — sets safe HTTP headers.
- **CORS** — only allows our own frontend websites to call the API.
- **Rate limiting** — blocks someone who sends too many requests (stops brute-force attacks).
- **express-mongo-sanitize** — strips dangerous characters so nobody can inject malicious database queries.
- **Zod validation** — rejects bad/incomplete input before it reaches the logic.
- **Ownership checks** — users can only access their own data.

**العربية:** نقطة رائعة تُبهر في العرض. نضع عدة طبقات حماية:
- **تشفير كلمات المرور** بـ bcrypt — لا تُخزَّن كنص واضح أبدًا.
- **توكنات JWT** للتحقق من الهوية في كل طلب.
- **helmet** — يضبط ترويسات HTTP آمنة.
- **CORS** — يسمح فقط لمواقع الواجهة الخاصة بنا بالاتصال بالـ API.
- **تحديد المعدّل (Rate limiting)** — يوقف من يرسل طلبات كثيرة جدًا (يمنع هجمات التخمين).
- **express-mongo-sanitize** — يزيل الرموز الخطيرة حتى لا يحقن أحد استعلامات قاعدة بيانات ضارة.
- **تحقّق Zod** — يرفض المدخلات الناقصة/الخاطئة قبل وصولها للمنطق.
- **فحص الملكية** — كل مستخدم يصل لبياناته فقط.

---

## 9. Consistent responses & error handling / توحيد الردود ومعالجة الأخطاء

**English:** Every response follows the same shape, so the frontend always knows what to expect:
```json
{ "success": true,  "data": { }, "message": "OK" }
{ "success": false, "message": "Task not found" }
```
Errors are handled in **one central place** (`error.middleware.js`). Instead of writing try/catch everywhere, controllers are wrapped in an `asyncHandler` that automatically forwards any error to that central handler. Clean and consistent.

**العربية:** كل رد يتبع نفس الشكل، فتعرف الواجهة دائمًا ما تتوقعه:
```json
{ "success": true,  "data": { }, "message": "OK" }
{ "success": false, "message": "Task not found" }
```
تُعالَج الأخطاء في **مكان مركزي واحد** (`error.middleware.js`). فبدل كتابة try/catch في كل مكان، تُغلَّف الـ Controllers بـ `asyncHandler` الذي يمرّر أي خطأ تلقائيًا لذلك المعالج المركزي. نظيف وموحّد.

---

## 10. How to run it / كيف تشغّله

**English:**
```bash
cd server
npm install          # install the tools
npm run seed         # (optional) fill DB with demo data
npm run dev          # start the server (auto-reloads on changes)
```
The server listens on port **5050** by default and connects to MongoDB. Settings live in a `.env` file (database URL, secrets, email settings). There is also a **Dockerfile** so it can run inside a container, and **tests** (`npm test`) using Jest + an in-memory MongoDB.

**العربية:**
```bash
cd server
npm install          # تثبيت الأدوات
npm run seed         # (اختياري) ملء قاعدة البيانات ببيانات تجريبية
npm run dev          # تشغيل الخادم (يعيد التحميل تلقائيًا عند التعديل)
```
يستمع الخادم على المنفذ **5050** افتراضيًا ويتصل بـ MongoDB. توجد الإعدادات في ملف `.env` (رابط قاعدة البيانات، الأسرار، إعدادات البريد). كما يوجد **Dockerfile** لتشغيله داخل حاوية، و**اختبارات** (`npm test`) باستخدام Jest مع قاعدة MongoDB في الذاكرة.

---

## 11. Presentation cheat-sheet (say these lines) / ورقة العرض السريعة (قل هذه الجُمل)

**English — 6 sentences that summarize everything:**
1. "Masari's backend is a REST API built with Node.js, Express, and MongoDB."
2. "It is organized in clean layers: routes → controllers → services → models, so each part has one job."
3. "Users are secured with hashed passwords and JWT access/refresh tokens."
4. "The core feature is task management — create, filter, sort, and track tasks by deadline and priority."
5. "A cron job runs every 15 minutes to automatically generate deadline reminders."
6. "Security is layered: helmet, CORS, rate limiting, input validation, and per-user ownership checks."

**العربية — 6 جُمل تلخّص كل شيء:**
1. «الـ Backend في مساري هو REST API مبني بـ Node.js و Express و MongoDB.»
2. «منظَّم في طبقات نظيفة: routes ← controllers ← services ← models، فلكل جزء وظيفة واحدة.»
3. «المستخدمون مؤمَّنون بكلمات مرور مشفّرة وتوكنات JWT من نوع access و refresh.»
4. «الميزة الأساسية هي إدارة المهام — إنشاء، تصفية، ترتيب، ومتابعة حسب الموعد والأولوية.»
5. «تعمل مهمة cron كل 15 دقيقة لتوليد تذكيرات المواعيد تلقائيًا.»
6. «الأمان متعدّد الطبقات: helmet و CORS وتحديد المعدّل والتحقق من المدخلات وفحص الملكية لكل مستخدم.»

---

## 12. Likely questions & answers / أسئلة متوقعة وإجاباتها

**English:**
- **Q: Why MongoDB and not SQL?** → Tasks and users have a flexible, document-like shape (a task has nested sub-tasks and attachments). MongoDB stores these naturally as documents.
- **Q: Why two tokens?** → The short access token limits damage if stolen; the refresh token keeps the user logged in without re-typing the password.
- **Q: What happens if the server crashes mid-request?** → The central error handler returns a clean error response; nothing sensitive leaks.
- **Q: How do you stop users seeing each other's data?** → Every database query includes the logged-in user's ID as a filter.
- **Q: What is middleware?** → Small functions that run *before* the controller — like guards checking your ticket before you enter.

**العربية:**
- **س: لماذا MongoDB وليس SQL؟** ← المهام والمستخدمون لهم شكل مرن يشبه المستندات (المهمة تحوي مهام فرعية ومرفقات متداخلة). MongoDB تخزّنها طبيعيًا كمستندات.
- **س: لماذا توكنان؟** ← التوكن القصير يقلّل الضرر إن سُرق؛ وتوكن التجديد يبقي المستخدم مسجّلًا دون إعادة كتابة كلمة المرور.
- **س: ماذا لو تعطّل الخادم أثناء الطلب؟** ← يُرجع المعالج المركزي للأخطاء ردًّا نظيفًا دون تسريب أي شيء حسّاس.
- **س: كيف تمنع المستخدمين من رؤية بيانات بعضهم؟** ← كل استعلام لقاعدة البيانات يتضمّن معرّف المستخدم المسجّل كمرشّح (filter).
- **س: ما هو الـ Middleware؟** ← وظائف صغيرة تعمل *قبل* الـ Controller — كحرّاس يفحصون تذكرتك قبل الدخول.

---

> **Tip / نصيحة:** In your presentation, walk through **section 3 (the journey of a request)** live — pick one action like "create a task" and follow it through every layer. It shows you truly understand the system.
> في عرضك، اشرح **القسم 3 (رحلة الطلب)** بشكل حي — اختر إجراءً مثل "إنشاء مهمة" وتتبّعه عبر كل طبقة. هذا يُظهر فهمك الحقيقي للنظام.
