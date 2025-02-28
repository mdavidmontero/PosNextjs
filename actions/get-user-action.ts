// "use server";

// import getToken from "@/auth/token";
// import { UserSchema } from "../src/schemas/index";

// export async function getUserActive() {
//   const token = await getToken();
//   const url = `${process.env.API_URL}/auth/check-auth-status`;
//   const req = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const session = await req.json();
//   const result = UserSchema.safeParse(session);
//   if (result.success) {
//     return result.data;
//   }
// }
