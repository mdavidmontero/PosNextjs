import Link from "next/link";
import LoginForm from "../../../components/auth/LoginForm";
export default async function LoginPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-[#1a9fa8]">Iniciar Sesión</h1>
      <p className="text-3xl font-bold">
        y registra <span className="text-teal-500">tus ventas</span>
      </p>
      <LoginForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link href="/auth/register" className="text-center text-gray-500">
          ¿No tienes cuenta? Crea una
        </Link>

        <Link
          href="/auth/forgot-password"
          className="text-center text-gray-500"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
