import { AppShell } from "@/components/AppShell";
import { PageSection } from "@/components/PageSection";
import { contentFileNames, safetyCopy } from "@/lib/content";

export default function AdminPage() {
  return (
    <AppShell>
      <PageSection
        eyebrow="مدیریت محتوا"
        title="ویرایش محتوا از فایل‌های JSON"
        description="فعلا لاگین، دیتابیس و ذخیره‌سازی آنلاین نداریم. متن‌های اپ از فایل‌های JSON زیر میان؛ اگه خواستی چیزی موندگار عوض بشه، همین فایل‌ها رو ویرایش می‌کنیم."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contentFileNames.map((fileName) => (
            <div className="soft-panel p-5" key={fileName}>
              <p className="text-sm text-[var(--olive)]">data/content</p>
              <h3 className="mt-2 font-semibold text-[#45483b]">{fileName}</h3>
            </div>
          ))}
        </div>
        <div className="soft-panel bg-[#fff8ee] p-5 text-sm leading-7 text-[#656155]">
          <p className="font-semibold text-[#45483b]">قانون انتشار امن</p>
          <p className="mt-2">{safetyCopy}</p>
        </div>
      </PageSection>
    </AppShell>
  );
}
