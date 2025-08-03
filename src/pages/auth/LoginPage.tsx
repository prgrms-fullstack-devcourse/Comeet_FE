import { Button } from "@/components/ui/button";

export function LoginPage() {
  return (
    <div className="flex flex-col justify-between min-h-full p-8">
      <section className="mt-20">
        <p className="text-brand-primary text-lg mb-8">
          우리 동네 개발자 커뮤니티
        </p>
        <h1 className="text-brand-primary text-5xl font-bold">CO-MEET</h1>
      </section>

      <section className="mx-auto">
        <img src="/logo.svg" alt="CO-MEET 로고" className="w-52 h-auto" />
      </section>

      <section className="mb-4">
        <Button
          className="
              w-full
              h-12
              bg-brand-primary 
              hover:bg-brand-primary/90 
              text-brand-background 
              text-lg
              font-bold 
              gap-5
            ">
          <img
            src="/github-black.svg"
            alt="Github 로고"
            className="w-8 h-auto"
          />
          <span>Github 로그인</span>
        </Button>
      </section>
    </div>
  );
}
