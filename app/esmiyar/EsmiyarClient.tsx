"use client";

import { useEffect, useMemo, useState } from "react";
import {
  abjad,
  coupleResult,
  healthResult,
  stepResult,
  surnameResult,
  trendResult,
  type RuleResult,
} from "@/lib/esmiyar";

type FormState = {
  person: string;
  mother: string;
  father: string;
  surname: string;
  spouse: string;
  spouseGender: "female" | "male";
};

type SavedCase = {
  id: string;
  createdAt: string;
  form: FormState;
  values: Record<string, number>;
  results: RuleResult[];
};

const initialForm: FormState = {
  person: "سعیده",
  mother: "نصرت",
  father: "عبدالحسین",
  surname: "",
  spouse: "رضا",
  spouseGender: "male",
};

const ruleLabels: Record<string, string> = {
  trend: "روند شخص",
  step: "قدم",
  couple: "تفاهم زوجین",
  health: "سلامت زوجین",
  surname: "اسم و فامیل",
};

function toneClass(tone: RuleResult["tone"]) {
  if (tone === "good") return "text-emerald-300 border-emerald-400/30 bg-emerald-400/10";
  if (tone === "bad") return "text-rose-300 border-rose-400/30 bg-rose-400/10";
  if (tone === "pending") return "text-amber-200 border-amber-300/30 bg-amber-300/10";
  return "text-sky-200 border-sky-300/30 bg-sky-300/10";
}

