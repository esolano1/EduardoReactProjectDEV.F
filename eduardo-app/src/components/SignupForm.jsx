import { useForm } from "react-hook-form";

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    // Simula envío
    await new Promise(r => setTimeout(r, 500));
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4 p-6 rounded-2xl border bg-white"
    >
      <h1 className="text-2xl font-semibold">Crear cuenta</h1>

      {/* Nombre */}
      <div>
        <label className="block text-sm mb-1">Nombre</label>
        <input
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:ring-blue-300"
          placeholder="Tu nombre"
          {...register("name", { required: "El nombre es obligatorio" })}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:ring-blue-300"
          placeholder="tucorreo@ejemplo.com"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email no válido"
            }
          })}
        />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-sm mb-1">Contraseña</label>
        <input
          type="password"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:ring-blue-300"
          placeholder="••••••••"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: { value: 8, message: "Mínimo 8 caracteres" }
          })}
        />
        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl px-4 py-2 font-medium bg-blue-600 text-white disabled:opacity-70"
      >
        {isSubmitting ? "Enviando..." : "Crear cuenta"}
      </button>
    </form>
  );
}
