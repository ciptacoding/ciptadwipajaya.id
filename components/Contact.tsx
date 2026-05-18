export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="section-num reveal" style={{ justifyContent: 'center' }}>
        05 — Contact
      </div>
      <h2 id="contact-title" className="contact-title reveal" data-delay="1">
        Let&apos;s build
        <br />
        something useful.
      </h2>
      <p
        className="section-sub reveal"
        data-delay="2"
        style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}
      >
        Tertarik kolaborasi, riset, atau hanya bertukar pikiran tentang membangun di sektor
        publik? Pintu saya terbuka.
      </p>

      <a
        className="mail reveal"
        data-delay="3"
        href="https://wa.me/6285858038176?text=Hi%20Cipta%2C%20I%27d%20like%20to%20get%20in%20touch."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Cipta Dwipajaya on WhatsApp"
      >
        → open.channel()
      </a>

      <nav className="socials reveal" data-delay="4" aria-label="Social links">
        <a
          href="https://github.com/ciptacoding"
          target="_blank"
          rel="noopener noreferrer me"
          aria-label="GitHub: ciptacoding"
        >
          GitHub ↗
        </a>
        <a
          href="https://linkedin.com/in/cipta-dwipajaya-9019bb231"
          target="_blank"
          rel="noopener noreferrer me"
          aria-label="LinkedIn: Cipta Dwipajaya"
        >
          LinkedIn ↗
        </a>
        <a
          href="https://twitter.com/ciptadev"
          target="_blank"
          rel="noopener noreferrer me"
          aria-label="Twitter: @ciptadev"
        >
          Twitter ↗
        </a>
        <a
          href="https://instagram.com/ciptadwipajayaa"
          target="_blank"
          rel="noopener noreferrer me"
          aria-label="Instagram: @ciptadwipajayaa"
        >
          Instagram ↗
        </a>
      </nav>
    </section>
  )
}
