export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Can I preview what my website might look like before we talk?",
    answer:
      "Yes. Use the site preview builder (Preview in the menu): choose Products, Services, or Restaurants, then your specific business type, customize copy and colors, and see an illustrative mock—it’s not a final site, but it helps you picture direction. You can share the link with your team or send us your interest from that page.",
  },
  {
    question: "How long does a typical website or systems project take?",
    answer:
      "Almost every install goes live in under a week unless the work is unusually complex—think heavy custom integrations, large migrations, or multi-system rollouts. In those cases we’ll spell out why and what to expect. Your overall timeline still depends on scope, approvals, and how quickly you can share assets—we’ll give you a clear range on the discovery call.",
  },
  {
    question: "Do you only work in Oklahoma?",
    answer:
      "Oklahoma is our focus—we’re based in Oklahoma City and most of our work is for Oklahoma businesses, from the metro to small towns statewide. We can still help owners outside the state when it’s a good fit; reach out and we’ll talk through what you need.",
  },
  {
    question: "Can you work with what we already have (site, CRM, ads)?",
    answer:
      "Yes. We often fix, extend, or replace pieces instead of starting from zero—audits, migrations, and cleanup are normal. We’ll tell you honestly what’s worth keeping versus rebuilding.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We publish starting ranges on our pricing page so you know whether we’re in the ballpark before you book a call. Final quotes depend on scope after we understand your goals.",
  },
  {
    question: "What happens after I book a call?",
    answer:
      "You’ll get a focused conversation—usually 20–30 minutes—to clarify goals, timeline, and budget. We follow up with a clear next step, whether that’s a proposal, a smaller starter project, or a polite no if we’re not the right fit.",
  },
];
