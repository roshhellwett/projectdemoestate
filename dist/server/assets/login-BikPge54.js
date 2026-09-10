import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-XLNAidv3.js";
import { t as getSupabaseBrowser } from "./supabase-C0JFk6-S.js";
import { n as Wordmark } from "./brand-DsEEJCZg.js";
//#region src/components/login-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** CMS login. Supabase email + password; the session lives in localStorage. */
function LoginForm() {
	const supabase = getSupabaseBrowser();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setError("");
		const { error: err } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (err) {
			setError(err.message);
			setBusy(false);
			return;
		}
		window.location.href = "/admin";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-paper px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "rounded-[var(--radius-card)] border border-line bg-white p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-medium text-ink",
						children: "Admin sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Manage listings, enquiries and content."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "login-email",
							className: "mb-1.5 block text-xs font-semibold text-ink",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "login-email",
							type: "email",
							required: true,
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "w-full rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-sm text-ink focus:border-brass focus:outline-none"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "login-pass",
							className: "mb-1.5 block text-xs font-semibold text-ink",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "login-pass",
							type: "password",
							required: true,
							autoComplete: "current-password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "w-full rounded-[var(--radius-input)] border border-line bg-paper px-4 py-2.5 text-sm text-ink focus:border-brass focus:outline-none"
						})] })]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "mt-4 text-xs text-danger",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "mt-6 w-full rounded-full bg-ink py-3 text-sm font-semibold text-paper transition-opacity disabled:opacity-60",
						children: busy ? "Signing in…" : "Sign In"
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/routes/login.tsx?tsr-split=component
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {});
//#endregion
export { SplitComponent as component };
