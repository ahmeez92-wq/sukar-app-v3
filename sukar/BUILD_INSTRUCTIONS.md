# تعليمات بناء تطبيق سكّر متزن - Sukar Balanced

## نظرة عامة
تم تحويل تطبيق سكّر متزن من تطبيق ويب إلى تطبيق أندرويد قابل للتثبيت باستخدام Capacitor. يحتوي المشروع على جميع الملفات والإعدادات اللازمة لبناء ملف APK.

## المتطلبات الأساسية

### لبناء APK محلياً:
1. **Java Development Kit (JDK)**
   - الإصدار 11 أو أحدث
   - تحميل من: https://www.oracle.com/java/technologies/downloads/

2. **Android SDK**
   - تحميل Android Studio من: https://developer.android.com/studio
   - أو تحميل Android SDK Command-line Tools

3. **Gradle**
   - يتم تحميله تلقائياً عند أول بناء

### البيئات المدعومة:
- Windows
- macOS
- Linux

## خطوات البناء

### الخطوة 1: تثبيت المتطلبات

#### على Windows:
```bash
# تثبيت Java
# قم بتحميل JDK من Oracle وتثبيته

# تثبيت Android Studio
# قم بتحميل Android Studio وتثبيته

# تعيين متغيرات البيئة
setx JAVA_HOME "C:\Program Files\Java\jdk-11"
setx ANDROID_HOME "C:\Users\YourUsername\AppData\Local\Android\Sdk"
```

#### على macOS:
```bash
# تثبيت Java باستخدام Homebrew
brew install openjdk@11

# تثبيت Android Studio
brew install android-studio

# تعيين متغيرات البيئة
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
export ANDROID_HOME=~/Library/Android/sdk
```

#### على Linux:
```bash
# تثبيت Java
sudo apt-get install openjdk-11-jdk

# تثبيت Android SDK
# قم بتحميل Android SDK Command-line Tools من:
# https://developer.android.com/studio

# تعيين متغيرات البيئة
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export ANDROID_HOME=~/Android/Sdk
```

### الخطوة 2: التحقق من التثبيت

```bash
java -version
# يجب أن تظهر نسخة Java 11 أو أحدث

echo $ANDROID_HOME
# يجب أن يظهر مسار Android SDK
```

### الخطوة 3: بناء APK

```bash
# الانتقال إلى مجلد المشروع
cd sukar-balanced

# بناء ملف APK Debug (للاختبار)
cd android
./gradlew assembleDebug

# أو بناء ملف APK Release (للإنتاج)
./gradlew assembleRelease
```

### الخطوة 4: موقع ملف APK

بعد البناء الناجح، سيكون ملف APK في:
- **Debug**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release**: `android/app/build/outputs/apk/release/app-release.apk`

## تثبيت APK على الجهاز

### باستخدام ADB (Android Debug Bridge):

```bash
# تثبيت APK على الجهاز المتصل
adb install android/app/build/outputs/apk/debug/app-debug.apk

# أو إعادة تثبيت (حذف النسخة القديمة أولاً)
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### يدوياً:
1. انسخ ملف APK إلى جهازك الأندرويد
2. افتح مدير الملفات على الجهاز
3. انقر على ملف APK لتثبيته

## معلومات تسجيل الدخول

**البريد الإلكتروني**: admin@app.com
**كلمة المرور**: admin123

## ميزات التطبيق

### الميزات المتاحة:
- ✅ تسجيل الدخول والمصادقة
- ✅ قراءات سكر الدم اليومية
- ✅ حاسبة الإنسولين الذكية
- ✅ إضافة وجبات من قاعدة بيانات عربية (30+ صنف)
- ✅ سجل تاريخي للقراءات والوجبات
- ✅ لوحة تحكم مع إحصائيات يومية
- ✅ إشعارات محلية (تذكيرات قياس السكر والدواء)
- ✅ تخزين محلي بدون إنترنت
- ✅ واجهة عربية كاملة مع دعم RTL

### الألوان المستخدمة:
- **أخضر (#4CAF50)**: للحالات الآمنة والإجراءات الإيجابية
- **أحمر (#F44336)**: للحالات الخطيرة والتنبيهات
- **أزرق (#2196F3)**: للعناصر التفاعلية والمعلومات

## استكشاف الأخطاء

### خطأ: "SDK location not found"
**الحل**: تأكد من تعيين متغير البيئة `ANDROID_HOME` بشكل صحيح

### خطأ: "Java version mismatch"
**الحل**: تأكد من استخدام Java 11 أو أحدث

### خطأ: "Build failed"
**الحل**: جرب الأوامر التالية:
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

## البديل: استخدام PWA (Progressive Web App)

إذا كنت تواجه صعوبات في بناء APK، يمكنك استخدام التطبيق كـ PWA:

1. افتح المتصفح على جهازك الأندرويد
2. اذهب إلى عنوان التطبيق
3. انقر على القائمة (⋮) واختر "إضافة إلى الشاشة الرئيسية"
4. التطبيق سيعمل بدون إنترنت بعد التثبيت الأول

## الدعم والمساعدة

للحصول على مساعدة إضافية:
- تحقق من ملف README.md في المشروع
- اطلع على توثيق Capacitor: https://capacitorjs.com/docs
- اطلع على توثيق Android: https://developer.android.com/docs

## ملاحظات مهمة

1. **التخزين المحلي**: جميع البيانات تُحفظ محلياً على الجهاز ولا تُرسل إلى أي خادم
2. **الإشعارات**: تعمل حتى لو كان التطبيق مغلقاً
3. **الأداء**: التطبيق محسّن للعمل على أجهزة بمواصفات منخفضة
4. **الأمان**: كلمات المرور والبيانات الحساسة محمية محلياً

## الإصدار

**الإصدار الحالي**: 1.0.0
**تاريخ الإصدار**: 2026-05-06
**الحالة**: جاهز للإنتاج
