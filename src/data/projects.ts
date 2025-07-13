import { ProjectCardData } from "@/components/ProjectCard";

export const projectCards: ProjectCardData[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Modern online store with payment integration",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "web",
    details: {
      client: "Fashion Brand",
      duration: "3 months",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      features: ["Product catalog", "User accounts", "Payment processing", "Order management"]
    }
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Responsive showcase for creative professionals",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "web",
    details: {
      client: "Photographer",
      duration: "1 month",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      features: ["Image gallery", "Contact form", "Blog", "SEO optimization"]
    }
  },
  {
    id: 3,
    title: "Mobile App",
    description: "Fitness tracking application for iOS and Android",
    image: "https://images.unsplash.com/photo-1540563778106-c669d0a3e6f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "mobile",
    details: {
      client: "Fitness Studio",
      duration: "4 months",
      technologies: ["React Native", "Firebase", "Redux"],
      features: ["Workout tracking", "Progress charts", "Social sharing", "Personalized plans"]
    }
  },
  {
    id: 4,
    title: "Corporate Website",
    description: "Professional site for business services",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "web",
    details: {
      client: "Consulting Firm",
      duration: "2 months",
      technologies: ["WordPress", "Custom Theme", "PHP"],
      features: ["Service pages", "Team profiles", "Testimonials", "Case studies"]
    }
  }
]; 