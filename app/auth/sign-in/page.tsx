import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Admin access</p>
            <h1 className="text-4xl font-semibold text-[var(--foreground)]">Sign in to Sandbox Admin</h1>
          </div>
          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirectTo: "/admin",
              });
            }}
            className="space-y-5"
          >
            <div>
              <Label>Email</Label>
              <Input name="email" type="email" required />
            </div>
            <div>
              <Label>Password</Label>
              <Input name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          <p className="text-sm leading-7 text-[var(--muted-strong)]">
            Seed admin credentials are included in the README for local setup.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
