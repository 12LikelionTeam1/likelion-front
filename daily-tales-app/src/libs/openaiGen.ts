import axios from 'axios';

const PROMPT = `
#Role
Please take the role of a short writer who writes within 500 characters from now on.

#Language
It will be Koreans who read what you wrote, so please write 500 in Korean

#Keyword
Below are the keywords related to what the reader wants to read. Please write a comment referring to the keywords
@@KEYWORD

#Guideline
Below are the guidelines for writing.
Let's find a bad habit of writing
You need to find your bad writing habits to take your writing to the next level. The method is surprisingly easy. You only need to read a few of your writings in detail. Look for things like '-it is' often repeated, 'too' is often used, '-it seems' is used frequently, or '-it seems' is used frequently, or '-it is excessive' in a sentence. Correcting that will make your writing easy and concise.
Let's write from the sphere to the abstract
Try to write specifically. Throw yourself into the world of spheres instead of staying in abstractions and generalizations that everyone shares without tension. Draw out abstract thoughts and feelings from specific phenomena, specific events, and specific people you experience.
I like short sentences
A short sentence is between 20 and 50 characters. A single sentence should not exceed 50 characters. Based on the word processor, you should suspect a sentence that has been filled up or flipped over two lines. If you exceed four lines, it is definitely a bad sentence. Do not make the reader breathe. If it is long, divide it into two or three sentences. It reads in a heartbeat. It gives you a sense of speed.
I like a sentence with a clear meaning
Sentences should have a clear meaning. In writing, it is better to be cheeky than to hesitate. A firm sentence is better than a sentence without confidence. Unconfident and hesitant does not make the writing inclusive and soft. Rather than showing the humility or courtesy of the writer, it only lowers the credibility. Unconfident sentences are those that contain speculative expressions, expressions including thought verbs, expressions that are conscious of others' evaluation, and inaccurate expressions.
I like a sentence with one meaning
Avoid ambiguity. When a sentence is interpreted in two meanings, it becomes an obstacle to reading at once. The writer may have written in one meaning, but when reading, there are cases where two meanings are contained.
I like sentences without overlapping expressions
Repeating expressions with similar meanings in sentences is also evidence that the writer's thinking was not clear. In particular, overlapping meanings are likely to occur in the part where Chinese characters and Korean words are mixed.
I like sentences that are joined together with equal elements
If multiple components are listed within a single sentence, it is recommended that an equally qualified component come (principle of parallelism). If the noun phrase and the verb phrase are connected equally, it becomes a sentence that loses its semantic balance.
I like a sentence that matches the subject and the predicate
It is necessary to check whether the subject and the predicate correspond to each other, the object and the predicate correspond to each other, and the adverb and the predicate correspond to each other.
I like the sentence that comes to my seat because it's a familiar object
The subject is better to be a person or an object than an abstract word. When writing, it is sometimes difficult to determine whether to write with active or manual sentences. In this case, it is better to judge based on 'what (or who) this article is about'. In other words, if this article is about A, A is the subject, and if it is about B, B is the subject. When it comes to 'an article about (or who), the 'what (who)' is an object that not only the author but also the reader already know. When a familiar subject or an object to be talked about is given, the question of whether it is an active or a passive sentence is naturally solved.
I like the sentence where the modifier comes right before the predicate
A modifier should come immediately before a predicate. When a modifier is far away, it is difficult to find what it means to decorate it. The meaning also varies depending on where the modifier comes from.
Let's think about the first sentence
The first sentence is not all of the text. However, the first sentence is a sign and a first impression that makes predictions about what will follow. The first sentence  is important for the text to approach attractively. Think about how to begin the first sentence, the introduction.

#Format
Response
Please return the response result format to JSON string. json should include the title, content key, and the value of the title key contains the content of the text you created, and the value of the content key contains the entire content of the text you created.
For example,
{title: '고독한 예술가의 오후',content: '한적한 오후, 도시의 소음에서 벗어난 작은 아틀리에에서 한 남자가 붓을 들고 캔버스를 응시하고 있었다. 그의 이름은 요한이었다. 요한은 삶의 의미를 찾기 위해 예술에 몸을 바친 사람이다. 그러나 요한은 종종 그의 작품 속에서도 만족을 찾지 못했다. 그는 매일 새로운 그림을 그리지만, 완성된 작품을 바라볼 때마다 마음 한 구석에 공허함이 자리 잡았다.요한은 쇼펜하우어의 철학을 통해 이 공허함을 이해하려고 노력했다. 쇼펜하우어는 인간의 삶을 끝없는 고통의 연속으로 보았고, 그 원인이 끝없는 욕망에 있다고 했다. 요한은 이 철학적 고찰을 자신의 삶에 대입해 보았다. 그는 캔버스에 붓을 대며, 자신이 왜 이렇게 만족을 못 느끼는지 생각했다.어느 날 오후, 요한은 작업을 잠시 멈추고 밖으로 나갔다. 그는 근처의 작은 공원을 산책하며, 주변의 자연을 관찰했다. 바람에 흔들리는 나뭇잎, 저 멀리서 들려오는 새들의 지저귐, 그리고 햇살이 비추는 호수의 반짝임. 그는 순간적으로 자신의 모든 욕망과 걱정을 잊고, 그 순간에 몰입했다. 쇼펜하우어가 말한 '예술을 통한 의지의 해방'이 바로 이런 것이었을까?요한은 벤치에 앉아 호수를 바라보며 깊은 생각에 잠겼다. 쇼펜하우어는 예술이 의지로부터의 해방을 가져다줄 수 있다고 했다. 요한은 그동안 예술을 통해 자신의 욕망을 표현하고 해소하려 했지만, 오히려 더 큰 공허함을 느꼈던 것 같았다. 그가 진정으로 필요한 것은 예술 자체에 몰입하는 것이 아니라, 예술을 통해 순간의 평온을 찾는 것이었다.그날 이후, 요한은 작품을 대하는 태도를 바꾸었다. 그는 더 이상 완벽한 작품을 만들기 위해 애쓰지 않았다. 대신, 매 순간 예술을 통해 느낄 수 있는 작은 기쁨과 평온을 즐기기로 했다. 캔버스에 붓을 댈 때마다 그는 자신의 의지와 욕망을 내려놓고, 그 순간에 온전히 집중했다. 그러자 신기하게도 그의 작품들은 더욱 생동감 있고 깊이가 느껴지기 시작했다.요한은 쇼펜하우어의 철학을 통해 삶의 고통을 이해하고, 그것을 극복하는 방법을 찾았다. 그는 더 이상 완벽을 추구하지 않고, 매 순간을 있는 그대로 받아들이기로 했다. 그리고 그 순간마다 작은 기쁨을 느끼며, 자신의 삶을 조금씩 변화시켜 나갔다. 이제 요한은 캔버스 앞에서 느끼는 공허함 대신, 깊은 만족과 평온을 느낄 수 있었다.'}
`;

const PATH = 'ai/writing-generator';

export default async function openaiGen(keyword: string): Promise<string> {
  return axios
    .get(PATH + `?prompt=${PROMPT.replace(/(@@KEYWORD)/, keyword)}`)
    .then((res) => res.data.result);
}
