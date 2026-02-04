type Claims = {
  email?: string;
  user_metadata?: Record<string, unknown>;
};

export function getProfileDisplayName(claims?: Claims) {
  const metadata = claims?.user_metadata ?? {};
  const name =
    (metadata.full_name as string | undefined) ??
    (metadata.name as string | undefined) ??
    (metadata.preferred_username as string | undefined) ??
    (metadata.username as string | undefined);

  if (name && name.trim().length > 0) {
    return name;
  }

  if (claims?.email) {
    return claims.email.split("@")[0];
  }

  return "there";
}

export function getProfileInitials(name?: string, email?: string) {
  const base = name && name !== "there" ? name : (email ?? "");
  if (!base) {
    return "DL";
  }

  const parts = base
    .replace(/[@._-]/g, " ")
    .split(" ")
    .filter(Boolean);

  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? parts[0]?.[1] ?? "";

  return `${first}${second}`.toUpperCase() || "DL";
}
