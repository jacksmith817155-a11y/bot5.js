const { Telegraf } = require('telegraf');

// گرفتن توکن از متغیرهای محیطی راندر یا مقدار پیش‌فرض
const TOKEN = process.env.BOT_TOKEN || "8222630500:AAGcdGZ76BQz1AHju4tZQMZzpOUEkJIqzF8";
const bot = new Telegraf(TOKEN);

// منوی اصلی با دکمه‌های رنگی متنوع
const mainKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: "🛒 خرید اشتراک", style: { bg_success: true } }], // دکمه سبز
      [
        { text: "👤 حساب کاربری", style: { bg_primary: true } }, // دکمه آبی
        { text: "➕ افزایش موجودی", style: { bg_primary: true } } // دکمه آبی
      ],
      [
        { text: "📞 پشتیبانی", style: { bg_primary: true } },
        { text: "❓ راهنما", style: { bg_primary: true } }
      ],
      [{ text: "❌ بستن منو", style: { bg_danger: true } }] // دکمه قرمز
    ],
    resize_keyboard: true,
    is_persistent: true
  }
};

bot.start(async (ctx) => {
  await ctx.reply(
    `سلام ${ctx.from.first_name} عزیز! 🤖\nبه ربات پیشرفته ما خوش آمدید. لطفاً یکی از گزینه‌های زیر را انتخاب کنید:`,
    mainKeyboard
  );
});

bot.hears("🛒 خرید اشتراک", async (ctx) => {
  await ctx.reply("بخش خرید اشتراک:\nلطفاً پلن مورد نظر خود را انتخاب کنید.", mainKeyboard);
});

bot.hears("👤 حساب کاربری", async (ctx) => {
  await ctx.reply(`اطلاعات حساب شما:\n🆔 آیدی: ${ctx.from.id}\n👤 نام: ${ctx.from.first_name}`, mainKeyboard);
});

bot.hears("➕ افزایش موجودی", async (ctx) => {
  await ctx.reply("برای افزایش موجودی، درگاه پرداخت را انتخاب کنید:", mainKeyboard);
});

bot.hears("📞 پشتیبانی", async (ctx) => {
  await ctx.reply("ارتباط با پشتیبانی: از طریق آیدی زیر پیام دهید:\n@Support", mainKeyboard);
});

bot.hears("❓ راهنما", async (ctx) => {
  await ctx.reply("این ربات جهت تست دکمه‌های رنگی جدید تلگرام ساخته شده است.", mainKeyboard);
});

bot.hears("❌ بستن منو", async (ctx) => {
  await ctx.reply("منو بسته شد. برای باز کردن مجدد دستور /start را ارسال کنید.", {
    reply_markup: { remove_keyboard: true }
  });
});

// اجرای ربات
bot.launch();
console.log("Bot is running successfully...");

// خروج امن
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
