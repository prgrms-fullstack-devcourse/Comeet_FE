import { Button } from "@/components/ui/button";

export function LoginPage() {
  const handleGitHubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = "http://localhost:3000/api/auth/github/callback";
    const scope = "user:email";
    const state = Math.random().toString(36).substring(7);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope,
      state: state,
    });
    const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

    sessionStorage.setItem("github_oauth_state", state);
    window.location.href = githubAuthUrl;
  };

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
          onClick={handleGitHubLogin}
          className="
          w-full
          h-12
          bg-brand-primary 
          hover:bg-brand-primary/90 
          text-brand-background 
          text-lg
          font-bold 
          gap-5
          cursor-pointer
        "
        >
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
