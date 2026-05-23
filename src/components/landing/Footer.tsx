import { Link } from "react-router-dom";
import logoDark from "@/assets/matchai-logo-dark.png";
import logoLight from "@/assets/matchai-logo-light.png";

const Footer = () => (
  <footer className="border-t border-border/30 py-12 bg-gray-900 text-gray-100 dark:bg-white dark:text-black dark:border-gray-200">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div>
          <Link to="/" className="inline-block" aria-label="MatchAI home">
            <img src={logoDark} alt="MatchAI" className="h-8 w-auto dark:hidden" />
            <img src={logoLight} alt="MatchAI" className="h-8 w-auto hidden dark:block" />
          </Link>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 leading-relaxed">
            AI-powered brand outreach for creators who want to land real deals.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-3 text-white dark:text-gray-900">Product</h4>
          <ul className="space-y-2 text-xs text-gray-400 dark:text-gray-500">
            <li><Link to="/how-it-works" className="hover:text-white dark:hover:text-gray-900 transition-colors">How it works</Link></li>
            <li><Link to="/features" className="hover:text-white dark:hover:text-gray-900 transition-colors">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-white dark:hover:text-gray-900 transition-colors">Pricing</Link></li>
            <li><Link to="/faq" className="hover:text-white dark:hover:text-gray-900 transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-3 text-white dark:text-gray-900">Legal</h4>
          <ul className="space-y-2 text-xs text-gray-400 dark:text-gray-500">
            <li><Link to="/privacy" className="hover:text-white dark:hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white dark:hover:text-gray-900 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-3 text-white dark:text-gray-900">Contact</h4>
          <ul className="space-y-2 text-xs text-gray-400 dark:text-gray-500">
            <li><a href="mailto:hello@matchai.com" className="hover:text-white dark:hover:text-gray-900 transition-colors">hello@matchai.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 dark:border-gray-200 pt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} MatchAI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
