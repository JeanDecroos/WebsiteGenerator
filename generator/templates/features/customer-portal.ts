/**
 * Customer Portal Feature Templates
 */

export const portalPage = `import { Metadata } from "next";
import { redirect } from "next/navigation";
import { PortalDashboard } from "@/components/modules/portal-dashboard";
// import { auth } from "@/lib/auth"; // Uncomment when auth is configured

export const metadata: Metadata = {
  title: "Customer Portal",
  description: "Manage your account and view your data",
};

export default async function PortalPage() {
  // TODO: Uncomment when auth is configured
  // const session = await auth();
  // if (!session) {
  //   redirect("/login");
  // }

  // Mock user data for development
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
    plan: "Pro",
    memberSince: "2024-01-01",
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <PortalDashboard user={user} />
    </div>
  );
}
`;

export const portalDashboardComponent = `"use client";

import { useState } from "react";
import {
  User,
  Settings,
  CreditCard,
  FileText,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  name: string;
  email: string;
  avatar?: string | null;
  plan?: string;
  memberSince?: string;
}

interface PortalDashboardProps {
  user: User;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: User },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

export function PortalDashboard({ user }: PortalDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground">
          Manage your account and view your activity.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Log out</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border bg-card p-6">
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                  <p className="text-2xl font-bold">{user.plan || "Free"}</p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-2xl font-bold">
                    {user.memberSince
                      ? new Date(user.memberSince).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-2xl font-bold text-green-500">Active</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-lg border bg-card">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">Recent Activity</h2>
                </div>
                <div className="divide-y">
                  {[
                    { action: "Logged in", time: "2 hours ago" },
                    { action: "Updated profile", time: "1 day ago" },
                    { action: "Downloaded invoice", time: "3 days ago" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4">
                      <span>{item.action}</span>
                      <span className="text-sm text-muted-foreground">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-lg border bg-card">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">Quick Actions</h2>
                </div>
                <div className="divide-y">
                  {[
                    { label: "Update payment method", href: "#" },
                    { label: "Download invoices", href: "#" },
                    { label: "Contact support", href: "#" },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="flex items-center justify-between p-4 hover:bg-muted transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Billing</h2>
              <p className="text-muted-foreground">
                Billing management coming soon. Connect Stripe to enable payments.
              </p>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Documents</h2>
              <p className="text-muted-foreground">
                No documents available yet.
              </p>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <p className="text-muted-foreground">
                You're all caught up! No new notifications.
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full rounded-lg border bg-background px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full rounded-lg border bg-background px-4 py-2"
                  />
                </div>
                <button className="rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PortalDashboard;
`;

