import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, ChevronRight, ShieldCheck, HeartHandshake, Heart, Leaf, BriefcaseBusiness, MessageCircle, BookOpen, HeartCrack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pages, topicLabels, navigation } from '@/lib/site-content';

import counselling from '@/assets/spouzy-counselling.jpg';
import marriage from '@/assets/spouzy-marriage.jpg';
import intimacy from '@/assets/spouzy-intimacy.jpg';
import wellness from '@/assets/spouzy-wellness.jpg';
import workplace from '@/assets/spouzy-workplace.jpg';
import premarriage from '@/assets/spouzy-premarriage.jpg';
import postmarriage from '@/assets/spouzy-postmarriage.jpg';
import relationships from '@/assets/spouzy-relationships.jpg';
import divorce from '@/assets/spouzy-divorce.jpg';
import sexed from '@/assets/spouzy-sexed.jpg';
import bedroom from '@/assets/spouzy-bedroom.jpg';
import intimacyproblems from '@/assets/spouzy-intimacyproblems.jpg';
import beauty from '@/assets/spouzy-beauty.jpg';
import menshealth from '@/assets/spouzy-menshealth.jpg';
import workplaceIndiv from '@/assets/spouzy-workplace-indiv.jpg';
import poshCompanies from '@/assets/spouzy-posh-companies.jpg';
import freeTips from '@/assets/spouzy-free-tips.jpg';

export function getPage(path: string) {
  const exact = pages[path];
  if (exact) return exact;
  const segments = path.split('/').filter(Boolean);
  const parent = pages['/' + (segments[0] ?? '')];
  const slug = segments[segments.length-1] ?? '';
  if (!parent || !topicLabels[slug]) return null;
  const title = topicLabels[slug];
  return { 
    title, 
    intro: parent.intro, 
    description: `${title} is part of Spouzy’s ${parent.title.toLowerCase()} resources. We are preparing thoughtful, practical guidance for people in India. Explore the related topics below, or get in touch with a question.`, 
    section: 'Explore this topic', 
    points: parent.points, 
    next: '/' + segments[0], 
    nextLabel: `Explore ${parent.title}` 
  };
}

function getVisual(path: string) {
  if (path === '/marriage/pre-marriage') return { image: premarriage, alt: 'Young engaged couple discussing their future over tea', Icon: HeartHandshake };
  if (path === '/marriage/post-marriage') return { image: postmarriage, alt: 'A married couple sharing a quiet moment together at home', Icon: HeartHandshake };
  if (path === '/marriage/relationships') return { image: relationships, alt: 'A couple sharing a heart-to-heart conversation outdoors', Icon: HeartHandshake };
  if (path === '/marriage/divorce') return { image: divorce, alt: 'A person reflecting peacefully by a sunlit window', Icon: HeartCrack };
  if (path.startsWith('/marriage')) return { image: marriage, alt: 'A couple walking together hand in hand', Icon: HeartHandshake };

  if (path === '/intimacy/sex-education') return { image: sexed, alt: 'Clear educational material with books and warm tea', Icon: BookOpen };
  if (path === '/intimacy/bedroom-tips') return { image: bedroom, alt: 'A cozy romantic bedroom with warm soft lighting', Icon: Heart };
  if (path === '/intimacy/problems') return { image: intimacyproblems, alt: 'A couple holding hands with warmth and care', Icon: Heart };
  if (path.startsWith('/intimacy')) return { image: intimacy, alt: 'An adult couple sharing a quiet moment of connection', Icon: Heart };

  if (path === '/wellness/beauty' || path === '/wellness/aesthetic-intimacy') return { image: beauty, alt: 'A woman practicing natural skincare self-care routine', Icon: Leaf };
  if (path === '/wellness/for-men') return { image: menshealth, alt: 'A healthy man enjoying outdoor mindfulness in sunlight', Icon: Leaf };
  if (path.startsWith('/wellness')) return { image: wellness, alt: 'A woman taking time for her personal wellbeing', Icon: Leaf };

  if (path === '/sexual-harassment/for-individuals') return { image: workplaceIndiv, alt: 'A confident woman in a modern office environment', Icon: ShieldCheck };
  if (path === '/sexual-harassment/for-companies' || path === '/corporates' || path === '/tools/posh-compliance-checker') return { image: poshCompanies, alt: 'A corporate team in a workplace safety session', Icon: ShieldCheck };
  if (path.startsWith('/sexual-harassment')) return { image: workplace, alt: 'A team attending a workplace respect workshop', Icon: ShieldCheck };

  if (path.startsWith('/free')) return { image: freeTips, alt: 'A journal, pen, and coffee cup on a wooden table', Icon: BookOpen };
  if (path.startsWith('/services')) return { image: counselling, alt: 'A warm counselling setting for couples and individuals', Icon: BriefcaseBusiness };

  return { image: counselling, alt: 'Illustrative counselling conversation with an adult couple', Icon: MessageCircle };
}

