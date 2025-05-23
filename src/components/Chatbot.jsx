import React, { useState } from 'react';

const qaPairs = [
  { question: 'What are your clinic hours?', answer: 'We are open from 9 AM to 6 PM, Monday to Saturday.' },
  { question: 'Do you offer emergency services?', answer: 'Yes, emergency services are available 24/7. Call our hotline.' },
  { question: 'How do I book an appointment?', answer: 'You can book an appointment through our website or call us directly.' },
  { question: 'What services do you provide?', answer: 'We provide general checkups, vaccinations, grooming, surgery, and more.' },
  { question: 'Do you treat exotic pets?', answer: 'Yes, we treat exotic pets including birds, reptiles, and rodents.' },
  { question: 'What should I do if my pet has diarrhea?', answer: 'Ensure your pet has access to clean water. Withhold food for 12 hours, then offer bland food like boiled chicken and rice. If it lasts more than 24 hours, see a vet.' },
  { question: 'Can I give human medicine to my pet?', answer: 'No. Many human medications are toxic to pets. Always consult your vet before giving any medicine.' },
  { question: 'How often should I deworm my pet?', answer: 'Puppies and kittens every 2–3 weeks until 12 weeks old, then monthly until 6 months. Adults should be dewormed every 3 months.' },
  { question: 'What are signs of heatstroke in pets?', answer: 'Panting, drooling, rapid heartbeat, vomiting, and collapse. Move your pet to a cool area and see a vet immediately.' },
  { question: 'What home remedy can I use for minor pet wounds?', answer: 'Clean the area with diluted betadine or saline, apply a pet-safe antibiotic ointment, and cover with a clean bandage. Seek vet care if it doesn’t heal quickly.' },
  { question: 'How can I prevent ticks and fleas?', answer: 'Use vet-recommended flea/tick preventatives monthly. Keep bedding clean and regularly groom your pet.' },
  { question: 'My pet is vomiting. What should I do?', answer: 'Withhold food for 6–8 hours. Offer bland food like boiled chicken and rice. If vomiting continues or there’s blood, visit a vet.' },
  { question: 'Are essential oils safe for pets?', answer: 'Many essential oils are toxic to pets. Avoid using them unless directed by a vet.' },
  { question: 'How often should I bathe my dog?', answer: 'Once every 4–6 weeks is enough for most dogs, unless they’re dirty or have a skin condition. Avoid overbathing as it dries out skin.' },
  { question: 'What should I feed a sick dog or cat?', answer: 'Offer bland, easy-to-digest foods like boiled chicken, rice, or vet-recommended diets. Ensure hydration. If symptoms persist, visit a vet.' },
];

function ChatBot() {
  const [chat, setChat] = useState([]);
  const [showBot, setShowBot] = useState(false);
  const [page, setPage] = useState(0);
  const perPage = 5;

  const handleQuestionClick = (qa) => {
    setChat((prev) => [
      ...prev,
      { type: 'question', text: qa.question },
      { type: 'answer', text: qa.answer },
    ]);
  };

  const handleRemoveChat = () => {
    setShowBot(false);
    setChat([]);
    setPage(0);
  };

  const paginatedQuestions = qaPairs.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {!showBot ? (
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-blue-700 transition"
          onClick={() => setShowBot(true)}
        >
          💬 Chat with us
        </button>
      ) : (
        <div className="w-96 bg-white rounded-xl shadow-2xl border p-4 flex flex-col space-y-3">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xl font-semibold text-blue-800">Pet Care Assistant</h3>
            <button onClick={handleRemoveChat} className="text-gray-500 hover:text-red-600 text-xl">✕</button>
          </div>

          <div className="h-64 overflow-y-auto border rounded p-3 bg-gray-50 space-y-2">
            {chat.length === 0 ? (
              <p className="text-gray-400 text-sm">Ask a question to get started...</p>
            ) : (
              chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'question' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${msg.type === 'question' ? 'bg-blue-100 text-blue-900' : 'bg-gray-200 text-gray-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-gray-700">Pick a question:</p>
            {paginatedQuestions.map((qa, i) => (
              <button
                key={i}
                onClick={() => handleQuestionClick(qa)}
                className="text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-md transition text-sm"
              >
                {qa.question}
              </button>
            ))}
            <div className="flex justify-between pt-2">
              <button
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
                className={`text-sm px-3 py-1 rounded bg-sky-300 hover:bg-gray-300 disabled:opacity-50`}
              >
                Prev
              </button>
              <button
                disabled={(page + 1) * perPage >= qaPairs.length}
                onClick={() => setPage((prev) => prev + 1)}
                className={`text-sm px-3 py-1 rounded bg-sky-300 hover:bg-gray-300 disabled:opacity-50`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
