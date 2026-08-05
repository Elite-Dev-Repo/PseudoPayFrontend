import {
  AtSign,
  Globe,
  Link,
  Mail,
  MapPin,
  Phone,
  Send,
  Share2,
  SwatchBook,
} from "lucide-react";

const Contact = () => {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Business", href: "#business" },
    { name: "Faqs", href: "#faqs" },
    { name: "Contact", href: "#contact" },
  ];

  const socials = [
    { icon: <AtSign size={18} />, label: "Email" },
    { icon: <Globe size={18} />, label: "Website" },
    { icon: <Share2 size={18} />, label: "Share" },
    { icon: <Link size={18} />, label: "Link" },
  ];

  return (
    <section className="min-h-screen w-screen" id="contact">
      <div className="cont min-h-screen flex flex-col justify-end pb-5">
        <div className="bg-primary text-white rounded-2xl p-10">
          <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-lg font-semibold flex items-center gap-2">
                <span className="bg-white p-2 rounded-sm flex items-center justify-center">
                  <SwatchBook strokeWidth={2} className="text-primary" />
                </span>
                PseudoPay
              </p>
              <p className="text-sm font-light text-white/70">
                The mock payment gateway for internet businesses. Accept
                payments, automate billing and scale globally.
              </p>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <span
                    key={social.label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-colors"
                  >
                    {social.icon}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="flex flex-col gap-2 text-sm font-light text-white/70">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-white">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-semibold">Contact Us</h4>
              <ul className="flex flex-col gap-3 text-sm font-light text-white/70">
                <li className="flex items-center gap-3">
                  <Mail size={16} /> support@pseudopay.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} /> +1 (555) 123-4567
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} /> 123 Payment Ave, Fintech District,
                  Lagos
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-semibold">Stay in the Loop</h4>
              <p className="text-sm font-light text-white/70">
                Get product updates and payment tips in your inbox.
              </p>
              <div className="flex items-center gap-2 bg-white/10 rounded-full p-1.5">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-white/40"
                />
                <button className="bg-white text-primary p-2.5 rounded-full flex items-center justify-center">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
          <p>&copy; 2026 PseudoPay. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
