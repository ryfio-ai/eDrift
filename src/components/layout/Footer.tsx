import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-border-subtle pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Col 1: Logo + Tagline */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center font-bold text-navy-dark">
              e
            </div>
            <span className="font-space text-xl font-bold text-text-primary">
              eDrift <span className="text-accent-teal">Electric</span>
            </span>
          </Link>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
             Pioneering advanced power electronics for the electric mobility ecosystem with cutting-edge SiC & GaN technology.
          </p>
          <div className="flex gap-4">
             <a href="https://www.linkedin.com/in/sankar-edriftelectric" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-teal transition-colors">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
             </a>
          </div>
        </div>

        {/* Col 2: Products */}
        <div>
          <h4 className="text-text-primary font-bold mb-6">Products</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/products/onboard-charger" className="text-text-secondary hover:text-accent-teal transition-colors">On-Board Charger (OBC)</Link></li>
            <li><Link href="/products/portable-charger" className="text-text-secondary hover:text-accent-teal transition-colors">Portable EV Charger</Link></li>
            <li><span className="text-text-secondary/50">DC-DC Converter</span></li>
            <li><span className="text-text-secondary/50">Integrated Charger</span></li>
          </ul>
        </div>

        {/* Col 3: Company */}
        <div>
          <h4 className="text-text-primary font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/#about" className="text-text-secondary hover:text-accent-teal transition-colors">About Us</Link></li>
            <li><Link href="/#team" className="text-text-secondary hover:text-accent-teal transition-colors">Our Team</Link></li>
            <li><Link href="/contact" className="text-text-secondary hover:text-accent-teal transition-colors">Contact</Link></li>
            <li><Link href="/contact" className="text-text-secondary hover:text-accent-teal transition-colors">Careers</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact info */}
        <div>
          <h4 className="text-text-primary font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex flex-col">
              <span className="text-text-secondary">Email</span>
              <a href="mailto:sankar.s@edriftelectric.com" className="text-text-primary hover:text-accent-teal transition-colors">sankar.s@edriftelectric.com</a>
            </li>
            <li className="flex flex-col">
              <span className="text-text-secondary">Phone</span>
              <a href="tel:+919790274709" className="text-text-primary hover:text-accent-teal transition-colors">+91-9790274709</a>
            </li>
            <li className="flex flex-col">
              <span className="text-text-secondary">Location</span>
              <span className="text-text-primary">Coimbatore, Tamil Nadu, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary">
        <p>© 2025 eDrift Electric Private Limited. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-text-primary">Privacy Policy</Link>
          <Link href="#" className="hover:text-text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
