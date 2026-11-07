"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white" id="contact">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Footer Visual Banner */}
        <div className="relative w-full pt-0">
          <div className="relative mx-auto w-full max-w-[1100px] h-[280px] md:h-[420px] overflow-hidden">
            <Image
              src="/images/visual.jpg"
              alt="Ksome Studio cinematic visual"
              fill
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover object-center"
            />

            {/* Overall dark overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Blend top edge */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />

            {/* Blend bottom edge */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

            {/* Blend left edge */}
            <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-black to-transparent" />

            {/* Blend right edge */}
            <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-black to-transparent" />

            {/* Banner Text */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-white text-center">
                Stories That Move Humanity.
              </h2>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="py-14 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* Productions */}
            <div>
              <h4 className="text-white font-medium text-sm mb-6">
                Productions
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <a
                    href="#films"
                    className="hover:text-white transition-colors"
                  >
                    Feature Films
                  </a>
                </li>
                <li>
                  <a
                    href="#short-films"
                    className="hover:text-white transition-colors"
                  >
                    Short Films
                  </a>
                </li>
                <li>
                  <a
                    href="#documentaries"
                    className="hover:text-white transition-colors"
                  >
                    Documentaries
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="hover:text-white transition-colors"
                  >
                    Latest Projects
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-medium text-sm mb-6">Services</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <a
                    href="#film-production"
                    className="hover:text-white transition-colors"
                  >
                    Film Production
                  </a>
                </li>
                <li>
                  <a
                    href="#cinematography"
                    className="hover:text-white transition-colors"
                  >
                    Cinematography
                  </a>
                </li>
                <li>
                  <a
                    href="#post-production"
                    className="hover:text-white transition-colors"
                  >
                    Post-Production
                  </a>
                </li>
                <li>
                  <a
                    href="#creative-direction"
                    className="hover:text-white transition-colors"
                  >
                    Creative Direction
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-medium text-sm mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#team"
                    className="hover:text-white transition-colors"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="/portal"
                    className="hover:text-white transition-colors"
                  >
                    Portal
                  </a>
                </li>
                <li>
                  <a
                    href="/donate"
                    className="hover:text-white transition-colors"
                  >
                    Donate
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-white font-medium text-sm mb-6">Connect</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <a
                    href="mailto:hello@yourstudio.com"
                    className="hover:text-white transition-colors"
                  >
                    hello@ksomestudio.com
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Start a Project
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Ksome Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#top" className="hover:text-white transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
