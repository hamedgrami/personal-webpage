import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getWebsiteData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, GraduationCap, Mail, MapPin, Microscope } from "lucide-react"
import { GrapheneAnimation } from "@/components/graphene-animation"

export const metadata: Metadata = {
  title: "Scientist Personal Website",
  description: "A personal website for scientists to showcase their work and research",
}

export default async function Home() {
  const data = await getWebsiteData()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Microscope className="h-5 w-5" />
            <span>{data.name}</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#research" className="text-sm font-medium hover:underline underline-offset-4">
              Research
            </Link>
            <Link href="#publications" className="text-sm font-medium hover:underline underline-offset-4">
              Publications
            </Link>
            <Link href="#education" className="text-sm font-medium hover:underline underline-offset-4">
              Education
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <Link href="/admin" className="text-sm font-medium hover:underline underline-offset-4">
            Admin
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section id="hero" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
              <div className="flex flex-col justify-start space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{data.name}</h1>
                  <p className="text-xl text-muted-foreground">{data.title}</p>
                </div>

                {/* Personal Photo */}
                <div className="w-full max-w-[300px] aspect-square overflow-hidden rounded-xl border shadow-sm">
                  <Image
                    src={data.personalPhoto || "/placeholder.svg?height=300&width=300"}
                    alt={`${data.name} personal photo`}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{data.location}</span>
                </div>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">{data.bio}</p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#contact">
                    <Button>Contact Me</Button>
                  </Link>
                  <Link href="#publications">
                    <Button variant="outline">View Publications</Button>
                  </Link>
                </div>
              </div>
              <div className="aspect-square overflow-hidden rounded-xl border bg-background/80 shadow-sm lg:order-last">
                <GrapheneAnimation className="w-full h-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 bg-gradient-to-r from-slate-50 to-indigo-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-full max-w-md h-[200px] mx-auto">
                <GrapheneAnimation className="w-full h-full" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold">Exploring Electron Transport in Graphene</h2>
              <p className="mt-2 text-muted-foreground max-w-[600px]">
                Dedicated to advancing our understanding of electron dynamics between bulk graphene and slab structures.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{data.about}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="research" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Research Interests</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  My primary research areas and current projects.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.researchInterests.map((interest, index) => (
                  <Card key={index} className="flex flex-col items-center text-center">
                    <CardContent className="flex flex-col items-center space-y-4 p-6">
                      <Microscope className="h-12 w-12" />
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{interest.title}</h3>
                        <p className="text-sm text-muted-foreground">{interest.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="publications" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Publications</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  My published research papers and articles.
                </p>
              </div>
              <Tabs defaultValue="recent" className="w-full max-w-4xl">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="all">All Publications</TabsTrigger>
                </TabsList>
                <TabsContent value="recent" className="mt-6">
                  <div className="grid gap-6">
                    {data.publications.slice(0, 3).map((pub, index) => (
                      <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                        <BookOpen className="mt-1 h-5 w-5 text-primary" />
                        <div className="space-y-1 text-left">
                          <h3 className="font-semibold">{pub.title}</h3>
                          <p className="text-sm text-muted-foreground">{pub.authors}</p>
                          <p className="text-sm text-muted-foreground">
                            {pub.journal}, {pub.year}
                          </p>
                          {pub.link && (
                            <Link href={pub.link} className="text-sm text-primary hover:underline" target="_blank">
                              Read Paper
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="all" className="mt-6">
                  <div className="grid gap-6">
                    {data.publications.map((pub, index) => (
                      <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                        <BookOpen className="mt-1 h-5 w-5 text-primary" />
                        <div className="space-y-1 text-left">
                          <h3 className="font-semibold">{pub.title}</h3>
                          <p className="text-sm text-muted-foreground">{pub.authors}</p>
                          <p className="text-sm text-muted-foreground">
                            {pub.journal}, {pub.year}
                          </p>
                          {pub.link && (
                            <Link href={pub.link} className="text-sm text-primary hover:underline" target="_blank">
                              Read Paper
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section id="education" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Education</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  My academic background and qualifications.
                </p>
              </div>
              <div className="mx-auto grid max-w-3xl gap-6">
                {data.education.map((edu, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border bg-background p-4">
                    <GraduationCap className="mt-1 h-5 w-5 text-primary" />
                    <div className="space-y-1 text-left">
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-sm">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.year}</p>
                      {edu.description && <p className="text-sm text-muted-foreground">{edu.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Me</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get in touch for research collaborations or inquiries.
                </p>
              </div>
              <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <Mail className="h-12 w-12 text-primary" />
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold">Email</h3>
                      <p className="text-sm text-muted-foreground">{data.email}</p>
                      <Link href={`mailto:${data.email}`}>
                        <Button variant="outline" size="sm">
                          Send Email
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <FileText className="h-12 w-12 text-primary" />
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold">CV / Resume</h3>
                      <p className="text-sm text-muted-foreground">Download my curriculum vitae</p>
                      {data.cvLink ? (
                        <Link href={data.cvLink} target="_blank">
                          <Button variant="outline" size="sm">
                            Download CV
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          CV Not Available
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>
          <Link href="/admin" className="text-sm text-muted-foreground hover:underline">
            Admin Login
          </Link>
        </div>
      </footer>
    </div>
  )
}
