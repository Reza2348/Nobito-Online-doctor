"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

export const useAuthUser = () => {
  const [user, setUser] = H.useState<H.User | null>(null);

  H.useEffect(() => {
    const fetchUser = async () => {
      const { data } = await H.supabase.auth.getSession();

      if (data.session?.user) {
        const username =
          (data.session.user.user_metadata?.username as string) ||
          data.session.user.email?.split("@")[0] ||
          "US";

        setUser({
          id: data.session.user.id,
          username,
          email: data.session.user.email || "",
        });
      } else {
        setUser(null);
      }
    };

    fetchUser();

    const { data: listener } = H.supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const username =
            (session.user.user_metadata?.username as string) ||
            session.user.email?.split("@")[0] ||
            "US";

          setUser({
            id: session.user.id,
            username,
            email: session.user.email || "",
          });
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await H.supabase.auth.signOut();
    H.useRouter().push("/");
  };

  return { user, logout };
};
