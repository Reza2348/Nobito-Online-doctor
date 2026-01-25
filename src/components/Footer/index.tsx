"use client";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import type { FooterSection } from "@/Types/types";

// داده‌های Footer
const FOOTER_NAV: FooterSection[] = [
  {
    title: "Product & Service",
    links: [
      { name: "Products", href: "#" },
      { name: "Services", href: "#" },
      { name: "Appliances", href: "#" },
      { name: "Storage", href: "#", badge: "New" },
      { name: "Lifestyle", href: "#", external: true },
    ],
  },
  {
    title: "Shop Now",
    links: [
      { name: "Offers", href: "#" },
      { name: "Promos", href: "#" },
      { name: "Online Shop FAQ", href: "#" },
      { name: "Business Offer", href: "#", badge: "New" },
      { name: "Student Offer", href: "#", external: true },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact", href: "#" },
      { name: "Email Support", href: "#", external: true },
      { name: "Live Chat", href: "#", external: true },
      { name: "Phone Support", href: "#" },
      { name: "Community", href: "#", external: true },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "My Products", href: "#" },
      { name: "Orders", href: "#" },
      { name: "Wishlist", href: "#" },
      { name: "Service", href: "#", badge: "New" },
      { name: "Rewards", href: "#", external: true },
    ],
  },
  {
    title: "About",
    links: [
      { name: "Company Info", href: "#" },
      { name: "Brand Guidelines", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Investors", href: "#", badge: "New", external: true },
      { name: "About Us", href: "#", external: true },
    ],
  },
];

export default function Footer() {
  // تایپ فرم Newsletter
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    console.log("Newsletter signup:", email);
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-white text-gray-600 border-2 rounded-2xl">
      {/* Newsletter Section */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            <form
              onSubmit={handleNewsletterSubmit}
              className="w-full max-w-md mx-auto lg:mx-0"
              noValidate
            >
              <div className="flex flex-col sm:flex-row">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:rounded-r-lg sm:rounded-l-md"
                />
                <button
                  type="submit"
                  className="mt-3 sm:mt-0 sm:ml-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md sm:rounded-l-none sm:rounded-r-md transition-colors duration-150"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Join Our <span className="text-red-600">Newsletter</span>
              </h2>
              <p className="mt-2 text-gray-500">
                Be the first to know about our latest updates, exclusive offers,
                and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {FOOTER_NAV.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center text-sm hover:text-gray-800"
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.name}
                      {link.external && (
                        <FiExternalLink className="ml-1 h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                      )}
                      {link.badge && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-gray-800">
              English
            </a>
            <a href="#" className="text-sm hover:text-gray-800">
              Privacy
            </a>
            <a href="#" className="text-sm hover:text-gray-800">
              Legal
            </a>
          </div>
          <p className="mt-4 sm:mt-0 text-sm text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Cadet UI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
