module.exports = {
  /*
    (array) descriptions - descriptions from vision API
    (array) scores - scores from vision API
    (string) translations - translated descriptions from translate API
  */
  makeLookGood: function(descriptions, scores, translations) {
    let result = ``;

    // break string into array to merge with others
    translations = translations.toLowerCase().split(',');

    for(let i in descriptions) {
      result += `<code> ${descriptions[i]} (${translations[i].trim()}): ${Math.round(scores[i]*100)}%; </code> \n`;
    }
    return result;
  }
};
