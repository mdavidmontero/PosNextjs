import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().min(1, "Email es obligatorio").email("Email no válido"),
    fullName: z.string().min(1, "Tu nombre no puede ser vacío"),
    password: z.string().min(8, "Contraseña debe tener al menos 6 caracteres"),
    password_confirmation: z
      .string()
      .min(8, "Contraseña debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo es obligatorio" })
    .email({ message: "Correo no válido" }),

  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  isActive: z.boolean(),
  roles: z.array(z.string()),
  token: z.string(),
});
