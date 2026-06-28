const commentSeeds = [
  "چه تمرین نرمی، همین چند دقیقه مکث خیلی ارزشمنده.",
  "این یادآوری دقیقاً برای روزهای شلوغ خوبه.",
  "بدن وقتی شنیده می‌شه، کم‌کم نرم‌تر می‌شه.",
  "خیلی قشنگ گفتین؛ شروع‌های کوچیک هم مهمن.",
  "این جمله رو باید ذخیره کرد برای قبل خواب.",
];

function repeatBank(prefix: string, count: number) {
  return Array.from({ length: count }, (_, index) => `${prefix} ${index + 1}: ${commentSeeds[index % commentSeeds.length]}`);
}

export const commentBanks = {
  warmComments: repeatBank("کامنت گرم", 50),
  followerReplies: repeatBank("پاسخ به دنبال‌کننده", 50),
  dmOpeners: repeatBank("شروع دایرکت", 30),
  dmResponses: repeatBank("پاسخ دایرکت", 30),
  pollQuestions: repeatBank("نظرسنجی", 20),
  questionBoxPrompts: repeatBank("سوال‌باکس", 20),
  storySliderTexts: repeatBank("اسلایدر استوری", 20),
  channelDiscussionPrompts: repeatBank("بحث کانال", 20),
  startAnswers: repeatBank("پاسخ از کجا شروع کنم", 20),
  noTimeAnswers: repeatBank("پاسخ وقت ندارم", 20),
  stiffBodyAnswers: repeatBank("پاسخ بدنم خشکه", 20),
  meditationBeginnerAnswers: repeatBank("پاسخ مدیتیشن بلد نیستم", 20),
};
