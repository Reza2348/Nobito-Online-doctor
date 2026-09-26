"use client";

import React from "react";

import EntityTableHeader from "@/components/shared/EntityTableHeader/EntityTableHeader";
import EntityTableState from "@/components/shared/EntityTableState/EntityTableState";

type Accent = "blue" | "purple" | "teal";

interface EntityTableProps<T> {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accent: Accent;
  loadingText: string;
  emptyTitle: string;
  emptyDescription: string;
  errorTitle: string;

  items: T[];
  loading: boolean;
  errorMessage: string | null;
  savingId: string | null;

  onRefresh: () => void;
  onRetry: () => void;
  getItemId: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;

  listClassName?: string;

  editing?: unknown;
  renderForm?: () => React.ReactNode;
}

/**
 * جدول مشترک ادمین (Clinics / Consultants / Doctors).
 * جایگزین اسکلت تکراری loading/error/header/list/form که تو هر سه فایل کپی شده بود.
 */
export default function EntityTable<T>({
  icon,
  title,
  subtitle,
  accent,
  loadingText,
  emptyTitle,
  emptyDescription,
  errorTitle,
  items,
  loading,
  errorMessage,
  savingId,
  onRefresh,
  onRetry,
  getItemId,
  renderItem,
  listClassName = "space-y-4",
  editing,
  renderForm,
}: EntityTableProps<T>) {
  const headerProps = { icon, title, subtitle, accent };
  const stateProps = {
    icon,
    title,
    subtitle,
    accent,
    loadingText,
    emptyTitle,
    emptyDescription,
    errorTitle,
  };

  if (loading) {
    return <EntityTableState {...stateProps} type="loading" />;
  }

  if (errorMessage) {
    return (
      <EntityTableState
        {...stateProps}
        type="error"
        message={errorMessage}
        onRetry={onRetry}
      />
    );
  }

  return (
    <div dir="rtl" className="rounded-3xl bg-white p-6 shadow">
      <EntityTableHeader
        {...headerProps}
        onRefresh={onRefresh}
        refreshing={Boolean(savingId)}
      />

      {items.length === 0 ? (
        <EntityTableState {...stateProps} type="empty" />
      ) : (
        <div className={listClassName}>
          {items.map((item) => (
            <React.Fragment key={getItemId(item)}>
              {renderItem(item)}
            </React.Fragment>
          ))}
        </div>
      )}

      {Boolean(editing) && renderForm?.()}
    </div>
  );
}
