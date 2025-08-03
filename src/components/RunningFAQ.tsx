interface FAQItem {
  question: string;
  answer: string;
}

interface RunningFAQProps {
  faqs: FAQItem[];
  title?: string;
}

export default function RunningFAQ({ faqs, title = "Frequently Asked Questions" }: RunningFAQProps) {
  return (
    <section className="mt-12 max-w-prose">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">{title}</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-medium text-gray-800 mb-2">{faq.question}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}