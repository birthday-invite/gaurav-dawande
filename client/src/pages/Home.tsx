import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRsvpSchema, type InsertRsvp } from "@shared/schema";
import { useCreateRsvp } from "@/hooks/use-rsvps";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Calendar, MapPin, Clock, Music, Gift, GlassWater } from "lucide-react";
import heroImage from "@assets/IMG_8944_1770998979125.jpeg";
import { Countdown } from "@/components/Countdown";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const EVENT_DATE = new Date("2025-10-25T19:00:00");

export default function Home() {
  const { mutate: createRsvp, isPending } = useCreateRsvp();
  
  const form = useForm<InsertRsvp>({
    resolver: zodResolver(insertRsvpSchema),
    defaultValues: {
      name: "",
      email: "",
      guestCount: 1,
      message: "",
      status: "attending"
    },
  });

  const onSubmit = (data: InsertRsvp) => {
    createRsvp(data, {
      onSuccess: () => {
        form.reset();
        // Fire confetti
        const end = Date.now() + 3 * 1000;
        const colors = ["#FF006E", "#00B4D8", "#FFD700"];
        (function frame() {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          });
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      },
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col gap-6 text-center lg:text-left"
          >
            <motion.div variants={fadeIn}>
              <span className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/10 text-accent font-medium tracking-wide uppercase text-sm mb-4 backdrop-blur-sm">
                Save the Date
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tighter leading-[0.9]">
              THE BIG <br />
              <span className="text-gradient">4-0</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl sm:text-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0 font-light">
              Join us for a night of elegance, laughter, and celebration as we ring in a new decade.
            </motion.p>

            <motion.div variants={fadeIn} className="pt-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)] hover:shadow-[0_0_50px_-5px_hsl(var(--primary)/0.8)] transition-all duration-300"
                onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}
              >
                RSVP Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-md aspect-[3/4] lg:aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl blur-2xl opacity-40 rotate-6" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-black/40 rotate-0 hover:rotate-2 transition-transform duration-500">
               <img 
                 src={heroImage} 
                 alt="Birthday Celebration" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80" />
               <div className="absolute bottom-6 left-6 right-6">
                 <p className="text-white font-display font-bold text-2xl">October 25, 2025</p>
                 <p className="text-white/60">City Center, Grand Ballroom</p>
               </div>
            </div>
          </motion.div>

        </div>
        
        {/* Countdown */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full mt-24"
        >
          <Countdown targetDate={EVENT_DATE} />
        </motion.div>
      </section>

      {/* --- DETAILS GRID --- */}
      <section className="py-24 px-6 relative">
        <div className="container max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Title Card */}
            <motion.div variants={fadeIn} className="glass-panel p-8 rounded-3xl col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-center bg-gradient-to-br from-primary/10 to-transparent">
              <h2 className="text-4xl font-bold font-display mb-4">Event Details</h2>
              <p className="text-muted-foreground">Everything you need to know for the big night.</p>
            </motion.div>

            {/* When */}
            <motion.div variants={fadeIn} className="glass-panel p-8 rounded-3xl group hover:bg-white/10 transition-colors">
              <Calendar className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold font-display mb-2">When</h3>
              <p className="text-lg text-white">Saturday, Oct 25th</p>
              <p className="text-muted-foreground">2025</p>
            </motion.div>

            {/* Time */}
            <motion.div variants={fadeIn} className="glass-panel p-8 rounded-3xl group hover:bg-white/10 transition-colors">
              <Clock className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-2xl font-bold font-display mb-2">Time</h3>
              <p className="text-lg text-white">7:00 PM - Late</p>
              <p className="text-muted-foreground">Cocktail Hour starts at 7</p>
            </motion.div>

            {/* Where */}
            <motion.div variants={fadeIn} className="glass-panel p-8 rounded-3xl md:col-span-2 lg:col-span-2 group hover:bg-white/10 transition-colors relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <MapPin className="w-10 h-10 text-accent mb-6 relative z-10" />
              <h3 className="text-2xl font-bold font-display mb-2 relative z-10">Where</h3>
              <p className="text-xl text-white relative z-10">The Grand Ballroom, City Center</p>
              <p className="text-muted-foreground relative z-10">123 Celebration Ave, Downtown</p>
            </motion.div>

            {/* Dress Code */}
            <motion.div variants={fadeIn} className="glass-panel p-8 rounded-3xl group hover:bg-white/10 transition-colors">
              <GlassWater className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold font-display mb-2">Attire</h3>
              <p className="text-lg text-white">Cocktail Attire</p>
              <p className="text-muted-foreground">Dress to impress!</p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* --- RSVP SECTION --- */}
      <section id="rsvp" className="py-24 px-6 relative bg-black/40">
        <div className="container max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-[2rem] border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[100px]" />

            <div className="relative z-10 text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Are you coming?</h2>
              <p className="text-muted-foreground text-lg">Please let us know by October 1st.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" {...field} className="bg-black/20 border-white/10 h-12 rounded-xl focus:border-primary/50 focus:ring-primary/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Email (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="jane@example.com" {...field} className="bg-black/20 border-white/10 h-12 rounded-xl focus:border-secondary/50 focus:ring-secondary/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="guestCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Total Guests</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          max={5} 
                          {...field} 
                          className="bg-black/20 border-white/10 h-12 rounded-xl w-full md:w-1/3 focus:border-accent/50 focus:ring-accent/20" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Message for the Birthday Boy</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Can't wait to celebrate! Any song requests?" 
                          className="bg-black/20 border-white/10 min-h-[120px] rounded-xl resize-none focus:border-primary/50 focus:ring-primary/20" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 shadow-lg shadow-primary/20"
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : "Confirm RSVP"}
                </Button>
              </form>
            </Form>

          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center text-muted-foreground border-t border-white/5">
        <p className="font-display">Can't wait to see you there!</p>
      </footer>
    </div>
  );
}
