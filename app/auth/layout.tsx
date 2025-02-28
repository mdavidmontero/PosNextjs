import Link from "next/link";
import { LogoAuth } from "../../components/ui/Logo";
import ToastNotification from "../../components/ui/ToastNotification";
import { redirect } from "next/navigation";
import getToken from "@/auth/token";

async function getUserActive() {
  const token = await getToken();
  const url = `${process.env.API_URL}/auth/check-auth-status`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  await req.json();

  if (req.status === 401) {
    return false;
  }
  return true;
}

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserActive();

  if (user) {
    redirect("/1");
  }

  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
        <div className="flex justify-center bg-gray-800 lg:bg-auth lg:bg-30 bg-no-repeat bg-left-bottom ">
          <div className="w-96 py-10 lg:py-20 flex justify-center items-center ">
            <Link href={"/"}>
              <LogoAuth />
            </Link>
          </div>
        </div>
        <div className="p-10 lg:py-28">
          <div className="max-w-3xl mx-auto">{children}</div>
        </div>
      </div>
      <ToastNotification />
    </>
  );
}
