import { login } from "./actions";
import type { Metadata } from "next";
import { applicationBrand } from "../../lib/branding";

export const metadata: Metadata = { title: "Sign in" };

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;
  const invalidLogin = params.error === "invalid";

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark auth-brand-mark">{applicationBrand.mark}</div>

          <div className="brand-copy">
            <p className="brand-name">{applicationBrand.name}</p>
            <p className="brand-product">{applicationBrand.product}</p>
          </div>
        </div>

        <p className="auth-eyebrow">
          SECURE PROTOTYPE ACCESS
        </p>

        <h1 className="auth-title">
          Sign in
        </h1>

        <p className="auth-description">
          Enter the shared prototype credentials to access the platform.
        </p>

        {invalidLogin && (
          <div className="auth-alert" role="alert">
            The username or password is incorrect.
          </div>
        )}

        <form action={login}>
          <label className="auth-label" htmlFor="username">
            Username
          </label>

          <input
            className="auth-input"
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
          />

          <label className="auth-label" htmlFor="password">
            Password
          </label>

          <input
            className="auth-input"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />

          <button className="auth-submit" type="submit">
            Sign in
          </button>
        </form>

        <p className="auth-footnote">
          Prototype access only. Do not upload confidential or sensitive
          information.
        </p>
      </section>
    </main>
  );
}