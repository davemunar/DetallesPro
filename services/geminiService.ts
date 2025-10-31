import { GoogleGenAI } from "@google/genai";
import { QuoteItem } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a mock response.");
}

const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

export const generateQuoteSummary = async (products: QuoteItem[], userInfo: { name: string; email: string }): Promise<string> => {
  if (!ai) {
    // Mock response for development when API key is not available
    await new Promise(resolve => setTimeout(resolve, 1500));
    const productNames = products.map(p => `${p.name} (x${p.quantity})`).join(', ');
    return `¡Gracias por tu interés, ${userInfo.name}! Hemos recibido tu solicitud de cotización para los siguientes productos: ${productNames}. Pronto nos pondremos en contacto contigo en ${userInfo.email} con más detalles. Esta es una respuesta de prueba.`;
  }
  
  const productList = products.map(p => 
    `- ${p.name} (Cantidad: ${p.quantity}, Precio Unitario: $${p.price.toLocaleString('es-CO')})${p.wantsAdvisory ? ' [Solicita asesoría de logo]' : ''}`
  ).join('\n');

  const prompt = `
    Un cliente B2B llamado "${userInfo.name}" con el correo electrónico "${userInfo.email}" ha solicitado una cotización para los siguientes regalos corporativos:
    ${productList}

    Genera un mensaje de confirmación amigable y profesional en español para el cliente.
    El mensaje debe:
    1. Agradecer y confirmar la recepción de su solicitud de cotización.
    2. Mencionar brevemente los productos y cantidades que le interesan.
    3. Si solicitó asesoría para algún producto, confirmarlo.
    4. Indicar que un ejecutivo de ventas le enviará una cotización detallada a su correo electrónico en breve.
    5. Tener un tono cálido, profesional y apreciativo.
    No uses formato markdown.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating quote summary with Gemini:", error);
    return "Hemos recibido tu solicitud de cotización y te responderemos en breve. Hubo un problema al generar un resumen instantáneo, ¡pero nuestro equipo ya está trabajando en ello!";
  }
};
