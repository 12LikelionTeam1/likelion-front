import axios from 'axios';

const PATH = 'ai/writing-generator';

export default async function openaiGen(keyword: string): Promise<string> {
  return axios
    .get(
      PATH +
        `?prompt=${`${keyword} 를 키워드로 하는 내용을 인터넷에서 찾은 다음에 500자 정도의 글과 제목을 생성해줘 반환 형식은 title과 content를 키로 갖는 JSON string 으로 반환해줘`}`,
    )
    .then((res) => res.data.result);
}

const KEYWORDS_PATH = 'ai/keywords-extractor';

export async function getKeyword(contents: string): Promise<string[]> {
  return axios
    .get(KEYWORDS_PATH + `?writing=` + contents)
    .then((res) => res.data.keywords);
}
