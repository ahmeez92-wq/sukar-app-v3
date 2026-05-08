# دليل بناء APK تطبيق سكّر متزن - Sukar Balanced
## باستخدام Capacitor

---

## 📋 المحتويات
1. المتطلبات الأساسية
2. إعداد البيئة
3. خطوات البناء
4. التحقق من الإشعارات والتخزين المحلي
5. استكشاف الأخطاء

---

## 1️⃣ المتطلبات الأساسية

### أ) Java Development Kit (JDK)
- **الإصدار المطلوب**: Java 11 أو أحدث
- **التحميل**: https://www.oracle.com/java/technologies/downloads/
- **التحقق**:
  ```bash
  java -version
  ```

### ب) Android SDK
- **الطريقة 1**: تثبيت Android Studio (الأسهل)
  - تحميل من: https://developer.android.com/studio
  - سيتم تثبيت SDK تلقائياً
  
- **الطريقة 2**: تثبيت Android SDK Command-line Tools فقط
  - تحميل من: https://developer.android.com/studio
  - ثم تثبيت الأدوات اللازمة

### ج) Node.js و npm/pnpm
- **الإصدار المطلوب**: Node.js 16 أو أحدث
- **التحميل**: https://nodejs.org/
- **التحقق**:
  ```bash
  node --version
  npm --version
  ```

### د) Git (اختياري)
- للتحكم بالإصدارات
- **التحميل**: https://git-scm.com/

---

## 2️⃣ إعداد البيئة

### على Windows:

1. **تثبيت Java**:
   ```bash
   # بعد تثبيت JDK
   setx JAVA_HOME "C:\Program Files\Java\jdk-11"
   ```

2. **تثبيت Android SDK**:
   ```bash
   # بعد تثبيت Android Studio
   setx ANDROID_HOME "C:\Users\YourUsername\AppData\Local\Android\Sdk"
   ```

3. **إضافة إلى PATH**:
   ```bash
   setx PATH "%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools"
   ```

4. **إعادة تشغيل الجهاز** أو Command Prompt

### على macOS:

1. **تثبيت Java**:
   ```bash
   brew install openjdk@11
   export JAVA_HOME=$(/usr/libexec/java_home -v 11)
   ```

2. **تثبيت Android Studio**:
   ```bash
   brew install android-studio
   ```

3. **تعيين متغيرات البيئة**:
   ```bash
   export ANDROID_HOME=~/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

4. **حفظ المتغيرات** (اختياري):
   ```bash
   echo 'export ANDROID_HOME=~/Library/Android/sdk' >> ~/.zshrc
   echo 'export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.zshrc
   source ~/.zshrc
   ```

### على Linux (Ubuntu/Debian):

1. **تثبيت Java**:
   ```bash
   sudo apt-get update
   sudo apt-get install openjdk-11-jdk
   ```

2. **تثبيت Android SDK**:
   ```bash
   # تحميل Android SDK Command-line Tools
   # ثم استخراجه
   mkdir -p ~/Android/Sdk
   unzip commandlinetools-linux-*.zip -d ~/Android/Sdk/
   ```

3. **تعيين متغيرات البيئة**:
   ```bash
   export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
   export ANDROID_HOME=~/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

4. **حفظ المتغيرات**:
   ```bash
   echo 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64' >> ~/.bashrc
   echo 'export ANDROID_HOME=~/Android/Sdk' >> ~/.bashrc
   echo 'export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.bashrc
   source ~/.bashrc
   ```

### ✅ التحقق من الإعداد:

```bash
java -version
# يجب أن يظهر Java 11 أو أحدث

echo $ANDROID_HOME
# يجب أن يظهر مسار Android SDK

adb version
# يجب أن تظهر نسخة ADB
```

---

## 3️⃣ خطوات البناء

### الخطوة 1: فتح Terminal/Command Prompt

```bash
# الانتقال إلى مجلد المشروع
cd sukar-balanced
```

