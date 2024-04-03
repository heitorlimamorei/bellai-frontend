import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface IMessage {
  role: string;
  content: string;
  name?: string;
}

const checkConversation = (messages: IMessage[]): boolean => {
  let result: boolean = true;

  messages.forEach((message) => {
    if (message.role == 'assistant' || message.role == 'system' || message.role == 'user') {
      result = true;
    } else {
      result = false;
    }
    if (!!message.content) {
      result = true;
    } else {
      result = false;
    }
  });
  return result;
};

export async function POST(request: Request) {
  try {
    const { conversation } = await request.json();

    if (conversation.length == 0) {
      throw new Error('Error: No conversation found');
    }

    if (!checkConversation(conversation)) {
      throw new Error('Error: Conversation invalid: (malformed body)');
    }

    const reponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversation,
      stream: true,
    });

    const stream = OpenAIStream(reponse);

    return new StreamingTextResponse(stream);
  } catch (err: any) {
    return new Response(err.message, {
      status: 400,
      headers: {
        'Content-Type': 'text/json',
      },
    });
  }
}
