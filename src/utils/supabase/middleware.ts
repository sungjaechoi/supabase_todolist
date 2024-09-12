import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  //? 중요: createServerClient와 supabase.auth.getUser() 사이에 어떠한 로직도 작성하지 마세요. 간단한 실수라도 발생하면 사용자가 무작위로 로그아웃되는 문제를 디버깅하기 매우 어렵게 만들 수 있습니다.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/auth/login') &&
    !request.nextUrl.pathname.startsWith('/api/userinfo') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    //? 사용자가 없으면, 사용자를 로그인 페이지로 리디렉션하는 응답을 할 수 있습니다.
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  //? 중요: 반드시 supabaseResponse 객체를 그대로 반환해야 합니다. 만약 NextResponse.next()를 사용해 새로운 응답 객체를 생성하려면 다음을 확실히 해야 합니다:

  // 1. Pass the request in it, like so:
  //? 1. 요청(request)을 다음과 같이 전달하세요:
  //    const myNewResponse = NextResponse.next({ request })

  // 2. Copy over the cookies, like so:
  //? 2. 쿠키를 다음과 같이 복사하세요:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())

  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  //? 3. 새로운 응답 객체를 필요한 대로 변경하되, 쿠키는 변경하지 마세요!

  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!
  //? 마지막으로: // return myNewResponse // 만약 이 과정을 지키지 않으면, 브라우저와 서버 간의 동기화가 깨져 사용자의 세션이 조기 종료될 수 있습니다!
  // const myNewResponse = NextResponse.next({ request })
  // myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())

  return supabaseResponse
}
