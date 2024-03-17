import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface IMessage {
  role: string;
  content: string;
  name?: string;
}

interface IConversationPaylod {
  model: string;
  token_limit: number;
  messages: any[];
}

interface IConversationResp {
  id: string;
  message: IMessage;
  usage: {
    total_tokens: number;
  };
}

const baseprompt = `Atue com um psicologo (homem) experiente focado em atender jovens estudantes de uma escola particular de alta renda em que é frequente a ocorrencia de casos de bullying e de assedio emocional. Agora atenda um estudante com o seguinte relato: `;

const generateConversation = async (payload: IConversationPaylod): Promise<IConversationResp> => {
  const resp = await openai.chat.completions.create({
    model: payload.model,
    messages: payload.messages,
  });

  return {
    id: resp.id,
    message: {
      role: resp.choices[0].message.role,
      content: resp.choices[0].message.content!,
    },
    usage: {
      total_tokens: resp.usage?.total_tokens!,
    },
  };
};

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
    let finalConversation: IMessage[] = [...conversation];

    if (conversation.length == 0) {
      throw new Error('Error: No conversation found');
    }

    if (!checkConversation(conversation)) {
      throw new Error('Error: Conversation invalid: (malformed body)');
    }

    const lastIndex = finalConversation.length - 1;

    const originalResport = finalConversation[lastIndex].content;

    finalConversation[lastIndex].content = baseprompt + originalResport;

    finalConversation = [finalConversation[0], finalConversation[lastIndex]];

    const resp = await generateConversation({
      model: "gpt-4",
      token_limit: 400,
      messages: conversation,
    });

    finalConversation[lastIndex].content = originalResport;

    finalConversation.push(resp.message);

    return new Response(
      JSON.stringify({
        conversation: finalConversation,
        total_tokens: resp.usage.total_tokens,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'text/json',
        },
      },
    );
  } catch (err: any) {
    return new Response(err.message, {
      status: 400,
      headers: {
        'Content-Type': 'text/json',
      },
    });
  }
}