export function EsmiyarClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [selectedRule, setSelectedRule] = useState("trend");
  const [saved, setSaved] = useState<SavedCase[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("esmiyar-cases-v1");
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      // local storage is optional
    }
  }, []);

  const values = useMemo(() => ({
    person: abjad(form.person),
    mother: abjad(form.mother),
    father: abjad(form.father),
    surname: abjad(form.surname),
    spouse: abjad(form.spouse),
  }), [form]);

  const results = useMemo(() => {
    const list: RuleResult[] = [];
    if (values.person && values.mother) list.push(trendResult(values.person, values.mother));
    if (values.person && values.father) list.push(stepResult(values.person, values.father));
    if (values.person && values.surname) list.push(surnameResult(values.person, values.surname));
    if (values.person && values.spouse) {
      const female = form.spouseGender === "male" ? values.person : values.spouse;
      const male = form.spouseGender === "male" ? values.spouse : values.person;
      list.push(coupleResult(female, male));
      list.push(healthResult(female, male));
    }
    return list;
  }, [values, form.spouseGender]);

  const activeResult = results.find((item) => item.key === selectedRule) ?? results[0];

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function saveCase() {
    const item: SavedCase = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      form,
      values,
      results,
    };
    const next = [item, ...saved].slice(0, 30);
    setSaved(next);
    localStorage.setItem("esmiyar-cases-v1", JSON.stringify(next));
  }

  function clearCases() {
    setSaved([]);
    localStorage.removeItem("esmiyar-cases-v1");
  }

  return (
    <main className="min-h-screen bg-[#06111f] text-[#f8f3e9]" dir="rtl">
      <div className="mx-auto grid min-h-screen max-w-[1800px] gap-4 p-4 xl:grid-cols-[280px_1fr]">
        <aside className="rounded-[28px] border border-[#c8953d]/45 bg-[#081321] p-5 shadow-2xl">
          <div className="border-b border-[#c8953d]/20 pb-5">
            <p className="text-3xl font-black text-white">اسم‌یار ✦</p>
            <p className="mt-2 text-xs text-[#c9c0b1]">سامانه تحلیل و محاسبات نام</p>
          </div>

          <nav className="mt-5 grid gap-2 text-sm">
            {["داشبورد", "تحلیل جدید", "پرونده اشخاص", "تحلیل زوجین", "انتخاب نام فرزند", "اسم کسب‌وکار", "کتابخانه دانش", "قوانین و فرمول‌ها", "گزارش‌ها", "تنظیمات"].map((item, index) => (
              <div
                className={`rounded-2xl px-4 py-3 ${index === 0 ? "bg-gradient-to-l from-[#c99a48] to-[#9f742c] font-bold text-white" : "text-[#eee7da] hover:bg-white/5"}`}
                key={item}
              >
                {item}
              </div>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-[#c8953d]/30 bg-black/20 p-4">
            <p className="font-bold text-[#d9aa56]">نسخه فعلی</p>
            <div className="mt-3 space-y-2 text-xs text-[#c9c0b1]">
              <p>موتور ابجد: فعال</p>
              <p>روند شخص: فعال</p>
              <p>قدم: فعال</p>
              <p>زوجین: فعال</p>
              <p>سلامت سنتی: فعال با هشدار</p>
              <p>اسم و فامیل: فرمول فعال / تفسیر در انتظار</p>
            </div>
          </div>
        </aside>

        <section className="space-y-4">
          <header className="flex flex-col gap-3 rounded-[28px] border border-[#c8953d]/35 bg-[#0a1727] p-5 shadow-xl md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-black">پنل تحلیل کامل ✨</h1>
              <p className="mt-2 text-sm text-[#c9c0b1]">بر اساس قواعد فعلی جزوه سعیده — موارد مبهم عمداً قفل نشده‌اند.</p>
            </div>
            <div className="rounded-2xl border border-[#c8953d]/30 bg-white/5 px-4 py-3 text-sm">
              سعیده <span className="text-[#c9c0b1]">• مربی و مدرس</span>
            </div>
          </header>

          <div className="grid gap-4 2xl:grid-cols-[1.55fr_.9fr]">
            <div className="rounded-[28px] border border-[#c8953d]/45 bg-[#0a1727] p-5 shadow-xl">
              <h2 className="text-xl font-bold">اطلاعات شخص</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {[
                  ["person", "نام فرد", form.person],
                  ["mother", "نام مادر", form.mother],
                  ["father", "نام پدر", form.father],
                  ["surname", "فامیل", form.surname],
                  ["spouse", "نام همسر", form.spouse],
                ].map(([key, label, value]) => (
                  <label className="block" key={key}>
                    <span className="mb-2 block text-xs text-[#c9c0b1]">{label}</span>
                    <input
                      className="w-full rounded-2xl border border-[#c8953d]/30 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#d8aa56]"
                      onChange={(e) => updateField(key as keyof FormState, e.target.value as never)}
                      value={value}
                    />
                  </label>
                ))}

                <label className="block">
                  <span className="mb-2 block text-xs text-[#c9c0b1]">جنسیت همسر</span>
                  <select
                    className="w-full rounded-2xl border border-[#c8953d]/30 bg-[#081321] px-4 py-3 text-white outline-none"
                    onChange={(e) => updateField("spouseGender", e.target.value as FormState["spouseGender"])}
                    value={form.spouseGender}
                  >
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                </label>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                <AbjadBox label="ابجد فرد" value={values.person} />
                <AbjadBox label="ابجد مادر" value={values.mother} />
                <AbjadBox label="ابجد پدر" value={values.father} />
                <AbjadBox label="ابجد فامیل" value={values.surname} />
                <AbjadBox label="ابجد همسر" value={values.spouse} />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {results.map((result) => (
                  <button
                    className={`min-h-36 rounded-2xl border p-4 text-center transition hover:-translate-y-0.5 ${toneClass(result.tone)} ${selectedRule === result.key ? "ring-2 ring-[#d6a34d]/50" : ""}`}
                    key={result.key}
                    onClick={() => setSelectedRule(result.key)}
                    type="button"
                  >
                    <div className="text-xs opacity-75">{result.title}</div>
                    <div className="mt-4 text-xl font-black">{result.label}</div>
                    <div className="mt-2 text-xs opacity-70">باقیمانده: {result.remainder}</div>
                  </button>
                ))}
              </div>

              <button
                className="mt-5 w-full rounded-2xl bg-gradient-to-l from-[#d4a653] to-[#a9782a] px-5 py-4 text-lg font-black text-white shadow-lg transition hover:brightness-110"
                onClick={saveCase}
                type="button"
              >
                ذخیره تحلیل در پرونده محلی
              </button>
            </div>

            <div className="rounded-[28px] border border-[#c8953d]/45 bg-[#0a1727] p-5 shadow-xl">
              <h2 className="text-xl font-bold">جزئیات محاسبات</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {results.map((result) => (
                  <button
                    className={`rounded-xl border px-3 py-2 text-xs ${selectedRule === result.key ? "border-[#d6a34d] bg-[#d6a34d]/15 text-white" : "border-white/10 bg-white/5 text-[#c9c0b1]"}`}
                    key={result.key}
                    onClick={() => setSelectedRule(result.key)}
                    type="button"
                  >
                    {ruleLabels[result.key]}
                  </button>
                ))}
              </div>

              {activeResult ? (
                <div className="mt-5 rounded-2xl border border-[#c8953d]/25 bg-black/20 p-4">
                  <p className="text-lg font-black text-[#e0b866]">{activeResult.title}</p>
                  <div className="mt-4 rounded-2xl border border-[#c8953d]/25 bg-white/[.03] p-4 text-base text-[#f2d795]">
                    {activeResult.formula}
                  </div>
                  <div className="mt-4 space-y-3 text-sm leading-8 text-[#e8e0d4]">
                    <p>جمع ورودی‌ها: <b>{activeResult.total}</b></p>
                    <p>مقسوم‌علیه: <b>{activeResult.divisor}</b></p>
                    <p>باقیمانده: <b>{activeResult.remainder}</b></p>
                    <p>نتیجه: <b>{activeResult.label}</b></p>
                  </div>
                  {activeResult.note ? (
                    <p className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs leading-7 text-amber-100">{activeResult.note}</p>
                  ) : null}
                </div>
              ) : (
                <p className="mt-5 text-sm text-[#c9c0b1]">برای محاسبه، نام‌های لازم را وارد کنید.</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-[28px] border border-[#c8953d]/35 bg-[#0a1727] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">پرونده‌های ذخیره‌شده</h2>
                  <p className="mt-1 text-xs text-[#c9c0b1]">فعلاً داخل همین مرورگر ذخیره می‌شود؛ دیتابیس مرکزی در فاز بعد.</p>
                </div>
                {saved.length ? (
                  <button className="rounded-xl border border-rose-300/20 px-3 py-2 text-xs text-rose-200" onClick={clearCases} type="button">پاک‌کردن</button>
                ) : null}
              </div>
              <div className="mt-4 space-y-2">
                {saved.length === 0 ? <p className="text-sm text-[#c9c0b1]">هنوز تحلیلی ذخیره نشده.</p> : saved.slice(0, 8).map((item) => (
                  <div className="rounded-2xl border border-white/10 bg-white/[.03] p-3" key={item.id}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <b>{item.form.person || "بدون نام"}</b>
                      <span className="text-[11px] text-[#9f988d]">{new Date(item.createdAt).toLocaleString("fa-IR")}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.results.map((result) => <span className={`rounded-full border px-2 py-1 text-[11px] ${toneClass(result.tone)}`} key={result.key}>{result.title}: {result.label}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#c8953d]/35 bg-[#0a1727] p-5">
              <h2 className="text-xl font-bold">قوانین فعال V1</h2>
              <div className="mt-4 space-y-2 text-sm">
                <RuleLine code="RULE-PERSON-TREND-001" title="روند شخص" status="فعال" />
                <RuleLine code="RULE-STEP-001" title="قدم" status="فعال" />
                <RuleLine code="RULE-COUPLE-COMPAT-001" title="تفاهم زوجین" status="فعال" />
                <RuleLine code="RULE-COUPLE-HEALTH-001" title="سلامت زوجین" status="فعال با هشدار" />
                <RuleLine code="RULE-SURNAME-001" title="اسم و فامیل" status="تفسیر در انتظار" />
              </div>
              <p className="mt-4 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-xs leading-7 text-[#c9c0b1]">
                نگاشت حروف فارسی افزوده در موتور فعلی: پ=۲، چ=۳، ژ=۷، گ=۲۰. این نگاشت قابل نسخه‌بندی و اصلاح است.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AbjadBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.03] p-3 text-center">
      <div className="text-[11px] text-[#a9a093]">{label}</div>
      <div className="mt-2 text-xl font-black text-[#e0b866]">{value || "—"}</div>
    </div>
  );
}

function RuleLine({ code, title, status }: { code: string; title: string; status: string }) {
  return (
    <div className="grid gap-1 rounded-2xl border border-white/10 bg-white/[.03] p-3 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <b>{title}</b>
        <p className="mt-1 break-all text-[10px] text-[#8e877d]">{code}</p>
      </div>
      <span className="text-xs text-[#dfbc79]">{status}</span>
    </div>
  );
}
