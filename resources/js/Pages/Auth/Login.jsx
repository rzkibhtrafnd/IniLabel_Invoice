import { Head, router, useForm } from "@inertiajs/react";

export default function Login() {
  const { data, reset, setData, processing } = useForm({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setData(e.target.id, e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.post('/login', data, {
      onSuccess: () => reset()
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Head title="Login" />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition duration-300"
          >
            {processing ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
