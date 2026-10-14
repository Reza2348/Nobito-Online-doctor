"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchSessionUser, type SessionUser } from "@/lib/authFallback";
import { supabase } from "@/lib/supabaseClient";
import type { AuthStatus, FailoverAction, FailoverStatus } from "@/Types/types";
import {
  getAuthStatus,
  getFailoverStatus,
  saveFailoverAction,
} from "@/components/LoginFailoverPanel/services/failoverApi";

export function useLoginFailover() {
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [sessionExists, setSessionExists] = useState<boolean | null>(null);
  const [failover, setFailover] = useState<FailoverStatus | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [failoverBusy, setFailoverBusy] = useState(false);

  const [error, setError] = useState("");
  const [failoverMessage, setFailoverMessage] = useState("");
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  // از ارسال هم‌زمان چند تغییر جلوگیری می‌کند.
  const updateLock = useRef(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setError("");

    const [statusResult, userResult, sessionResult, failoverResult] =
      await Promise.allSettled([
        getAuthStatus(),
        fetchSessionUser(),
        supabase.auth.getSession(),
        getFailoverStatus(),
      ]);

    if (statusResult.status === "fulfilled") {
      setAuthStatus(statusResult.value);
    } else {
      setAuthStatus(null);
      setError("دریافت وضعیت بک‌اند ناموفق بود.");
    }

    setSessionUser(userResult.status === "fulfilled" ? userResult.value : null);

    if (sessionResult.status === "fulfilled") {
      const { data, error: sessionError } = sessionResult.value;
      setSessionExists(sessionError ? null : Boolean(data.session));
    } else {
      setSessionExists(null);
    }

    if (failoverResult.status === "fulfilled") {
      setFailover(failoverResult.value);
      setFailoverMessage("");
    } else {
      setFailoverMessage(
        failoverResult.reason instanceof Error
          ? failoverResult.reason.message
          : "وضعیت Failover دریافت نشد.",
      );
    }

    setLastChecked(new Date().toLocaleString("fa-IR"));
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const updateFailover = useCallback(async (action: FailoverAction) => {
    if (updateLock.current) return;

    updateLock.current = true;
    setFailoverBusy(true);
    setFailoverMessage("");

    try {
      const message = await saveFailoverAction(action);
      const latestStatus = await getFailoverStatus();

      setFailover(latestStatus);
      setFailoverMessage(message);
    } catch (err) {
      setFailoverMessage(
        err instanceof Error ? err.message : "تغییر تنظیمات ناموفق بود.",
      );
    } finally {
      updateLock.current = false;
      setFailoverBusy(false);
    }
  }, []);

  return {
    authStatus,
    sessionUser,
    sessionExists,
    failover,
    loading,
    refreshing,
    failoverBusy,
    error,
    failoverMessage,
    lastChecked,
    refresh,
    updateFailover,
  };
}
