const verifyTwoStrsHaveSameWord = function (str1, str2) {
  const arrFromStr1 = str1.toLowerCase().split(' ').filter(word => word.length > 3);
  const arrFromStr2 = str2.toLowerCase().split(' ').filter(word => word.length > 3);

  const doTwoStrsHaveSameWord = arrFromStr1.some(word => arrFromStr2.includes(word));

  return doTwoStrsHaveSameWord;
};

export { verifyTwoStrsHaveSameWord };