### الخطوة 2: تثبيت التبعيات (إذا لم تكن مثبتة)

```bash
# استخدام pnpm (الأسرع)
pnpm install

# أو استخدام npm
npm install
```

### الخطوة 3: بناء ملفات الويب

```bash
pnpm build
# أو
npm run build
```

**النتيجة المتوقعة**:
- مجلد `dist/public/` يحتوي على ملفات الويب المبنية

### الخطوة 4: مزامنة Capacitor

```bash
# الانتقال إلى مجلد المشروع
cd sukar-balanced

# مزامنة الملفات مع Android
npx cap sync android
```

**النتيجة المتوقعة**:
```
✔ Copying web assets from public to android/app/src/main/assets/public
✔ Creating capacitor.config.json in android/app/src/main/assets
✔ Updating Android plugins
```

### الخطوة 5: بناء APK Debug

```bash
# الانتقال إلى مجلد Android
cd android

# بناء APK Debug (للاختبار)
./gradlew assembleDebug
```

**النتيجة المتوقعة**:
```
BUILD SUCCESSFUL in XXs
```

**موقع ملف APK**:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### الخطوة 6: بناء APK Release (للإنتاج)

```bash
# بناء APK Release
./gradlew assembleRelease
```

**النتيجة المتوقعة**:
```
BUILD SUCCESSFUL in XXs
```

**موقع ملف APK**:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 4️⃣ التحقق من الإشعارات والتخزين المحلي

### ✅ الإشعارات المحلية

**الملفات المسؤولة**:
- `client/src/lib/notifications.ts` - كود الإشعارات
- `capacitor.config.ts` - إعدادات Capacitor
- `android/app/src/main/AndroidManifest.xml` - الإذن

**الميزات المتاحة**:
1. **تذكير قياس السكر**: كل 4 ساعات
2. **تذكير الدواء**: الصباح (8:00 AM) والمساء (8:00 PM)
3. **الإشعارات تعمل في الخلفية**: حتى لو كان التطبيق مغلقاً

**الاختبار**:
1. ثبت التطبيق على الجهاز
2. اذهب إلى الإعدادات > التطبيقات > سكّر متزن
3. تأكد من تفعيل الإشعارات
4. انتظر وقت الإشعار المجدول

### ✅ التخزين المحلي

**الملفات المسؤولة**:
- `client/src/contexts/DataContext.tsx` - إدارة البيانات
- `client/src/contexts/AuthContext.tsx` - بيانات المستخدم
- `client/public/service-worker.js` - Service Worker للـ Offline

**الميزات المتاحة**:
1. **تخزين محلي**: جميع البيانات تُحفظ على الجهاز
2. **عدم الحاجة للإنترنت**: التطبيق يعمل بدون إنترنت بعد التثبيت الأول
3. **الخصوصية الكاملة**: لا يتم إرسال أي بيانات إلى خوادم خارجية

**البيانات المحفوظة**:
- بيانات تسجيل الدخول
- قراءات السكر
- الوجبات
- حسابات الإنسولين

**الاختبار**:
1. ثبت التطبيق على الجهاز
2. سجل الدخول بـ admin@app.com / admin123
3. أضف بعض القراءات والوجبات
4. أطفئ الإنترنت (وضع الطيران)
5. تأكد من أن البيانات محفوظة وتظهر بشكل صحيح

---

## 5️⃣ استكشاف الأخطاء

### ❌ خطأ: "SDK location not found"

**السبب**: متغير `ANDROID_HOME` غير معيّن بشكل صحيح

**الحل**:
```bash
# تحقق من المتغير
echo $ANDROID_HOME

# إذا كان فارغاً، عيّنه يدوياً
export ANDROID_HOME=/path/to/android/sdk

# أو أنشئ ملف local.properties
cd android
echo "sdk.dir=/path/to/android/sdk" > local.properties
```

### ❌ خطأ: "Java version mismatch"

