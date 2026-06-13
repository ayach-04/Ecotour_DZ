import { AlertCircle, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">


        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg mb-4">Our Approach</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Code of Ethics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Transparency Report
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Environmental Impact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Destinations */}
          <div>
            <h3 className="text-lg mb-4">Destinations</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sahara Desert
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Atlas Mountains
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Coastal Regions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cultural Sites
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Learning Modules
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Travel Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Stories & Articles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Partner NGOs */}
          <div>
            <h3 className="text-lg mb-4">Partner NGOs</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Sahara Conservation Fund</li>
              <li>Amazigh Heritage Foundation</li>
              <li>North Africa Ecology Network</li>
              <li>Local Community Cooperatives</li>
            </ul>
          </div>
        </div>

        
        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© 2026 Algeria Ethical Travel. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