export function ContentView({path}: {path: string}) {
  const page = getPage(path);
  if (!page) {
    return (
      <main className="container-site py-28 text-center">
        <p className="eyebrow text-primary">404</p>
        <h1 className="section-title mt-4">We couldn’t find that page.</h1>
        <p className="mx-auto mt-5 max-w-lg text-muted-foreground">The page may have moved. Take a look at our topics or return to the beginning.</p>
        <Button asChild className="mt-8 rounded-full"><Link to="/">Back to Spouzy <ArrowRight /></Link></Button>
      </main>
    );
  }

  const parentPath = '/' + path.split('/').filter(Boolean).slice(0,-1).join('/');
  const parent = path.split('/').filter(Boolean).length > 1 ? pages[parentPath] : undefined;
  const related = navigation.find(n => path === n.href || path.startsWith(n.href + '/'));
  const sensitive = path.startsWith('/sexual-harassment') || path === '/marriage/divorce';
  const visual = getVisual(path);

  return (
    <main>
      <div className="border-b border-border bg-muted/60">
        <div className="container-site py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="mx-2 inline size-3" />
          {parent && (
            <>
              <Link to={parentPath} className="hover:text-primary">{parent.title}</Link>
              <ChevronRight className="mx-2 inline size-3" />
            </>
          )}
          <span className="font-semibold text-foreground">{page.title}</span>
        </div>
      </div>

      <section className="container-site grid min-h-[440px] items-center gap-10 py-20 lg:grid-cols-[1.2fr_.8fr] lg:py-28">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <visual.Icon className="size-4 text-primary" aria-hidden="true" />
            Spouzy / {related?.label || 'Information'}
          </p>
          <h1 className="hero-title mt-5 max-w-3xl">{page.title}</h1>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-relaxed text-primary">{page.intro}</p>
          <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">{page.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-7"><Link to={page.next || '/contact'}>{page.nextLabel || 'Get in touch'} <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-7"><Link to="/free">Free resources</Link></Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-md bg-secondary shadow-sm">
          <img src={visual.image} alt={visual.alt} width={1200} height={960} className="aspect-[1.35] w-full object-cover lg:aspect-[1.05]" />
        </div>
      </section>

      <section className="section-space bg-card">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow">A place to start</p>
            <h2 className="section-title mt-4">{page.section}</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {page.points.map((point, i) => (
              <div key={point} className="rounded-md border border-border bg-background p-7 transition-shadow hover:shadow-md">
                <span className="text-xs font-bold text-primary">0{i+1}</span>
                <p className="mt-5 text-lg font-semibold leading-relaxed text-foreground">{point}</p>
              </div>
            ))}
          </div>
          {related && (
            <div className="mt-12 flex flex-wrap gap-3">
              {related.children.filter(([,href]) => href !== path).map(([label, href]) => (
                <Link key={href} to={href} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
                  {label}
                  <ArrowUpRight className="size-3 text-primary" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {sensitive && (
        <section className="bg-blue-soft py-10">
          <div className="container-site flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-foreground">
              <ShieldCheck className="mr-2 inline size-5 text-primary" />
              If you are in danger, call 112. For workplace complaints, visit the <a className="font-semibold underline" href="https://shebox.wcd.gov.in/">government SHe-Box portal</a>. General information, not legal advice.
            </p>
            <Button variant="outline" onClick={() => { window.location.replace('https://www.google.com'); }}>
              Quick exit <ArrowUpRight />
            </Button>
          </div>
        </section>
      )}

      <section className="bg-plum py-16 text-plum-foreground">
        <div className="container-site flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-accent opacity-90">Whenever you’re ready</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">You don’t have to figure it out alone.</h2>
          </div>
          <Button asChild size="lg" variant="secondary" className="rounded-full px-7">
            <Link to="/contact">Contact Spouzy <ArrowRight /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
