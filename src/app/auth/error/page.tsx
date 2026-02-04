import { Suspense } from "react";
import { AuthShell } from "@/modules/auth/components/auth-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function ErrorContent({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams;

  return (
    <>
      {params?.error ? (
        <p className="text-sm text-muted-foreground">Code error: {params.error}</p>
      ) : (
        <p className="text-sm text-muted-foreground">An unspecified error occurred.</p>
      )}
    </>
  );
}

export default function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  return (
    <AuthShell>
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="text-2xl">Sorry, something went wrong.</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense>
            <ErrorContent searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