**السبب**: إصدار Java غير صحيح

**الحل**:
```bash
# تحقق من إصدار Java
java -version

# إذا كان أقل من 11، ثبت Java 11
# ثم عيّن JAVA_HOME
export JAVA_HOME=/path/to/java/11
```

### ❌ خطأ: "Build failed"

**الحل**:
```bash
# نظف البناء السابق
cd android
./gradlew clean

# حاول البناء مرة أخرى
./gradlew assembleDebug

# أو استخدم الوضع التفصيلي
./gradlew assembleDebug --stacktrace
```

### ❌ خطأ: "Gradle daemon not responding"

**الحل**:
```bash
cd android
./gradlew --stop
./gradlew assembleDebug
```

### ❌ خطأ: "No connected devices"

**الحل**:
```bash
# تحقق من الأجهزة المتصلة
adb devices

# إذا لم يظهر أي جهاز:
# 1. تأكد من توصيل الجهاز بـ USB
# 2. فعّل USB Debugging على الجهاز
# 3. وافق على طلب الإذن على الجهاز
# 4. حاول مرة أخرى
adb devices
```

---

## 📱 تثبيت APK على الجهاز

### الطريقة 1: باستخدام ADB

```bash
# تثبيت APK Debug
adb install android/app/build/outputs/apk/debug/app-debug.apk

# أو إعادة تثبيت (حذف النسخة القديمة أولاً)
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# تثبيت APK Release
adb install android/app/build/outputs/apk/release/app-release.apk
```

### الطريقة 2: يدوياً

1. انسخ ملف APK إلى جهازك الأندرويد
2. افتح مدير الملفات على الجهاز
3. انقر على ملف APK لتثبيته
4. وافق على التثبيت

### الطريقة 3: عبر البريد الإلكتروني

1. أرسل ملف APK إلى نفسك عبر البريد الإلكتروني
2. افتح البريد على الجهاز الأندرويد
3. حمّل ملف APK
4. انقر عليه لتثبيته

---

## 🔐 بيانات الاختبار

| الحقل | القيمة |
|------|--------|
| البريد الإلكتروني | admin@app.com |
| كلمة المرور | admin123 |

---

## 📊 معلومات المشروع

| المعلومة | القيمة |
|---------|--------|
| اسم التطبيق | سكّر متزن |
| معرّف التطبيق | com.sukarbalanced.app |
| الإصدار | 1.0.0 |
| API الأدنى | 21 (Android 5.0) |
| API المستهدف | 34 (Android 14) |

---

## ✅ قائمة التحقق

- [ ] تثبيت Java 11 أو أحدث
- [ ] تثبيت Android SDK
- [ ] تعيين متغيرات البيئة
- [ ] تثبيت Node.js و npm
- [ ] تثبيت التبعيات (`pnpm install`)
- [ ] بناء ملفات الويب (`pnpm build`)
- [ ] مزامنة Capacitor (`npx cap sync android`)
- [ ] بناء APK (`./gradlew assembleDebug`)
- [ ] توصيل جهاز أندرويد
- [ ] تثبيت APK على الجهاز
- [ ] اختبار الإشعارات
- [ ] اختبار التخزين المحلي

---

## 📞 الدعم والمساعدة

- **توثيق Capacitor**: https://capacitorjs.com/docs
- **توثيق Android**: https://developer.android.com/docs
- **توثيق Gradle**: https://gradle.org/guides/

---

## 🎉 النتيجة النهائية

بعد اتباع هذه الخطوات، ستحصل على:
- ✅ ملف APK جاهز للتثبيت
- ✅ تطبيق يعمل بدون إنترنت
- ✅ إشعارات محلية تعمل في الخلفية
- ✅ تخزين محلي آمن للبيانات
- ✅ واجهة عربية كاملة مع RTL

---

**الإصدار**: 1.0.0
**تاريخ الإنشاء**: 2026-05-08
**الحالة**: جاهز للإنتاج ✅
