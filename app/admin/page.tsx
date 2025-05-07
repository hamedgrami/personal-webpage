"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { updateWebsiteData } from "@/lib/actions"

const personalInfoSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  about: z.string().min(10, { message: "About section must be at least 10 characters." }),
  profileImage: z.string().optional(),
  personalPhoto: z.string().optional(),
  cvLink: z.string().optional(),
})

const researchInterestSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
})

const publicationSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  authors: z.string().min(2, { message: "Authors must be at least 2 characters." }),
  journal: z.string().min(2, { message: "Journal must be at least 2 characters." }),
  year: z.string().min(4, { message: "Year must be at least 4 characters." }),
  link: z.string().optional(),
})

const educationSchema = z.object({
  degree: z.string().min(2, { message: "Degree must be at least 2 characters." }),
  institution: z.string().min(2, { message: "Institution must be at least 2 characters." }),
  year: z.string().min(4, { message: "Year must be at least 4 characters." }),
  description: z.string().optional(),
})

export default function AdminPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [websiteData, setWebsiteData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [researchInterests, setResearchInterests] = useState<any[]>([])
  const [publications, setPublications] = useState<any[]>([])
  const [education, setEducation] = useState<any[]>([])

  // Fetch website data on component mount
  useState(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/website-data")
        const data = await response.json()
        setWebsiteData(data)
        setResearchInterests(data.researchInterests || [])
        setPublications(data.publications || [])
        setEducation(data.education || [])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching website data:", error)
        toast({
          title: "Error",
          description: "Failed to load website data. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      title: "",
      location: "",
      email: "",
      bio: "",
      about: "",
      profileImage: "",
      personalPhoto: "",
      cvLink: "",
    },
  })

  // Update form values when data is loaded
  useState(() => {
    if (websiteData && !loading) {
      personalInfoForm.reset({
        name: websiteData.name || "",
        title: websiteData.title || "",
        location: websiteData.location || "",
        email: websiteData.email || "",
        bio: websiteData.bio || "",
        about: websiteData.about || "",
        profileImage: websiteData.profileImage || "",
        personalPhoto: websiteData.personalPhoto || "",
        cvLink: websiteData.cvLink || "",
      })
    }
  }, [websiteData, loading])

  const onSubmitPersonalInfo = async (data: z.infer<typeof personalInfoSchema>) => {
    try {
      const updatedData = {
        ...websiteData,
        ...data,
        researchInterests,
        publications,
        education,
      }

      await updateWebsiteData(updatedData)

      toast({
        title: "Success",
        description: "Personal information updated successfully.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating personal info:", error)
      toast({
        title: "Error",
        description: "Failed to update personal information. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addResearchInterest = () => {
    setResearchInterests([...researchInterests, { title: "", description: "" }])
  }

  const updateResearchInterest = (index: number, field: string, value: string) => {
    const updatedInterests = [...researchInterests]
    updatedInterests[index] = { ...updatedInterests[index], [field]: value }
    setResearchInterests(updatedInterests)
  }

  const removeResearchInterest = (index: number) => {
    const updatedInterests = [...researchInterests]
    updatedInterests.splice(index, 1)
    setResearchInterests(updatedInterests)
  }

  const saveResearchInterests = async () => {
    try {
      const updatedData = {
        ...websiteData,
        researchInterests,
      }

      await updateWebsiteData(updatedData)

      toast({
        title: "Success",
        description: "Research interests updated successfully.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating research interests:", error)
      toast({
        title: "Error",
        description: "Failed to update research interests. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addPublication = () => {
    setPublications([...publications, { title: "", authors: "", journal: "", year: "", link: "" }])
  }

  const updatePublication = (index: number, field: string, value: string) => {
    const updatedPublications = [...publications]
    updatedPublications[index] = { ...updatedPublications[index], [field]: value }
    setPublications(updatedPublications)
  }

  const removePublication = (index: number) => {
    const updatedPublications = [...publications]
    updatedPublications.splice(index, 1)
    setPublications(updatedPublications)
  }

  const savePublications = async () => {
    try {
      const updatedData = {
        ...websiteData,
        publications,
      }

      await updateWebsiteData(updatedData)

      toast({
        title: "Success",
        description: "Publications updated successfully.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating publications:", error)
      toast({
        title: "Error",
        description: "Failed to update publications. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "", year: "", description: "" }])
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...education]
    updatedEducation[index] = { ...updatedEducation[index], [field]: value }
    setEducation(updatedEducation)
  }

  const removeEducation = (index: number) => {
    const updatedEducation = [...education]
    updatedEducation.splice(index, 1)
    setEducation(updatedEducation)
  }

  const saveEducation = async () => {
    try {
      const updatedData = {
        ...websiteData,
        education,
      }

      await updateWebsiteData(updatedData)

      toast({
        title: "Success",
        description: "Education information updated successfully.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating education:", error)
      toast({
        title: "Error",
        description: "Failed to update education information. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Website Admin Dashboard</h1>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="research">Research Interests</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your basic information that appears on the website.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...personalInfoForm}>
                <form onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={personalInfoForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Hamed Grrramizadeh" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Associate Professor of Biology" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="University of Science, New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="jane.smith@university.edu" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="profileImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/profile.jpg" {...field} />
                          </FormControl>
                          <FormDescription>Enter a URL to your profile image</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="personalPhoto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personal Photo URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/personal-photo.jpg" {...field} />
                          </FormControl>
                          <FormDescription>Enter a URL to a personal photo (separate from profile)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="cvLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CV/Resume Link</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/cv.pdf" {...field} />
                          </FormControl>
                          <FormDescription>Enter a URL to your CV or resume</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={personalInfoForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A brief introduction that appears on the homepage"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalInfoForm.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Me</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A detailed description about your background, interests, and expertise"
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Personal Information</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Research Interests</CardTitle>
              <CardDescription>Add or update your research interests and areas of expertise.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {researchInterests.map((interest, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Research Interest #{index + 1}</h3>
                      <Button variant="destructive" size="sm" onClick={() => removeResearchInterest(index)}>
                        Remove
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor={`interest-title-${index}`}>Title</Label>
                        <Input
                          id={`interest-title-${index}`}
                          value={interest.title}
                          onChange={(e) => updateResearchInterest(index, "title", e.target.value)}
                          placeholder="e.g., Molecular Biology"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`interest-description-${index}`}>Description</Label>
                        <Textarea
                          id={`interest-description-${index}`}
                          value={interest.description}
                          onChange={(e) => updateResearchInterest(index, "description", e.target.value)}
                          placeholder="Describe your research interest"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-4">
                  <Button variant="outline" onClick={addResearchInterest}>
                    Add Research Interest
                  </Button>

                  <Button onClick={saveResearchInterests}>Save Research Interests</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Publications</CardTitle>
              <CardDescription>Add or update your research publications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {publications.map((publication, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Publication #{index + 1}</h3>
                      <Button variant="destructive" size="sm" onClick={() => removePublication(index)}>
                        Remove
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor={`publication-title-${index}`}>Title</Label>
                        <Input
                          id={`publication-title-${index}`}
                          value={publication.title}
                          onChange={(e) => updatePublication(index, "title", e.target.value)}
                          placeholder="e.g., Novel Approaches to Gene Therapy"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`publication-authors-${index}`}>Authors</Label>
                        <Input
                          id={`publication-authors-${index}`}
                          value={publication.authors}
                          onChange={(e) => updatePublication(index, "authors", e.target.value)}
                          placeholder="e.g., Smith, J., Johnson, A., et al."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`publication-journal-${index}`}>Journal/Conference</Label>
                          <Input
                            id={`publication-journal-${index}`}
                            value={publication.journal}
                            onChange={(e) => updatePublication(index, "journal", e.target.value)}
                            placeholder="e.g., Nature Biotechnology"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`publication-year-${index}`}>Year</Label>
                          <Input
                            id={`publication-year-${index}`}
                            value={publication.year}
                            onChange={(e) => updatePublication(index, "year", e.target.value)}
                            placeholder="e.g., 2023"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor={`publication-link-${index}`}>Link (Optional)</Label>
                        <Input
                          id={`publication-link-${index}`}
                          value={publication.link}
                          onChange={(e) => updatePublication(index, "link", e.target.value)}
                          placeholder="e.g., https://doi.org/..."
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-4">
                  <Button variant="outline" onClick={addPublication}>
                    Add Publication
                  </Button>

                  <Button onClick={savePublications}>Save Publications</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Add or update your educational background.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Education #{index + 1}</h3>
                      <Button variant="destructive" size="sm" onClick={() => removeEducation(index)}>
                        Remove
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor={`education-degree-${index}`}>Degree</Label>
                        <Input
                          id={`education-degree-${index}`}
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                          placeholder="e.g., Ph.D. in Molecular Biology"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`education-institution-${index}`}>Institution</Label>
                        <Input
                          id={`education-institution-${index}`}
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, "institution", e.target.value)}
                          placeholder="e.g., Harvard University"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`education-year-${index}`}>Year</Label>
                        <Input
                          id={`education-year-${index}`}
                          value={edu.year}
                          onChange={(e) => updateEducation(index, "year", e.target.value)}
                          placeholder="e.g., 2015-2020"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`education-description-${index}`}>Description (Optional)</Label>
                        <Textarea
                          id={`education-description-${index}`}
                          value={edu.description}
                          onChange={(e) => updateEducation(index, "description", e.target.value)}
                          placeholder="Additional details about your education"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-4">
                  <Button variant="outline" onClick={addEducation}>
                    Add Education
                  </Button>

                  <Button onClick={saveEducation}>Save Education</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
