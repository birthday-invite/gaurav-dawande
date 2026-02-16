import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRsvpSchema, type InsertRsvp } from "@shared/schema";
import { useCreateRsvp } from "@/hooks/use-rsvps";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Calendar, MapPin, Clock, Music, Gift, GlassWater } from "lucide-react";
import heroImage1 from "@assets/Gaurav.jpeg";
import heroImage2 from "@assets/Gaurav2.jpeg";
import heroImage4 from "@assets/Gaurav4.jpeg";
import heroImage5 from "@assets/Gaurav5.jpeg";
import wineVideo from "@/assets/wine.mp4";
import cheers2 from "@/assets/cheers2.mp4";
import cheers3 from "@/assets/cheers3.mp4";
import { Countdown } from "@/components/Countdown";
import { ToastAnimation } from "@/components/ToastAnimation";
import { useState, useEffect, useRef } from "react";
import { sendRsvpEmail } from "@/lib/email";
import { AnimatePresence } from "framer-motion";
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

const titleContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const letterAnimation = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 12, stiffness: 200 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const EVENT_DATE = new Date("2026-02-21T17:00:00");
const HERO_IMAGES = [heroImage1, heroImage2, heroImage4, heroImage5];

export default function Home() {
  const { mutate: createRsvp, isPending } = useCreateRsvp();
  const [showToast, setShowToast] = useState(false);
  const [toastVideo, setToastVideo] = useState(cheers2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle hero images - SLOWER (2s)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);



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

  const onSubmit = async (data: InsertRsvp) => {
    // Database call disabled for GitHub Pages deployment
    /*
    createRsvp(data, {
      onSuccess: () => {
    */
    // Send email notification (fire and forget, or handle error if critical)
    await sendRsvpEmail({
      name: data.name,
      email: data.email,
      guestCount: data.guestCount,
      status: data.status,
      message: data.message
    }).catch(console.error);

    form.reset();

    if (data.status === "attending") {
      setToastVideo(cheers2);
      setShowToast(true);
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
    } else {
      // Declined logic
      setToastVideo(cheers3);
      setShowToast(true);
    }
    /*
      },
    });
    */
  };

  const handleToastComplete = () => {
    setShowToast(false);
    // Force reset to top by stripping hash and re-navigating
    // This is more reliable than reload() for scroll position
    window.location.href = window.location.pathname;
  };

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden text-foreground">
      <ToastAnimation isVisible={showToast} videoSrc={toastVideo} onComplete={handleToastComplete} />

      {/* Global Video Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-background/80 z-10" /> {/* Overlay for text readability */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={wineVideo} type="video/mp4" />
        </video>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden z-10">

        {/* Abstract Background Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

        <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col gap-6 text-center lg:text-left"
          >
            {/* Save the Date REMOVED */}

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={titleContainer}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tighter leading-[0.9]"
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-8">
                {/* Wrap words to prevent bad breaks on mobile */}
                {["THE", "BIG"].map((word, wordIndex) => (
                  <span key={wordIndex} className="whitespace-nowrap flex">
                    {word.split("").map((char, charIndex) => (
                      <motion.span key={charIndex} variants={letterAnimation}>
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </div>
              <motion.span variants={letterAnimation} className="text-gradient block mt-2">
                {"4-0".split("").map((char, index) => (
                  <motion.span key={index} variants={letterAnimation}>
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-3xl sm:text-4xl md:text-5xl text-white max-w-xl mx-auto lg:mx-0 font-light mt-6 font-script leading-normal"
            >
              Join us for a night of elegance, laughter, and celebration as we honor <span className="text-gradient block mt-2 text-6xl sm:text-7xl font-display font-black tracking-tighter">Gaurav</span> on his big day.
            </motion.p>

            <motion.div variants={fadeIn} className="pt-8">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)] hover:shadow-[0_0_50px_-5px_hsl(var(--primary)/0.8)] transition-all duration-300"
                onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}
              >
                RSVP Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image Frame (Carousel with Smooth Transition) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-md aspect-[3/4] lg:aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl blur-2xl opacity-40 rotate-6" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-black/40 rotate-0 transition-transform duration-500">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentImageIndex}
                  src={HERO_IMAGES[currentImageIndex]}
                  alt="Birthday Celebration"
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth slow transition
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <p className="text-white font-display font-bold text-2xl">February 21, 2026</p>
                <p className="text-white/60">Atlantic Pines Golf Club, Wells, Maine</p>
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
      <section className="py-24 px-6 relative z-10">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >


            {/* When */}
            <motion.div variants={fadeIn} className="glass-panel p-8 rounded-3xl group hover:bg-white/10 transition-colors">
              <Calendar className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold font-display mb-2">When</h3>
              <p className="text-lg text-white">Saturday, Feb 21st</p>
              <p className="text-muted-foreground">2026</p>
            </motion.div>

            {/* Time */}
            <motion.div variants={fadeIn} className="glass-panel p-8 rounded-3xl group hover:bg-white/10 transition-colors">
              <Clock className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-2xl font-bold font-display mb-2">Time</h3>
              <p className="text-lg text-white">5:00 PM - Late</p>
              <p className="text-muted-foreground">Celebration starts at 5</p>
            </motion.div>

            {/* Where */}
            <motion.div variants={fadeIn} className="glass-panel p-8 rounded-3xl md:col-span-2 lg:col-span-2 group hover:bg-white/10 transition-colors relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <MapPin className="w-10 h-10 text-accent mb-6 relative z-10" />
              <h3 className="text-2xl font-bold font-display mb-2 relative z-10">Where</h3>
              <a
                href="https://www.google.com/maps/place/Atlantic+Pines+Weddings/@43.30531,-70.6283125,17z/data=!3m1!4b1!4m6!3m5!1s0x89e2a710f4b1bb03:0xa707d7a826f0bb9d!8m2!3d43.3053061!4d-70.6257376!16s%2Fg%2F11x_3l4_qd?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 hover:text-accent transition-colors"
              >
                <p className="text-xl text-white">Atlantic Pines Golf Club</p>
                <p className="text-muted-foreground">445 Clubhouse Rd, Wells, ME 04090</p>
              </a>
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
      <section id="rsvp" className="py-24 px-6 relative bg-black/40 z-10">
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
              <p className="text-muted-foreground text-lg">Please let us know by February 16th.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <label className={`flex items-center space-x-2 p-3 rounded-xl border cursor-pointer transition-all ${field.value === 'attending' ? 'bg-primary/20 border-primary' : 'bg-black/20 border-white/10 hover:bg-white/5'}`}>
                              <input
                                type="radio"
                                {...field}
                                value="attending"
                                checked={field.value === 'attending'}
                                className="accent-primary w-4 h-4"
                              />
                              <span className="text-white">Yes, I'll be there!</span>
                            </label>
                            <label className={`flex items-center space-x-2 p-3 rounded-xl border cursor-pointer transition-all ${field.value === 'declined' ? 'bg-secondary/20 border-secondary' : 'bg-black/20 border-white/10 hover:bg-white/5'}`}>
                              <input
                                type="radio"
                                {...field}
                                value="declined"
                                checked={field.value === 'declined'}
                                className="accent-secondary w-4 h-4"
                              />
                              <span className="text-white">Can't make it</span>
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                          disabled={form.watch("status") === "declined"}
                          className="bg-black/20 border-white/10 h-12 rounded-xl w-full md:w-1/3 focus:border-accent/50 focus:ring-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <footer className="py-12 text-center text-muted-foreground border-t border-white/5 relative z-10">
        <p className="font-display">Can't wait to see you there!</p>
      </footer>
    </div>
  );
}
