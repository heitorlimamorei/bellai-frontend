import IMessage from '@/types/message';
import { v4 as uuidv4 } from 'uuid';

type WritterFunc = (prev: IMessage[]) => IMessage;

interface IReqPayload {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  updateMessage: (w: WritterFunc) => void;
  prompt: string;
}

type IRole = 'user' | 'system' | 'assistant';

const baseprompt =
  'Atue como uma experiente e agradavel psicologa especializado em atendimento de jovens que sofrem com questões relacionadas ao bullying e assedios. Ele criou sua carreira atendeno jovens entre 14 e 18 anos na cidade de Belo Horizonte. Hoje ele vai atender um jovem que estuda no Colégio Marista Dom Silveiro, o jovem deu o seguinte relato: ';

function getMessage(role: IRole, content: string): IMessage {
  return {
    id: uuidv4(),
    content: content,
    role: role,
  };
}

function prepareMessages(messages: IMessage[]) {
  return messages
    .map((message) => ({
      role: message.role,
      content: message.content,
    }))
    .filter((_, i) => i >= 4);
}

const HandleRequest = async ({ messages, addMessage, prompt, updateMessage }: IReqPayload) => {
  try {
    const lastI = messages.length - 1;
    const messageF = getMessage('user', `${lastI == 4 ? baseprompt : ''} ${prompt}`);
    const messagesF = prepareMessages([...messages, messageF]);

    await fetch('api/openAi', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        conversation: messagesF,
        model: 'gpt-4',
      }),
    }).then(async (reponse: any) => {
      const reader = reponse.body?.getReader();
      const nextMessage = getMessage('assistant', '');

      addMessage(nextMessage);

      let lastChuck = '';

      while (true) {
        const { value, done } = await reader?.read();

        if (done) {
          break;
        }

        let currentChunck = new TextDecoder().decode(value);
        if (currentChunck != null) {
          updateMessage((prev) => {
            let message = prev.find((m) => m.id === nextMessage.id);

            if (!message) {
              return getMessage('assistant', lastChuck);
            }
            if (currentChunck != lastChuck) {
              message.content = message.content.concat(currentChunck);
            }
            lastChuck = currentChunck;
            return message;
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export default { HandleRequest, getMessage };
