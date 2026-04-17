import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function getErrorMessage(error?: string) {
  switch (error) {
    case "CredentialsSignin":
      return "Invalid email or password.";
    default:
      return error ? "Unable to sign in right now." : null;
  }
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl, error } = await searchParams;
  const errorMessage = getErrorMessage(error);

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

              try {
                await signIn("credentials", {
                  email: formData.get("email"),
                  password: formData.get("password"),
                  redirectTo:
                    (formData.get("callbackUrl") as string | null) || "/admin",
                });
              } catch (error) {
                if (error instanceof AuthError) {
                  redirect(
                    `/auth/sign-in?error=${encodeURIComponent(error.type)}${
                      formData.get("callbackUrl")
                        ? `&callbackUrl=${encodeURIComponent(formData.get("callbackUrl") as string)}`
                        : ""
                    }`,
                  );
                }

                throw error;
              }
            }}
            className="space-y-5"
          >
            <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/admin"} />
            <div>
              <Label>Email</Label>
              <Input name="email" type="email" required />
            </div>
            <div>
              <Label>Password</Label>
              <Input name="password" type="password" required />
            </div>
            {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          <p className="text-sm leading-7 text-[var(--muted-strong)]">
            Use your configured admin credentials. Seeded database admins and fallback admin
            credentials are both supported.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
