"use client";

import { useLoginFailover } from "@/hooks/useLoginFailover";

import SystemStatusCard from "./SystemStatusCard/SystemStatusCard";
import DatabaseFailoverCard from "./DatabaseFailoverCard/DatabaseFailoverCard";
import SystemStatsCard from "./SystemStatsCard/SystemStatsCard";
import UserStatusCard from "./UserStatusCard/UserStatusCard";
import TestingGuideCard from "./TestingGuideCard/TestingGuideCard";

export default function LoginFailoverPanel() {
  const {
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
  } = useLoginFailover();

  return (
    <section
      dir="rtl"
      className="space-y-6 font-[tahoma]"
      aria-busy={loading || refreshing || failoverBusy}
    >
      <SystemStatusCard
        authStatus={authStatus}
        sessionExists={sessionExists}
        loading={loading}
        refreshing={refreshing}
        error={error}
        onRefresh={() => void refresh()}
      />

      <DatabaseFailoverCard
        status={failover}
        busy={failoverBusy}
        message={failoverMessage}
        onAction={(action) => void updateFailover(action)}
      />

      <SystemStatsCard status={authStatus} />

      <UserStatusCard user={sessionUser} />

      <TestingGuideCard lastChecked={lastChecked} />
    </section>
  );
}
