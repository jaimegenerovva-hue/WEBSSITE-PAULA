/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Search, 
  ChevronRight, 
  BookOpen, 
  Zap, 
  Layout, 
  Cloud, 
  Layers, 
  Puzzle, 
  Users, 
  PenTool, 
  Shield, 
  Clock,
  Menu,
  X 
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Simple section detection for active state
      const sections = ['inicio', 'que-es-un-cms', 'diferencias-clave', 'referencias'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'INICIO', href: '#inicio', id: 'inicio' },
    { name: 'CMS', href: '#que-es-un-cms', id: 'que-es-un-cms' },
    { name: 'COMPARATIVA', href: '#diferencias-clave', id: 'diferencias-clave' },
    { name: 'RECURSOS', href: '#referencias', id: 'referencias' }
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#C9A84C]/20">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#C9A84C] origin-left z-[70]" 
        style={{ scaleX }} 
      />

      {/* Top Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-[#C9A84C]/20 py-3' : 'bg-[#0D0D0D] border-transparent py-5'
      }`}>
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-center relative">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                title={`Ir a la sección ${item.name}`}
                aria-label={`Ir a la sección ${item.name}`}
                className={`text-[11px] uppercase tracking-widest font-bold transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'text-[#C9A84C] border-b-2 border-[#C9A84C]' 
                    : 'text-white hover:text-[#C9A84C]'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden absolute right-6 text-white hover:text-[#C9A84C] transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0D0D0D] border-t border-[#C9A84C]/15"
          >
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                title={`Ir a la sección ${item.name}`}
                aria-label={`Ir a la sección ${item.name}`}
                className="block w-full px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-white border-b border-[#C9A84C]/15 hover:text-[#C9A84C] hover:bg-[#C9A84C]/8 transition-all"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Header */}
      <header id="inicio" className="w-full bg-[#F5F0E8] pt-[180px] pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 rounded-full bg-black text-[#C9A84C] border border-[#C9A84C]/30 text-[12px] font-bold tracking-wide mb-6 uppercase"
            >
              Tecnología Web
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-[#1A1A1A] leading-[1.1] tracking-tight mb-8"
            >
              La Guía Definitiva sobre CMS
              <span className="block text-[#C9A84C] mt-2 underline decoration-[#C9A84C]/20">Potencia tu Presencia Digital</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-2xl text-[#1A1A1A]/70 leading-relaxed mb-6 max-w-3xl mx-auto font-medium"
            >
              Todo lo que necesitas saber para elegir la plataforma ideal para tu proyecto web y llevar tu contenido al siguiente nivel.
            </motion.p>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Strip 1: What is CMS & Sidebar */}
        <section className="w-full bg-[#111111] py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-start gap-16">
            <article className="lg:w-2/3">
              <div id="que-es-un-cms" className="bg-[#1A1A1A] p-6 md:p-10 rounded-xl border border-[#C9A84C]/30 shadow-2xl">
                <h2 className="text-3xl font-black text-[#C9A84C] mb-8 tracking-tight flex items-center gap-4">
                  <span className="w-1.5 h-8 bg-[#C9A84C] rounded-full" />
                  ¿Qué es un CMS?
                </h2>
                <div className="text-lg text-white/80 leading-relaxed space-y-6">
                  <p>
                    Un Sistema de Gestión de Contenidos (CMS, por sus siglas en inglés) es una herramienta de software que permite a los usuarios crear, administrar y modificar el contenido de un sitio web sin necesidad de conocimientos técnicos profundos en programación.
                  </p>
                  <p>
                    En lugar de escribir código HTML o CSS desde cero, un CMS proporciona una interfaz intuitiva donde puedes redactar artículos, subir imágenes y estructurar la navegación de tu sitio de forma visual y eficiente.
                  </p>
                </div>

                <h3 className="text-[18px] font-bold text-[#C9A84C] mt-[28px] mb-2">¿Para qué sirve un CMS?</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  Un CMS permite gestionar el ciclo de vida completo del contenido digital: creación, edición, publicación y archivo. Facilita la colaboración entre equipos, automatiza flujos de trabajo y centraliza todos los activos digitales en un único entorno.
                </p>

                <h3 className="text-[18px] font-bold text-[#C9A84C] mt-[28px] mb-2">¿Quién debería usar un CMS?</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  Cualquier persona o empresa que necesite mantener un sitio web actualizado sin depender de un desarrollador. Desde bloggers independientes hasta grandes corporaciones utilizan CMS para agilizar su presencia digital.
                </p>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="mt-8 md:mt-12 rounded-xl overflow-hidden border border-[#C9A84C]/20 shadow-2xl cms-image-container"
                >
                  <img 
                    src="https://i.ibb.co/jvnVd9nq/cms-t.jpg" 
                    alt="Representación visual de los principales sistemas de gestión de contenidos: WordPress, Drupal y Joomla"
                    className="w-full max-h-[320px] object-cover object-center cms-main-image"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </article>

            {/* Sidebar inside Strip 1 */}
            <aside className="lg:w-1/3 lg:sticky lg:top-[120px] space-y-3">
              <section className="bg-[#1A1A1A] p-8 rounded-xl border border-[#C9A84C]/30 shadow-xl">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] mb-8 border-b border-[#C9A84C]/10 pb-4">Sobre el autor</h4>
                <div className="flex flex-col items-center text-center">
                  <img 
                    src="https://i.ibb.co/Z6zXSQsT/Whats-App-Image-2026-04-30-at-13-36-53.jpg" 
                    alt="Foto de perfil de la autora Paula Miranda Morillo en primer plano"
                    className="w-24 h-24 rounded-full object-cover mb-6 border-2 border-[#C9A84C]"
                    referrerPolicy="no-referrer"
                  />
                  <h5 className="text-xl font-bold text-white mb-2 underline decoration-[#C9A84C]">Paula Miranda Morillo</h5>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-[12px] text-[#C9A84C] font-medium">Fecha de creación: 27 de mayo de 2026</span>
                    <span className="text-[12px] text-[#C9A84C] font-medium">Última actualización: 30 de mayo de 2026</span>
                  </div>
                </div>
              </section>

              <section className="bg-[#1A1A1A] p-6 rounded-xl border border-[#C9A84C]/30 shadow-xl">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] mb-6 px-2 border-b border-[#C9A84C]/10 pb-4">Categorías</h4>
                <div className="flex flex-wrap gap-2 px-2">
                  {['Tecnología', 'CMS', 'WordPress', 'Diseño Web'].map(cat => (
                    <a key={cat} href="#" title={`Ver artículos de ${cat}`} className="px-4 py-2 bg-black border border-[#C9A84C]/40 rounded-[4px] text-xs font-bold text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all">
                      {cat}
                    </a>
                  ))}
                </div>
              </section>

              {/* Sidebar CMS section */}
              <section className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] px-2 mb-2">CMS más populares</h4>
                <div className="grid grid-cols-1 gap-1.5 px-2">
                  {[
                    { 
                      name: 'WordPress', 
                      icon: <Layout size={14} className="text-black" />, 
                      bg: 'bg-[#C9A84C]', 
                      type: 'Open Source', 
                      desc: 'La plataforma más utilizada del mundo, ideal para blogs y tiendas.',
                      url: 'https://wordpress.org'
                    },
                    { 
                      name: 'Wix', 
                      icon: <Cloud size={14} className="text-black" />, 
                      bg: 'bg-[#C9A84C]', 
                      type: 'SaaS', 
                      desc: 'Plataforma SaaS con editor visual drag-and-drop. Ideal para CMS principiantes.',
                      url: 'https://www.wix.com'
                    },
                    { 
                      name: 'Drupal', 
                      icon: <Layers size={14} className="text-black" />, 
                      bg: 'bg-[#C9A84C]', 
                      type: 'Open Source', 
                      desc: 'Potente y flexible, preferido por instituciones gubernamentales.',
                      url: 'https://www.drupal.org'
                    },
                    { 
                      name: 'Joomla', 
                      icon: <Puzzle size={14} className="text-black" />, 
                      bg: 'bg-[#C9A84C]', 
                      type: 'Open Source', 
                      desc: 'El equilibrio entre la facilidad y la potencia escalable.',
                      url: 'https://www.joomla.org'
                    },
                  ].map((cms, i) => (
                    <motion.a 
                      key={cms.name}
                      href={cms.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Visitar el sitio oficial de ${cms.name}`}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group bg-[#1A1A1A] p-2 px-2.5 rounded-lg border border-[#C9A84C]/30 hover:border-[#C9A84C] transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className={`w-6 h-6 ${cms.bg} flex items-center justify-center rounded-[4px] shadow-lg`}>
                          {cms.icon}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-1.5 py-0.5 rounded">
                          {cms.type}
                        </span>
                      </div>
                      <h4 className="text-[13px] font-semibold text-white group-hover:text-[#C9A84C] transition-colors mb-1">{cms.name}</h4>
                      <p className="text-white/60 text-[11px] leading-[1.4]">{cms.desc}</p>
                    </motion.a>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>

        {/* Integrated popular CMS moved above */}

        {/* Strip 2: Similitudes (Cream Background) */}
        <section id="comparativa" className="w-full bg-[#F5F0E8] py-[100px] text-[#1A1A1A] relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <h2 className="text-4xl font-black mb-16 text-center tracking-tight text-[#1A1A1A]">
              Similitudes entre <span className="text-[#C9A84C]">CMS</span>
            </h2>
            <div className="max-w-[720px] mx-auto space-y-0 bg-white p-8 rounded-xl shadow-xl border border-[#C9A84C]/10">
              {[
                { title: 'Panel de administración', desc: 'Interfaz centralizada para gestionar el backend sin tocar código.', icon: <Layout size={20} /> },
                { title: 'Edición de contenido', desc: 'Editores visuales (WYSIWYG) para publicar textos y medios fácilmente.', icon: <PenTool size={20} /> },
                { title: 'Gestión de usuarios', desc: 'Asignación de roles y permisos para equipos colaborativos.', icon: <Users size={20} /> },
                { title: 'Gestión de extensiones', desc: 'Ampliación de funcionalidades mediante plugins o módulos sin tocar código.', icon: <Puzzle size={20} /> },
                { title: 'Soporte SEO', desc: 'Herramientas integradas para optimizar el posicionamiento en buscadores.', icon: <Search size={20} /> },
              ].map((item, idx, array) => (
                <div 
                  key={idx} 
                  className={`flex items-start gap-6 py-6 ${idx !== array.length - 1 ? 'border-b border-[#C9A84C]/20' : ''}`}
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-black rounded-[4px] flex items-center justify-center text-[#C9A84C] shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1A1A1A] mb-1">{item.title}</h3>
                    <p className="text-[#1A1A1A]/70 text-[15px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        </section>

        {/* Strip 3: Differences (Dark Background) */}
        <section id="diferencias-clave" className="w-full bg-[#111111] py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-4xl font-black text-[#C9A84C] mb-16 tracking-tight text-center lg:text-left">Diferencias clave</h2>
            <span className="md:hidden block text-[11px] text-[#C9A84C] text-center mb-[6px]">← Desliza para ver más →</span>
            <div className="overflow-x-auto -webkit-overflow-scrolling-touch rounded-xl border border-[#C9A84C]/20 shadow-2xl mobile-scroll-container">
              <table className="min-w-[600px] md:min-w-full w-full text-left">
                <thead className="bg-[#C9A84C] text-black">
                  <tr>
                    <th className="p-5 px-8 text-[11px] font-black uppercase tracking-widest">CMS</th>
                    <th className="p-5 px-8 text-[11px] font-black uppercase tracking-widest">Tipo</th>
                    <th className="p-5 px-8 text-[11px] font-black uppercase tracking-widest">Facilidad</th>
                    <th className="p-5 px-8 text-[11px] font-black uppercase tracking-widest">Personalización</th>
                    <th className="p-5 px-8 text-[11px] font-black uppercase tracking-widest">Ideal para</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A84C]/10 bg-[#1A1A1A]">
                  {[
                    { name: 'WordPress', data: ['Open Source', 'Alta', 'Muy Alta', 'Todo tipo'] },
                    { name: 'Drupal', data: ['Open Source', 'Baja', 'Extrema', 'Grandes empresas'] },
                    { name: 'Joomla', data: ['Open Source', 'Media', 'Alta', 'Sitios medianos'] },
                    { name: 'Wix', data: ['SaaS', 'Muy Alta', 'Media', 'Principiantes'] },
                  ].map((cms, i) => (
                    <tr 
                      key={cms.name} 
                      className="transition-all duration-150 hover:bg-black/40 group"
                    >
                      <td className="p-5 px-8 font-bold text-[#C9A84C] group-hover:pl-10 transition-all">{cms.name}</td>
                      <td className="p-5 px-8 text-sm text-white/70 font-medium">{cms.data[0]}</td>
                      <td className="p-5 px-8 text-sm text-white/70 font-medium">{cms.data[1]}</td>
                      <td className="p-5 px-8 text-sm text-white/70 font-medium">{cms.data[2]}</td>
                      <td className="p-5 px-8 text-sm text-white/70 font-medium">{cms.data[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Strip 4: Conclusion (Cream Background) */}
        <section className="w-full bg-[#F5F0E8] py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div id="conclusion" className="relative pl-12 py-10 bg-white rounded-xl border border-[#C9A84C]/10 shadow-xl">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#C9A84C] rounded-l-xl" />
              <h2 className="text-4xl font-black text-[#1A1A1A] mb-6 tracking-tight">Conclusión</h2>
              <p className="text-xl text-[#1A1A1A]/80 leading-relaxed max-w-4xl px-4 font-medium italic">
                Elegir el CMS adecuado depende de la escala del proyecto, el presupuesto y la capacidad técnica. WordPress destaca por su comunidad y versatilidad; Drupal es la opción preferida para grandes instituciones que requieren seguridad avanzada; Joomla representa un equilibrio entre ambos, ideal para sitios medianos; y Wix es la alternativa SaaS más accesible para proyectos sencillos. Evalúa tus necesidades a largo plazo antes de comprometerte con una plataforma.
              </p>
            </div>
          </div>
        </section>

        {/* Strip 5: References (Dark Background) */}
        <section id="referencias" className="w-full bg-[#111111] py-[100px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="bg-[#1A1A1A] border-l-8 border-[#C9A84C] p-12 rounded-xl shadow-2xl">
              <h2 className="text-3xl font-black text-[#C9A84C] mb-10 flex items-center gap-3">
                <span className="opacity-50">#</span> Referencias y Fuentes
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16">
                {[
                  { 
                    name: 'WordPress.org', 
                    desc: 'Documentación oficial de WordPress.', 
                    url: 'https://wordpress.org',
                    title: 'Documentación oficial de WordPress',
                    aria: 'Ir a la documentación oficial de WordPress'
                  },
                  { 
                    name: 'Drupal.org', 
                    desc: 'Documentación oficial de Drupal.', 
                    url: 'https://drupal.org',
                    title: 'Documentación oficial de Drupal',
                    aria: 'Ir a la documentación oficial de Drupal'
                  },
                  { 
                    name: 'Joomla.org', 
                    desc: 'Documentación oficial de Joomla.', 
                    url: 'https://joomla.org',
                    title: 'Documentación oficial de Joomla',
                    aria: 'Ir a la documentación oficial de Joomla'
                  },
                  { 
                    name: 'Wix.com', 
                    desc: 'Centro de ayuda oficial de Wix.', 
                    url: 'https://support.wix.com',
                    title: 'Centro de ayuda oficial de Wix',
                    aria: 'Ir al centro de ayuda oficial de Wix'
                  },
                  { 
                    name: 'W3Techs (2024)', 
                    desc: 'Estadísticas de uso de CMS a nivel mundial.', 
                    url: 'https://w3techs.com',
                    title: 'Estadísticas de uso de CMS a nivel mundial por W3Techs',
                    aria: 'Ver estadísticas de uso de CMS en W3Techs'
                  },
                  { 
                    name: 'MDN Web Docs', 
                    desc: 'Introducción a los sistemas de gestión de contenidos.', 
                    url: 'https://developer.mozilla.org/es/docs/Glossary/CMS',
                    title: 'Introducción a los sistemas de gestión de contenidos en MDN',
                    aria: 'Ir a MDN Web Docs sobre CMS'
                  },
                ].map((ref, idx) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <span className="text-[#C9A84C] group-hover:translate-x-1 transition-transform">→</span>
                    <div className="flex flex-col">
                      <a 
                        href={ref.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title={ref.title}
                        aria-label={ref.aria}
                        className="text-lg font-bold text-[#C9A84C] hover:underline transition-all"
                      >
                        {ref.name}
                      </a>
                      <span className="text-sm text-white/40 font-medium mt-1 tracking-wide">{ref.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full bg-[#0D0D0D] py-[40px] px-[20px] border-t border-[#C9A84C]/30">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[18px] italic text-[#F5F0E8] max-w-[600px] mx-auto leading-relaxed">
            "El conocimiento compartido es la única riqueza que crece cuando se da."
          </p>
          <p className="text-[13px] text-[#C9A84C] mt-[16px] tracking-[2px] uppercase font-bold">
            — Paula Miranda Morillo
          </p>
        </div>
      </footer>
    </div>
  );
}
