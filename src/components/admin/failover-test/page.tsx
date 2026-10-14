import LoginFailoverPanel from "@/components/LoginFailoverPanel/LoginFailoverPanel";

export default function FailoverTestPage() {
  return (
    <main dir="rtl" className="min-h-screen p-6">
      <h1 className="mb-6 text-2xl font-bold">تست سیستم Failover</h1>

      <LoginFailoverPanel />
    </main>
  );
}
