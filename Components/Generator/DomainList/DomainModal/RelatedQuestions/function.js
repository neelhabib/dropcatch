import jsonpRequest from "./jsonRequest";
const array = [
  "how",
  "which",
  "why",
  "where",
  "who",
  "when",
  "are",
  "what",
  "can",
  "will",
  "is",
];

let num = 0;

let questionIntervalId;

export const relatedQuestion = (keyword, dispatch, setRelatedQuestion) => {
  //   const dispatch = useDispatch();
  dispatch(setRelatedQuestion([]));

  num = 0;

  if (questionIntervalId) clearInterval(questionIntervalId);

  questionIntervalId = setInterval(() => {
    if (num < array.length) {
      jsonpRequest(
        `https://suggestqueries.google.com/complete/search?client=chrome&q=${
          array[num]
        } ${keyword}&_=${Date.now()}&hl=&gl=`,
        `jQuery22009564892445152449_${Date.now()}`,
        (data) => {
          // console.log("question data", data);
          dispatch(setRelatedQuestion(data));
        }
      );
      num++;
    }
  }, 200);
};
