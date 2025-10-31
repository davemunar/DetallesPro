import React, { useState } from 'react';
import { QuoteItem } from '../../types';
import { generateQuoteSummary } from '../../services/geminiService';
import Spinner from './Spinner';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteItems: QuoteItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateItemQuantity: (productId: string, quantity: number) => void;
  onClearQuote: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, quoteItems, onRemoveItem, onUpdateItemQuantity, onClearQuote }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteItems.length === 0 || !name || !email) return;

    setIsLoading(true);
    setSubmissionResult(null);

    try {
      const summary = await generateQuoteSummary(quoteItems, { name, email });
      setSubmissionResult(summary);
      onClearQuote();
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmissionResult("Lo sentimos, algo salió mal. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClose = () => {
    setSubmissionResult(null);
    setName('');
    setEmail('');
    onClose();
  };

  if (!isOpen) return null;

  const totalCost = quoteItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold text-primary">Tu Solicitud de Cotización</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-16">
                <Spinner />
                <p className="mt-4 text-lg text-gray-600">Generando tu confirmación...</p>
            </div>
          ) : submissionResult ? (
            <div className="text-center py-12 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-800 mt-4">¡Gracias!</h3>
                <p className="text-gray-600 mt-2 whitespace-pre-wrap">{submissionResult}</p>
                <button onClick={handleClose} className="mt-8 bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-900 transition">
                  Cerrar
                </button>
            </div>
          ) : (
            <>
              {quoteItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Tu cotización está vacía. ¡Añade productos para empezar!</p>
              ) : (
                <>
                  <ul className="space-y-4 mb-6">
                    {quoteItems.map(item => (
                      <li key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center flex-grow">
                          <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4" />
                          <div className="flex-grow">
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <p className="text-gray-500 text-sm">${item.price.toLocaleString('es-CO')}</p>
                          </div>
                        </div>
                         <div className="flex items-center">
                            <input 
                                type="number" 
                                value={item.quantity}
                                onChange={(e) => onUpdateItemQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                                className="w-16 text-center border border-gray-300 rounded-md shadow-sm mx-4"
                                min="1"
                            />
                            <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 font-semibold p-2">
                                Quitar
                            </button>
                         </div>
                      </li>
                    ))}
                  </ul>
                  <div className="text-right font-bold text-xl text-gray-800 border-t pt-4">
                      Subtotal Estimado: ${totalCost.toLocaleString('es-CO')}
                  </div>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                      <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                      <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    <button type="submit" className="w-full bg-accent text-primary font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={quoteItems.length === 0 || !name || !email}>
                        Generar Cotización
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
