import { useState, useRef, useEffect } from "react";
import { Search, Home, Users, MessageCircle, Bell, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type User } from "@shared/schema";

export function NavigationHeader() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search users query
  const { data: searchResults = [] } = useQuery<User[]>({
    queryKey: ['/api/search/users', searchQuery],
    enabled: searchQuery.length > 2,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.length > 2);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-linkedin-blue cursor-pointer">ProConnect</h1>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8" ref={searchRef}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                className="pl-10 pr-10"
                placeholder="Search professionals..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length > 2 && setShowResults(true)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute inset-y-0 right-0 px-3"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              
              {/* Search Results */}
              {showResults && searchResults.length > 0 && (
                <Card className="absolute top-full left-0 right-0 mt-1 shadow-lg z-50">
                  <CardContent className="p-2">
                    {searchResults.slice(0, 5).map((result) => (
                      <Link key={result.id} href={`/profile/${result.id}`}>
                        <div 
                          className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={() => {
                            setShowResults(false);
                            setSearchQuery("");
                          }}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={result.profileImage || ""} alt={result.name} />
                            <AvatarFallback>{result.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{result.name}</p>
                            {result.title && <p className="text-xs text-gray-600">{result.title}</p>}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <Button variant="ghost" className="flex flex-col items-center p-2 h-auto">
                <Home className="h-5 w-5" />
                <span className="text-xs mt-1">Home</span>
              </Button>
            </Link>
            <Link href="/network">
              <Button variant="ghost" className="flex flex-col items-center p-2 h-auto">
                <Users className="h-5 w-5" />
                <span className="text-xs mt-1">Network</span>
              </Button>
            </Link>
            <Link href="/messages">
              <Button variant="ghost" className="flex flex-col items-center p-2 h-auto">
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs mt-1">Messages</span>
              </Button>
            </Link>
            <Link href="/notifications">
              <Button variant="ghost" className="flex flex-col items-center p-2 h-auto">
                <Bell className="h-5 w-5" />
                <span className="text-xs mt-1">Notifications</span>
              </Button>
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.profileImage || ""} alt={user?.name || ""} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-sm font-medium">{user?.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/profile/${user?.id}`}>View Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
