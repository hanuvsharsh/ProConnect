import { NavigationHeader } from "@/components/navigation-header";
import { Sidebar } from "@/components/sidebar";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-light-grey">
      <NavigationHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {showSidebar && <Sidebar />}
          <main className={`flex-1 ${showSidebar ? 'max-w-4xl' : 'max-w-full'}`}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}