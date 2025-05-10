'use client';

import Link from 'next/link';
import { HeartPulse, UserCircle, LogIn, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React, { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/symptom-checker', label: 'Symptom Checker' },
  { href: '/doctors', label: 'Find a Doctor' },
];

export function AppHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate checking auth status from localStorage
    const authStatus = localStorage.getItem('isLoggedInMediCall');
    setIsLoggedIn(authStatus === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedInMediCall');
    setIsLoggedIn(false);
    // Potentially redirect to home or login page
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/appointments">Appointments</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const DesktopNav = () => (
    <nav className="hidden md:flex items-center space-x-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          {link.label}
        </Link>
      ))}
      {isLoggedIn ? (
        <UserMenu />
      ) : (
        <Button asChild variant="outline">
          <Link href="/auth/login">
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Link>
        </Button>
      )}
    </nav>
  );
  
  const MobileNav = () => (
     <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <div className="flex flex-col space-y-4 p-4">
         <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setIsMobileMenuOpen(false)}>
            <HeartPulse className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">MediCall</span>
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
               onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenuSeparator />
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
              <Link href="/appointments" className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Appointments</Link>
              <Button variant="ghost" onClick={() => { handleLogout(); setIsMobileMenuOpen(false);}} className="w-full justify-start text-lg">
                <LogOut className="mr-2 h-5 w-5" /> Logout
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" className="w-full text-lg" onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/auth/login">
                <LogIn className="mr-2 h-5 w-5" /> Login
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <HeartPulse className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">MediCall</span>
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
