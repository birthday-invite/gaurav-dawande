import emailjs from '@emailjs/browser';

interface EmailData {
    name: string;
    email?: string | null;
    guestCount: number;
    status: string; // 'attending' | 'declined'
    message?: string | null;
}

export const sendRsvpEmail = async (data: EmailData) => {
    // Try to get from env, but fallback to provided credentials if missing
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_pefx10n";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_m2xhp0w";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "bRqxJOsUekJYm4HmA";

    if (!serviceId || !templateId || !publicKey) {
        console.error("EmailJS credentials still missing even with fallbacks.");
        return;
    }

    const templateParams = {
        to_name: "Gaurav",
        from_name: data.name,
        from_email: data.email || "No email provided",
        message: data.message || "No message",
        guest_count: data.guestCount || "No guest count provided",
        status: data.status === 'attending' ? "Accepted" : "Declined",
    };

    try {
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log('Email sent successfully!', response.status, response.text);
        return response;
    } catch (err) {
        console.error('Failed to send email:', err);
        throw err;
    }
};
