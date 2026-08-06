import { login } from "./actions";

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
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f4f6f8",
        padding: "24px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          border: "1px solid #d9e0e7",
          borderRadius: "16px",
          boxShadow: "0 18px 50px rgba(7, 29, 54, 0.10)",
          padding: "36px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              display: "grid",
              placeItems: "center",
              borderRadius: "12px",
              background: "#0b2e59",
              color: "#ffffff",
              fontWeight: 800,
            }}
          >
            DS
          </div>

          <div>
            <p
              style={{
                margin: 0,
                color: "#0b2e59",
                fontSize: "16px",
                fontWeight: 800,
              }}
            >
              Versaterm DroneSense
            </p>

            <p
              style={{
                margin: "3px 0 0",
                color: "#667085",
                fontSize: "12px",
              }}
            >
              Intelligence Platform
            </p>
          </div>
        </div>

        <p
          style={{
            margin: "0 0 8px",
            color: "#2563eb",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "1.1px",
          }}
        >
          SECURE PROTOTYPE ACCESS
        </p>

        <h1
          style={{
            margin: 0,
            color: "#0b2e59",
            fontSize: "30px",
          }}
        >
          Sign in
        </h1>

        <p
          style={{
            margin: "10px 0 28px",
            color: "#667085",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Enter the shared prototype credentials to access the platform.
        </p>

        {invalidLogin && (
          <div
            role="alert"
            style={{
              marginBottom: "18px",
              padding: "12px 14px",
              border: "1px solid #f1b8b8",
              borderRadius: "8px",
              background: "#fff1f1",
              color: "#a61b1b",
              fontSize: "13px",
            }}
          >
            The username or password is incorrect.
          </div>
        )}

        <form action={login}>
          <label
            htmlFor="username"
            style={{
              display: "block",
              marginBottom: "7px",
              color: "#27313d",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            style={{
              width: "100%",
              marginBottom: "18px",
              padding: "12px 13px",
              border: "1px solid #cdd6df",
              borderRadius: "8px",
              color: "#27313d",
              fontSize: "14px",
            }}
          />

          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "7px",
              color: "#27313d",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            style={{
              width: "100%",
              marginBottom: "22px",
              padding: "12px 13px",
              border: "1px solid #cdd6df",
              borderRadius: "8px",
              color: "#27313d",
              fontSize: "14px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px 16px",
              border: 0,
              borderRadius: "8px",
              background: "#0b2e59",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 800,
            }}
          >
            Sign in
          </button>
        </form>

        <p
          style={{
            margin: "22px 0 0",
            color: "#98a2b3",
            fontSize: "11px",
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          Prototype access only. Do not upload confidential or sensitive
          information.
        </p>
      </section>
    </main>
  );
}