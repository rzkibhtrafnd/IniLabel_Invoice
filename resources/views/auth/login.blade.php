<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-[sans-serif] bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-gray-800 text-3xl font-extrabold text-center">Sign in</h3>
        @if(session('error'))
            <p class="text-red-500 text-sm text-center mt-4">{{ session('error') }}</p>
        @endif

        <form action="{{ route('login') }}" method="POST" class="mt-6">
            @csrf
            <div>
                <label class="text-gray-800 text-sm block mb-2">Email</label>
                <input type="email" name="email" required class="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter email" />
            </div>

            <div class="mt-4">
                <label class="text-gray-800 text-sm block mb-2">Password</label>
                <input type="password" name="password" required class="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" />
            </div>

            <button type="submit" class="w-full mt-6 py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Sign in
            </button>
        </form>
    </div>
</body>
</html>
