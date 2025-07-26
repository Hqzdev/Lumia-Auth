export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/dashboard',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      // Если пользователь залогинен и находится на страницах входа/регистрации
      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('https://chat.lumiaai.ru', nextUrl as unknown as URL));
      }

      // Всегда разрешаем доступ к страницам регистрации и входа
      if (isOnRegister || isOnLogin) {
        return true;
      }

      // Для всех остальных страниц требуем аутентификацию
      if (isLoggedIn) {
        return true;
      }

      // Если не залогинен, перенаправляем на страницу входа
      return false;
    },
  },
};
